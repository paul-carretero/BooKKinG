package book.bean;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import book.dataItf.BookJsonItf;
import book.dataItf.BookListJsonItf;
import book.dataItf.BookSearchItf;
import book.entity.BookEntity;

/**
 * Session Bean implementation class BookBeanRO
 */
@Stateless
@LocalBean
public class BookBeanRO implements BookBeanROLocal {
	
	/**
	 * Entitymanager sur la BDD slave
	 */
	@PersistenceContext(unitName="slave")
	protected EntityManager manager;
	
	/**
	 * nombre de livre par page à envoyer au front
	 */
	private static final int PAGE_SIZE = 5;

	/**
	 * definition des constantes pour les regex
	 */
	private static final String REGEX_CONST =  "( regexp(" ; 
	
	/**
	 * constante regexp (srsly...)
	 */
	private static final String REGEX_VALUE_ONE =  "') = 1 )" ;

    /**
     * Default constructor. 
     */
    public BookBeanRO() {
        super();
    }
    
	/**
	 * @param userSearchWords une chaine utilisateur
	 * @return une expression régulière pour la recherche dans la base des livres
	 */
	private static String getSearchRegexp(final String userSearchWords) {
		// nettoyage de la chaine
		String searchWords = userSearchWords.trim();
		if(searchWords.isEmpty()) {
			return ".*";
		}

		// creation de la liste des mots de la recherche
		Set<String> wordsList = new HashSet<>(Arrays.asList(searchWords.split(" ")));

		// suppression des mots insignifiants
		for (Iterator<String> iterator = wordsList.iterator(); iterator.hasNext();) {
			String check = iterator.next();
			if (check.isEmpty() || check.length() < 3) {
				iterator.remove();
			}
		}

		// return null si aucun mot exploitable
		if(wordsList.isEmpty()) {
			return ".*";
		}

		//creation de la chaine regexp de recherche
		StringBuilder res = new StringBuilder();
		for(String searchWord : wordsList) {
			res.append(searchWord);
			res.append('|');
		}
		return res.substring(0,res.length()-1);
	}

	/**
	 * @param regExp une expression régulière de recherche des livres
	 * @param entityName nom de l'entité boook à laquelle associer la regexp
	 * @return une condition hibernate pour la recherche de livres
	 */
	public static String generateRegexpSubQuery(final String regExp, final String entityName) {
		StringBuilder res = new StringBuilder();
		res.append(REGEX_CONST + entityName+".title, '"+regExp + REGEX_VALUE_ONE);
		res.append(" OR ");
		res.append(REGEX_CONST + entityName+".author, '"+regExp + REGEX_VALUE_ONE);
		res.append(" OR ");
		res.append(REGEX_CONST + entityName+".summary, '"+regExp + REGEX_VALUE_ONE);
		return res.toString();
	}

	@Override
	public void getBooks(final BookSearchItf searchData, final BookListJsonItf response){
		String regExpSearch = generateRegexpSubQuery(getSearchRegexp(searchData.getAnySearch()),"b");
		Query searchBookQuery = this.manager.createQuery(
				" FROM BookEntity b WHERE "
						+ "(b.type = :type OR :type = 'ANY')"
						+ " AND (b.genre = :genre OR :genre = 'ANY')"
						+ " AND (b.price >= :minprice OR :minprice <= 0)"
						+ " AND (b.price <= :maxprice OR :maxprice <= 0)"
						+ " AND (b.title LIKE :title OR b.author LIKE :author)"
						+ " AND ( "+regExpSearch+" ) "
						+ " ORDER BY b.title ASC")
				.setParameter("type", searchData.getType())
				.setParameter("genre", searchData.getGenre())
				.setParameter("minprice", Float.valueOf(searchData.getMinPrice()))
				.setParameter("maxprice", Float.valueOf(searchData.getMaxPrice()))
				.setParameter("type", searchData.getType())
				.setParameter("title", "%"+searchData.getTitle()+"%")
				.setParameter("author", "%"+searchData.getAuthor()+"%");
		
		int nResult = searchBookQuery.getResultList().size();
		int nPage = (nResult + PAGE_SIZE - 1) / PAGE_SIZE;
		response.setTotalPageAvailable(nPage);
		response.setTotalAvailable(nResult);
		
		List<BookEntity> books = searchBookQuery
				.setMaxResults(PAGE_SIZE)
				.setFirstResult(searchData.getPage() * PAGE_SIZE)
				.getResultList();
		for(BookEntity book : books) {
			BookJsonItf entry = response.prepareNewEntry();
			entry.setField(book);
		}
	}

}

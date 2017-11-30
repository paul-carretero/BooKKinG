package book.bean;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.ejb.Asynchronous;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import book.dataItf.BookJsonItf;
import book.dataItf.BookListJsonItf;
import book.dataItf.BookCreateDataItf;
import book.dataItf.BookSearchItf;
import book.entity.BookEntity;

/**
 * Session Bean implementation class BookBean
 */
@Stateless
@LocalBean
public class BookBean implements BookBeanLocal {

	@PersistenceContext()
	private EntityManager manager;

	/**
	 * Default constructor. 
	 */
	public BookBean() {}

	@Override
	public BookEntity getBook(final Integer idBook){
		return this.manager.find(BookEntity.class, idBook);
	}
	
	private String getSearchRegexp(final String userSearchWords) {
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
	
	public String generateRegexpSubQuery(final String regExp, final String entityName) {
		//(b.title IN :searchWords) OR (b.author IN :searchWords) OR (b.summary IN :searchWords);
		StringBuilder res = new StringBuilder();
		res.append("( regexp("+entityName+".title, '"+regExp+"') = 1 )");
		res.append(" OR ");
		res.append("( regexp("+entityName+".author, '"+regExp+"') = 1 )");
		res.append(" OR ");
		res.append("( regexp("+entityName+".summary, '"+regExp+"') = 1 )");
		return res.toString();
	}

	@Override
	public void getBooks(final BookSearchItf searchData, final BookListJsonItf response){
		String regExpSearch = generateRegexpSubQuery(getSearchRegexp(searchData.getAnySearch()),"b");
		List<BookEntity> books = this.manager.createQuery(
				" FROM BookEntity b WHERE "
						+ "(b.type = :type OR :type = 'ANY')"
						+ " AND (b.genre = :genre OR :genre = 'ANY')"
						+ " AND (b.price >= :minprice OR :minprice <= 0)"
						+ " AND (b.price <= :maxprice OR :maxprice <= 0)"
						+ " AND (b.title LIKE :title OR b.author LIKE :author)"
						+ " AND ( "+regExpSearch+" ) ")
				.setParameter("type", searchData.getType())
				.setParameter("genre", searchData.getGenre())
				.setParameter("minprice", Float.valueOf(searchData.getMinPrice()))
				.setParameter("maxprice", Float.valueOf(searchData.getMaxPrice()))
				.setParameter("type", searchData.getType())
				.setParameter("title", "%"+searchData.getTitle()+"%")
				.setParameter("author", "%"+searchData.getAuthor()+"%")
				.getResultList();

		for(BookEntity book : books) {
			BookJsonItf entry = response.prepareNewEntry();
			entry.setField(book);
		}
	}

	@Override
	@Asynchronous
	public void addBooks(BookCreateDataItf data) {
		BookEntity newBook = new BookEntity(
				data.getGenre(), 
				data.getType(), 
				data.getAuthor(), 
				data.getSummary(), 
				data.getPicture(), 
				data.getPrice(), 
				data.getStock(), 
				data.getTitle()
				);
		this.manager.persist(newBook);
	}

}

package book.bean;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.ejb.Asynchronous;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.Query;

import book.dataItf.BookJsonItf;
import book.dataItf.BookListJsonItf;
import book.dataItf.BookCreateDataItf;
import book.dataItf.BookSearchItf;
import book.dataItf.InitResponseJsonItf;
import book.entity.BookEntity;
import shared.AbstractBean;

/**
 * Session Bean implementation class BookBean
 */
@Stateless
@LocalBean
public class BookBean extends AbstractBean implements BookBeanLocal {
	
	/**
	 * nombre de livre par page à envoyer au front
	 */
	private static final int PAGE_SIZE = 10;

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
		int nPage = Math.floorDiv(nResult, PAGE_SIZE)+1;
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

	@Override
	public void getRandom(InitResponseJsonItf response) {
		BookEntity randomBook = (BookEntity) this.manager.createQuery("FROM BookEntity ORDER BY rand()").setMaxResults(1).getSingleResult();
		BookJsonItf aBook = response.prepareNewBookRandom();
		aBook.setField(randomBook);
	}

	@Override
	public void getNewest(InitResponseJsonItf response) {
		BookEntity randomBook = (BookEntity) this.manager.createQuery("FROM BookEntity ORDER BY idBook DESC").setMaxResults(1).getSingleResult();
		BookJsonItf aBook = response.prepareNewBookNewest();
		aBook.setField(randomBook);
	}

	@Override
	public void getMostBuy(InitResponseJsonItf response) {
		Integer mostBuyBook = (Integer) this.manager.createNativeQuery("SELECT idBook AS total FROM CmdDetail GROUP BY idBook ORDER BY total DESC LIMIT 1").getSingleResult();
		BookJsonItf res = response.prepareNewBookMostBuy();
		res.setField(getBook(mostBuyBook));
	}

	@Override
	public void getRange(InitResponseJsonItf response) {
		Integer min = Math.round(((Float) this.manager.createNativeQuery("SELECT MIN(price) FROM Book").getSingleResult())-1);
		min = Math.max(0, min);
		Integer max = Math.round(((Float) this.manager.createNativeQuery("SELECT MAX(price) FROM Book").getSingleResult())+1);
		response.setRange(min, max);
	}

	@Override
	public int getMinForTest() {
		Integer min = Math.round(((Float) this.manager.createNativeQuery("SELECT MIN(price) FROM Book").getSingleResult())-1);
		min = Math.max(0, min);
		return min;
	}

}

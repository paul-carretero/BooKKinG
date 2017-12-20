package init;

import java.util.Locale;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;

import book.bean.BookBeanLocal;
import book.dataItf.BookJsonItf;
import book.entity.BookEntity;
import shared.AbstractBean;
import shared.Helper;

/**
 * Session Bean implementation class Init
 * fourni des constantes
 */
@Stateless
@LocalBean
public class InitBean extends AbstractBean implements InitBeanLocal {
	
	/**
	 * erreur d'initialisation si pas de commande
	 */
	private static final String ERR_MESSAGE = "[initFail, lack of data]";
	
	/**
	 * book bean permettant d'effectuer des opérations sur les livres
	 */
	@EJB(lookup="java:app/BooKKinG-Server-ejb/BookBean!book.bean.BookBean")
	private BookBeanLocal book;

    /**
     * Default constructor. 
     */
    public InitBean() {
    	Locale.setDefault(Locale.FRANCE);
    }

	@Override
	public void getRandom(InitResponseJsonItf response) {
		BookEntity randomBook = (BookEntity) this.manager.createQuery("FROM BookEntity ORDER BY rand()").setMaxResults(1).getSingleResult();
		BookJsonItf aBook = response.prepareNewBookRandom();
		aBook.setField(randomBook);
	}

	@Override
	public void getNewest(InitResponseJsonItf response) {
		try {
			BookEntity randomBook = (BookEntity) this.manager.createQuery("FROM BookEntity ORDER BY idBook DESC").setMaxResults(1).getSingleResult();
			BookJsonItf aBook = response.prepareNewBookNewest();
			aBook.setField(randomBook);
		} catch (Exception e) {
			System.err.println(ERR_MESSAGE + e.getMessage());
		}
	}
	
	@Override
	public void getMostBuy(InitResponseJsonItf response) {
		int mostBuyBook;
		try {
			mostBuyBook = (Integer) this.manager.createNativeQuery("SELECT idBook FROM (SELECT idBook, SUM(quantity) AS TotalQuantity FROM CmdDetail GROUP BY idBook ORDER BY TotalQuantity DESC LIMIT 1) as t").getSingleResult();
		} catch (Exception e) {
			System.err.println(ERR_MESSAGE + e.getMessage());
			return;
		}
		BookJsonItf res = response.prepareNewBookMostBuy();
		res.setField(this.book.getBook(mostBuyBook));
	}

	@Override
	public void getRange(InitResponseJsonItf response) {
		int min = 0;
		int max = 100;
		try {
			min = Math.round(((Float) this.manager.createNativeQuery("SELECT MIN(price) FROM Book").getSingleResult())-1);
			min = Math.max(0, min);
			max = Math.round(((Float) this.manager.createNativeQuery("SELECT MAX(price) FROM Book").getSingleResult())+1);
		} catch (Exception e) {
			System.err.println(ERR_MESSAGE + e.getMessage());
		}
		response.setRange(min, max);
	}

	@Override
	public void getStatiAddress(InitResponseJsonItf res) {
		res.setBordeaux(Helper.BORDEAUX);
		res.setParis(Helper.PARIS);
		res.setGrenoble(Helper.GRENOBLE);
	}
}

package init;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;

import book.bean.BookBeanLocal;
import book.dataItf.BookJsonItf;
import book.dataItf.InitResponseJsonItf;
import book.entity.BookEntity;
import shared.AbstractBean;
import shared.Helper;

/**
 * Session Bean implementation class Init
 */
@Stateless
@LocalBean
public class InitBean extends AbstractBean implements InitBeanLocal {
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/BookBean!book.bean.BookBean")
	private BookBeanLocal book;

    /**
     * Default constructor. 
     */
    public InitBean() {}

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
			System.err.println(e.getMessage());
		}
	}

	@Override
	public void getMostBuy(InitResponseJsonItf response) {
		Integer mostBuyBook;
		try {
			mostBuyBook = (Integer) this.manager.createNativeQuery("SELECT idBook AS total FROM CmdDetail GROUP BY idBook ORDER BY total DESC LIMIT 1").getSingleResult();
		} catch (Exception e) {
			System.err.println(e.getMessage());
			return;
		}
		BookJsonItf res = response.prepareNewBookMostBuy();
		res.setField(this.book.getBook(mostBuyBook));
	}

	@Override
	public void getRange(InitResponseJsonItf response) {
		Integer min = 0;
		Integer max = 100;
		try {
			min = Math.round(((Float) this.manager.createNativeQuery("SELECT MIN(price) FROM Book").getSingleResult())-1);
			min = Math.max(0, min);
			max = Math.round(((Float) this.manager.createNativeQuery("SELECT MAX(price) FROM Book").getSingleResult())+1);
		} catch (Exception e) {
			System.err.println(e.getMessage());
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
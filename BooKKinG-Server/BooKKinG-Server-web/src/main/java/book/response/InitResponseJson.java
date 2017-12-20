package book.response;

import book.dataItf.BookJsonItf;
import init.InitResponseJsonItf;
import shared.GenericResponseJson;

/**
 * fourni des constantes sur les livres du site
 */
@SuppressWarnings("unused")
public class InitResponseJson extends GenericResponseJson implements InitResponseJsonItf{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -2810277503844727785L;
	
	/**
	 * livre le plus acheté
	 */
	private BookJson mostBuyBook;
	
	/**
	 * un livre aléatoire
	 */
	private BookJson randomBook;
	
	/**
	 * livre le plus récent
	 */
	private BookJson newestBook;
	
	/**
	 * adresse du magasin de paris
	 */
	private String parisAddress;
	
	/**
	 * adresse de bordeaux
	 */
	private String BordeauxAddress;
	
	/**
	 * adresse de grenoble
	 */
	private String grenobleAddress;
	
	/**
	 * prix du livre le moins cher
	 */
	private int min;
	
	/**
	 * prix du livre le plus cher
	 */
	private int max;

	/**
	 * default constructor
	 */
	public InitResponseJson() {
		super();
	}

	@Override
	public void setRange(int minPrice, int maxPrice) {
		this.min = minPrice;
		this.max = maxPrice;
	}

	@Override
	public BookJsonItf prepareNewBookRandom() {
		this.randomBook = new BookJson();
		return this.randomBook;
	}

	@Override
	public BookJsonItf prepareNewBookNewest() {
		this.newestBook = new BookJson();
		return this.newestBook;
	}

	@Override
	public BookJsonItf prepareNewBookMostBuy() {
		this.mostBuyBook = new BookJson();
		return this.mostBuyBook;
	}

	@Override
	public void setParis(String addr) {
		this.parisAddress = addr;
	}

	@Override
	public void setBordeaux(String addr) {
		this.BordeauxAddress = addr;
	}

	@Override
	public void setGrenoble(String addr) {
		this.grenobleAddress = addr;
	}

}

package book.response;

import book.dataItf.BookJsonItf;
import init.InitResponseJsonItf;
import shared.GenericResponseJson;

public class InitResponseJson extends GenericResponseJson implements InitResponseJsonItf{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -2810277503844727785L;
	
	private BookJson mostBuyBook;
	
	private BookJson randomBook;
	
	private BookJson newestBook;
	
	@SuppressWarnings("unused")
	private String parisAddress;
	
	@SuppressWarnings("unused")
	private String BordeauxAddress;
	
	@SuppressWarnings("unused")
	private String grenobleAddress;
	
	@SuppressWarnings("unused")
	private int min;
	
	@SuppressWarnings("unused")
	private int max;

	public InitResponseJson() {
		// TODO Auto-generated constructor stub
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

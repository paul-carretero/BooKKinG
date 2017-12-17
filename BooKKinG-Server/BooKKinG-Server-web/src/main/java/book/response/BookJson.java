package book.response;

import book.dataItf.BookJsonItf;
import book.entity.BookEntItf;
import shared.GenericResponseJson;
import shared.Genre;
import shared.Type;

public class BookJson extends GenericResponseJson implements BookJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1558650586696499087L;

	@SuppressWarnings("unused")
	private Genre genre;
	
	@SuppressWarnings("unused")
	private Type type;
	
	@SuppressWarnings("unused")
	private String author;
	
	@SuppressWarnings("unused")
	private Float price;
	
	@SuppressWarnings("unused")
	private String title;
	
	@SuppressWarnings("unused")
	private String picture;
	
	@SuppressWarnings("unused")
	private String summary;
	
	@SuppressWarnings("unused")
	private int idBook;
	
	@SuppressWarnings("unused")
	private int stock;
	
	
	public BookJson() {
		super();
	}

	public BookJson(final BookEntItf bookEnt) {
		super();
		this.genre		= bookEnt.getGenre();
		this.type 		= bookEnt.getType();
		this.author		= bookEnt.getAuthor();
		this.price 		= bookEnt.getPrice();
		this.title 		= bookEnt.getTitle();
		this.picture 	= bookEnt.getPicture();
		this.summary 	= bookEnt.getSummary();
		this.idBook 	= bookEnt.getIdBook();
		this.stock 		= bookEnt.getStock();
	}
	
	@Override
	public void setField(final BookEntItf bookEnt) {
		this.genre		= bookEnt.getGenre();
		this.type 		= bookEnt.getType();
		this.author		= bookEnt.getAuthor();
		this.price 		= bookEnt.getPrice();
		this.title 		= bookEnt.getTitle();
		this.picture 	= bookEnt.getPicture();
		this.summary 	= bookEnt.getSummary();
		this.idBook 	= bookEnt.getIdBook();
		this.stock 		= bookEnt.getStock();
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public void setStock(final int i) {
		this.stock = i;
	}
	
	@Override
	public BookJson simplify() {
		this.summary = "";
		this.picture = "";
		return this;
	}

	@Override
	public void setField(int idBook, String title, int stock) {
		this.idBook	= idBook;
		this.title 	= title;
		this.stock 	= stock;
	}
}

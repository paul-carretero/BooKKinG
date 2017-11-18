package response;

import JsonItf.BookJsonItf;
import localItf.BookEntItf;
import shared.AbstractJson;

public class BookJson extends AbstractJson implements BookJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1558650586696499087L;

	@SuppressWarnings("unused")
	private String genre;
	
	@SuppressWarnings("unused")
	private String type;
	
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
	private Integer idBook;
	
	@SuppressWarnings("unused")
	private Integer stock;
	
	/**
	 * @param genre
	 * @param type
	 * @param author
	 * @param price
	 * @param title
	 * @param picture
	 * @param summary
	 * @param idBook
	 * @param stock
	 */
	public BookJson(final String genre, final String type, final String author, final Float price, final String title, final String picture,
			final String summary, final Integer idBook, final Integer stock) {
		super();
		this.genre		= genre;
		this.type 		= type;
		this.author		= author;
		this.price 		= price;
		this.title 		= title;
		this.picture 	= picture;
		this.summary 	= summary;
		this.idBook 	= idBook;
		this.stock 		= stock;
}

	public BookJson(final BookEntItf bookEnt) {
		super();
		this.genre		= bookEnt.getGenre().toString();
		this.type 		= bookEnt.getType().toString();
		this.author		= bookEnt.getAuthor();
		this.price 		= bookEnt.getPrice();
		this.title 		= bookEnt.getTitle();
		this.picture 	= bookEnt.getPicture();
		this.summary 	= bookEnt.getSummary();
		this.idBook 	= bookEnt.getIdBook();
		this.stock 		= bookEnt.getStock();
	}
	
	public BookJson() {
		super();
	}
	
	@Override
	public void setField(final BookEntItf bookEnt) {
		this.genre		= bookEnt.getGenre().toString();
		this.type 		= bookEnt.getType().toString();
		this.author		= bookEnt.getAuthor();
		this.price 		= bookEnt.getPrice();
		this.title 		= bookEnt.getTitle();
		this.picture 	= bookEnt.getPicture();
		this.summary 	= bookEnt.getSummary();
		this.idBook 	= bookEnt.getIdBook();
		this.stock 		= bookEnt.getStock();
	}
}

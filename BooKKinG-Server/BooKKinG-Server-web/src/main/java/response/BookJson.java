package response;

import localItf.BookEntItf;
import shared.AbstractJson;

public class BookJson extends AbstractJson {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1558650586696499087L;

	@SuppressWarnings("unused")
	private String genre = "";
	
	@SuppressWarnings("unused")
	private String type = "";
	
	@SuppressWarnings("unused")
	private String author = "";
	
	@SuppressWarnings("unused")
	private Float price = 0f;
	
	@SuppressWarnings("unused")
	private String title = "";
	
	@SuppressWarnings("unused")
	private String picture = "";
	
	@SuppressWarnings("unused")
	private String summary = "";
	
	@SuppressWarnings("unused")
	private Integer idBook = 0;
	
	@SuppressWarnings("unused")
	private Integer stock = 0;

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
	public BookJson(String genre, String type, String author, Float price, String title, String picture,
			String summary, Integer idBook, Integer stock) {
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

	public BookJson(BookEntItf bookEnt) {
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
}

package response;

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
	private Integer price = 0;
	
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
	 * @param price
	 * @param title
	 * @param idBook
	 */
	public BookJson(Integer price, String title, Integer idBook) {
		super();
		this.price		= price;
		this.title 		= title;
		this.idBook		= idBook;
	}

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
	public BookJson(String genre, String type, String author, Integer price, String title, String picture,
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


}

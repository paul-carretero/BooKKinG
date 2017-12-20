package book.response;

import book.dataItf.BookJsonItf;
import book.entity.BookEntItf;
import shared.GenericResponseJson;
import shared.Genre;
import shared.Type;

/**
 * représnte les données d'un livre retourné à l'utilisateur
 */
@SuppressWarnings("unused")
public class BookJson extends GenericResponseJson implements BookJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1558650586696499087L;

	/**
	 * genre du livre
	 */
	private Genre genre;
	
	/**
	 * type du livre
	 */
	private Type type;
	
	/**
	 * auteur du livre
	 */
	private String author;
	
	/**
	 * prix du livre
	 */
	private float price;
	
	/**
	 * titre du livre
	 */
	private String title;
	
	/**
	 * image en base64 du livre
	 */
	private String picture;
	
	/**
	 * résumé du livre
	 */
	private String summary;
	
	/**
	 * id du livre
	 */
	private int idBook;
	
	/**
	 * stock du livre
	 */
	private int stock;
	
	
	/**
	 * default constructor
	 */
	public BookJson() {
		super();
	}

	/**
	 * construit une réprésentation d'un livre pour un utilisateur à partir d'une entité JPA
	 * @param bookEnt une entité(interface publique) représentant les données d'un livre
	 */
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

	/**
	 * défini le prix de ce livre
	 * @param price un prix
	 */
	public void setPrice(Float price) {
		this.price = price;
	}

	/**
	 * met à jour le stock de ce livre
	 * @param i le stock du livre
	 */
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

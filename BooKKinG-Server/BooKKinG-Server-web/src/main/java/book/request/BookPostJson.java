package book.request;

import book.dataItf.BookCreateDataItf;
import shared.AbstractJson;
import shared.Genre;
import shared.Type;
import shared.Validifyable;

/**
 * représentation des donnée d'un livre pour une mise à jour
 * Note: dans la version actuelle de l'application seul le stock peut être mis à joru
 */
public class BookPostJson extends AbstractJson implements BookCreateDataItf, Validifyable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 8995433888753949684L;
	
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
	 * stock du livre
	 */
	private int stock;
	
	/**
	 * du livre à mettre à jour ou 0 si création
	 */
	private int idBook;

	/**
	 * Default Constructor
	 */
	public BookPostJson() {}

	@Override
	public Genre getGenre() {
		return this.genre;
	}

	@Override
	public Type getType() {
		return this.type;
	}

	@Override
	public String getAuthor() {
		return this.author;
	}

	@Override
	public float getPrice() {
		return this.price;
	}

	@Override
	public String getTitle() {
		return this.title;
	}

	@Override
	public String getPicture() {
		return this.picture;
	}

	@Override
	public String getSummary() {
		return this.summary;
	}

	@Override
	public int getStock() {
		return this.stock;
	}
	
	@Override
	public int getIdBook() {
		return this.idBook;
	}

	@Override
	public void validify() {
		if(this.genre == null) {
			this.genre = Genre.ANY;
		}
		if(this.summary == null) {
			this.summary = "";
		}
		if(this.picture == null) {
			this.picture = "";
		}
		if(this.title == null) {
			this.title = "";
		}
		if(this.type == null) {
			this.type = Type.ANY;
		}
		if(this.author == null) {
			this.author = "";
		}
	}
}

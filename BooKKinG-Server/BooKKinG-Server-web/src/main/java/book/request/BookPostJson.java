package book.request;

import book.dataItf.BookCreateDataItf;
import shared.AbstractJson;
import shared.Genre;
import shared.Type;
import shared.Validifyable;

public class BookPostJson extends AbstractJson implements BookCreateDataItf, Validifyable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 8995433888753949684L;
	
	private Genre genre;
	
	private Type type;
	
	private String author;
	
	private Float price;
	
	private String title;
	
	private String picture;
	
	private String summary;
		
	private int stock;
	
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
		if(this.price == null) {
			this.price = 0f;
		}
		if(this.type == null) {
			this.type = Type.ANY;
		}
		if(this.author == null) {
			this.author = "";
		}
	}
}

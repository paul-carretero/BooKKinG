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
		
	private Integer stock;

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
	public Float getPrice() {
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
	public Integer getStock() {
		return this.stock;
	}

	@Override
	public void validify() {
		if(this.genre == null) {
			this.genre = Genre.DEFAULT;
		}
		if(this.stock == null) {
			this.stock = 0;
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

package request;

import shared.AbstractJson;
import shared.Genre;
import shared.Type;

/**
 * @author Paul Carretero
 *
 */
public class BookSearchJson extends AbstractJson {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 5846257485776344805L;
	
	/**
	 * le titre contient
	 */
	private String title;
	
	/**
	 * le nom de l'auteur contient
	 */
	private String author;
	
	/**
	 * prix maximum
	 */
	private Integer maxPrice;
	
	/**
	 * prix minimum
	 */
	private Integer minPrice;
	
	/**
	 * Ensemble des types de la recherche
	 */
	private Type types;
	
	/**
	 * Ensemble des genre sur la recherche
	 */
	private Genre[] genres;
	

	public BookSearchJson() {
		super();
	}
	
	/**
	 * @param title
	 * @param author
	 * @param maxPrice
	 * @param minPrice
	 * @param genres
	 * @param types
	 */
	public BookSearchJson(String title, String author, Integer maxPrice, Integer minPrice, Genre[] genres, Type types) {
		super();
		this.title = title;
		this.author = author;
		this.maxPrice = maxPrice;
		this.minPrice = minPrice;
		this.genres = genres;
		this.types = types;
	}
	
	public String getTitle() {
		return this.title;
	}

	public String getAuthor() {
		return this.author;
	}

	public Integer getMaxPrice() {
		return this.maxPrice;
	}

	public Integer getMinPrice() {
		return this.minPrice;
	}

	public Type getTypes() {
		return this.types;
	}

	public Genre[] getGenres() {
		return this.genres;
	}

}

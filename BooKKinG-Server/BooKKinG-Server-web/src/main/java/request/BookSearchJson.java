package request;

import java.util.List;

import JsonItf.BookSearchJsonItf;
import shared.AbstractJson;
import shared.Genre;
import shared.Type;

/**
 * @author Paul Carretero
 *
 */
public class BookSearchJson extends AbstractJson implements BookSearchJsonItf {

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
	private List<Genre> genres;


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
	public BookSearchJson(String title, String author, int maxPrice, int minPrice, List<Genre> genres, Type types) {
		super();
		this.title = title;
		this.author = author;
		this.maxPrice = maxPrice;
		this.minPrice = minPrice;
		this.genres = genres;
		this.types = types;
	}

	@Override
	public String getTitle() {
		return this.title;
	}

	@Override
	public String getAuthor() {
		return this.author;
	}

	@Override
	public Integer getMaxPrice() {
		return this.maxPrice;
	}

	@Override
	public Integer getMinPrice() {
		return this.minPrice;
	}

	@Override
	public Type getTypes() {
		return this.types;
	}

	@Override
	public List<Genre> getGenres() {
		return this.genres;
	}

}

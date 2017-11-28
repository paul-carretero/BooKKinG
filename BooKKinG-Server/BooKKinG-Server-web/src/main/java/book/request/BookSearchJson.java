package book.request;

import java.util.ArrayList;
import java.util.List;

import book.dataItf.BookSearchItf;
import shared.AbstractJson;
import shared.Genre;
import shared.Type;
import shared.Validifyable;

/**
 * @author Paul Carretero
 *
 */
public class BookSearchJson extends AbstractJson implements BookSearchItf, Validifyable {

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
	private int maxPrice;

	/**
	 * prix minimum
	 */
	private int minPrice;

	/**
	 * Ensemble des types de la recherche
	 */
	private Type type;

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
	public BookSearchJson(String title, String author, int maxPrice, int minPrice, List<Genre> genres, Type type) {
		super();
		this.title = title;
		this.author = author;
		this.maxPrice = maxPrice;
		this.minPrice = minPrice;
		this.genres = genres;
		this.type = type;
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
	public Type getType() {
		return this.type;
	}

	@Override
	public List<Genre> getGenres() {
		return this.genres;
	}
	
	@Override
	public void validify() {
		if(this.type == null) {
			this.type = Type.ANY;
		}
		if(this.genres == null) {
			this.genres = new ArrayList<>();
		}
		if(this.author == null) {
			this.author = "";
		}
		if(this.title == null) {
			this.title = "";
		}
	}
}

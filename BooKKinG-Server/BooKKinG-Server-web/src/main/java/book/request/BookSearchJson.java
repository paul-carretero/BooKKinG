package book.request;

import book.dataItf.BookSearchItf;
import shared.AbstractJson;
import shared.Genre;
import shared.Type;
import shared.Validifyable;

/**
 * représente la saisie utilisateur pour une recherche de livres
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
	private Genre genre;
	
	/**
	 * Recherche sur l'autheur, le titre ou le résumé. Mots dans le désordre OK
	 */
	private String anySearch;
	
	/**
	 * page de la recherche (10 résultats par page, triés par title)
	 */
	private int page;


	/**
	 * default constructor
	 */
	public BookSearchJson() {
		super();
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
	public int getMaxPrice() {
		return this.maxPrice;
	}

	@Override
	public int getMinPrice() {
		return this.minPrice;
	}

	@Override
	public Type getType() {
		return this.type;
	}

	@Override
	public Genre getGenre() {
		return this.genre;
	}

	@Override
	public String getAnySearch() {
		return this.anySearch;
	}
	
	@Override
	public int getPage() {
		return this.page;
	}
	
	@Override
	public void validify() {
		if(this.type == null) {
			this.type = Type.ANY;
		}
		if(this.genre == null) {
			this.genre = Genre.ANY;
		}
		if(this.author == null) {
			this.author = "";
		}
		if(this.title == null) {
			this.title = "";
		}
		if(this.anySearch == null) {
			this.anySearch = "";
		}
		if(this.page > 0) {
			this.page--;
		}
	}
}

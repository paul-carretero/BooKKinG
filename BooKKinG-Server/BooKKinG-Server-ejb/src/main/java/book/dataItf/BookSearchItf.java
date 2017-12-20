package book.dataItf;

import shared.Genre;
import shared.Type;

/**
 * donnée en entrée de recherche pour un livre
 * les champs ne sont pas exclusif (généralement...)
 */
public interface BookSearchItf {

	/**
	 * @return le titre d'un livre à rechercher
	 */
	public String getTitle();

	/**
	 * @return l'autheur des livres à rechercher
	 */
	public String getAuthor();

	/**
	 * @return le prix maximum des livres à rechercher
	 */
	public int getMaxPrice();

	/**
	 * @return le prix minimum des livres à rechercher
	 */
	public int getMinPrice();

	/**
	 * @return el type des livres à rechercher
	 */
	public Type getType();

	/**
	 * @return el genre des livres à rechercher
	 */
	public Genre getGenre();
	
	/**
	 * @return une recherche quelconque
	 */
	public String getAnySearch();

	/**
	 * @return la page de résultats à retourner
	 */
	public int getPage();

}
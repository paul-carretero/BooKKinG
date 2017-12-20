package book.dataItf;

import shared.Genre;
import shared.Type;

/**
 * Interface réprésentant les données en entrée pour un livre
 */
public interface BookCreateDataItf {

	/**
	 * @return le genre du livre
	 */
	public Genre getGenre();

	/**
	 * @return le type du livre
	 */
	public Type getType();

	/**
	 * @return l'auteur du livre
	 */
	public String getAuthor();

	/**
	 * @return le prix du livre
	 */
	public float getPrice();

	/**
	 * @return le titre du livre
	 */
	public String getTitle();

	/**
	 * @return l'image en base 64 du livre
	 */
	public String getPicture();

	/**
	 * @return le résumé du livre
	 */
	public String getSummary();

	/**
	 * @return le stock du livre
	 */
	public int getStock();

	/**
	 * @return l'id du livre, éventuellement 0 si non défini
	 */
	public int getIdBook();

}
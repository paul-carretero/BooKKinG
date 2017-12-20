package book.entity;

import shared.Genre;
import shared.Type;

/**
 * interface publique d'une entité de livre
 */
public interface BookEntItf {

	/**
	 * @return l'id du livre
	 */
	public int getIdBook();

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
	 * @return le résumé du livre
	 */
	public String getSummary();

	/**
	 * @return l'image en base64 du livre
	 */
	public String getPicture();

	/**
	 * @return le prix du livre
	 */
	public float getPrice();

	/**
	 * @return le stock courant du livre
	 */
	public int getStock();

	/**
	 * @return le titre du livre
	 */
	public String getTitle();
	
	/**
	 * @param value décrémente le stock du livre de cette valeur
	 */
	public void removeFromStock(int value);

}
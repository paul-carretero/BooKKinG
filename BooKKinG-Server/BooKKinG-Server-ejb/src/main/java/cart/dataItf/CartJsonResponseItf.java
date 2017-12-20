package cart.dataItf;

import book.entity.BookEntItf;
import shared.GenericResponseJsonItf;

/**
 * un réponse contenant le contenu d'un panier d'un utilisateur
 */
public interface CartJsonResponseItf extends GenericResponseJsonItf {

	/**
	 * permet d'ajouter une entrée dans le panier
	 * @param aBook un livre à ajouter au panier utilisateur
	 * @param quantity la quantité de ce livre
	 */
	public void addBook(BookEntItf aBook, int quantity);

}
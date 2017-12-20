package book.dataItf;

import book.entity.BookEntItf;
import shared.GenericResponseJsonItf;

/**
 * Interface de réponse permettant à un bean de représenter un livre
 */
public interface BookJsonItf extends GenericResponseJsonItf {

	/**
	 * @param bookEnt interface de l'entité d'un livre (accès simplifié)
	 */
	public void setField(BookEntItf bookEnt);

	/**
	 * @return simplify le livre en supprimant le résumé et l'image (dans les cas ou ceux si sont inutile)
	 */
	public BookJsonItf simplify();

	/**
	 * met à jour des champs de cette réponse
	 * @param idBook l'id uu livre
	 * @param title le titre du livre
	 * @param stock le stock du livre
	 */
	public void setField(int idBook, String title, int stock);

}
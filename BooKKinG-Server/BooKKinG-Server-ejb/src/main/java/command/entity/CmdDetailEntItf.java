package command.entity;

import book.entity.BookEntItf;

/**
 * interface d'une entité associé au détail d'une entrée d'une commande
 */
public interface CmdDetailEntItf {

	/**
	 * @return l'entité associé à cette entrée
	 */
	public CommandEntItf getCommand();

	/**
	 * @return le livre associé à cette entrée
	 */
	public BookEntItf getBook();

	/**
	 * @return la quantité associé à cette entrée
	 */
	public int getQuantity();

	/**
	 * @return le prix unitaire associé à cette entrée
	 */
	public float getPrice();

}
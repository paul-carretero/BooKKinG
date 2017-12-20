package command.dataItf;

import book.entity.BookEntItf;
import shared.GenericResponseJsonItf;

/**
 * rerésente les données d'une commande
 */
public interface CommandJsonItf extends GenericResponseJsonItf {

	/**
	 * ajoute une nouvelle entrée à une commande
	 * @param aBook un livre
	 * @param price le prix courrant du livre
	 * @param quantity la quantité du livre
	 * @param isInStock true si le livre est en stock pour la commande, faux sinon
	 */
	public void addCmdEntry(BookEntItf aBook, Float price, int quantity, boolean isInStock);

	/**
	 * défini l'id d'une commande
	 * @param idCmd id d'une commande
	 */
	public void setIdCmd(int idCmd);

	/**
	 * défini la date de la commande
	 * @param date date de la commande
	 */
	public void setDate(String date);

	/**
	 * ajoute une nouvelle entrée à une commande
	 * @param aBook un livre
	 * @param price le prix courrant du livre
	 * @param quantity la quantité du livre
	 */
	public void addCmdEntry(BookEntItf aBook, Float price, int quantity);

	/**
	 * @param shippingCost le cout de livraison
	 */
	public void setShippingCost(int shippingCost);

	/**
	 * @param shippingAddress l'adresse de livraison
	 */
	public void setShippingAddress(String shippingAddress);

	/**
	 * @param invoiceAddress l'adresse de facturation
	 */
	public void setInvoiceAddress(String invoiceAddress);

}
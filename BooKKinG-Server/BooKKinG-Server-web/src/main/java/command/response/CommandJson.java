package command.response;

import java.util.LinkedList;
import java.util.List;

import book.entity.BookEntItf;
import book.response.BookJson;
import cart.request.CartItemJson;
import command.dataItf.CommandJsonItf;
import shared.GenericResponseJson;

/**
 * représente les données d'une commande passé par un utilisateur
 * Les livre stocké dans cette représentation ne possède pas d'image ou de résumé (inutilisé)
 */
@SuppressWarnings("unused")
public class CommandJson extends GenericResponseJson implements CommandJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1001378718668543497L;

	/**
	 * Date de la commande
	 */
	private String 				date;
	
	/**
	 * id de la commande
	 */
	private Integer				idCmd;

	/**
	 * liste des livre de cette commande
	 */
	private List<BookJson>		books;

	/**
	 * liste des entrée livre et quantité de cette commande
	 */
	private List<CartItemJson> 	items;
	
	/**
	 * cout de livraison
	 */
	private int 				shippingCost;
	
	/**
	 * addrese de livraison
	 */
	private String				shippingAddress;
	
	/**
	 * addresse client de facturation
	 */
	private String				invoiceAddress;

	/**
	 * default constructor
	 */
	public CommandJson() {
		super();
		this.books 		= new LinkedList<>();
		this.items 		= new LinkedList<>();
	}
	
	@Override
	public void setDate(final String date) {
		this.date = date;
	}

	@Override
	public void setIdCmd(final int idCmd) {
		this.idCmd = idCmd;
	}
	
	@Override
	public void setShippingCost(final int shippingCost) {
		this.shippingCost = shippingCost;
	}

	@Override
	public void setShippingAddress(final String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}
	
	@Override
	public void setInvoiceAddress(final String invoiceAddress) {
		this.invoiceAddress = invoiceAddress;
	}

	@Override
	public void addCmdEntry(BookEntItf aBook,Float price, int quantity) {
		BookJson b = new BookJson(aBook);
		b.setPrice(price);
		b.simplify();
		this.books.add(b);
		this.items.add(new CartItemJson(aBook.getIdBook(), quantity));
	}
	
	@Override
	public void addCmdEntry(BookEntItf aBook,Float price, int quantity, boolean isInStock) {
		BookJson b = new BookJson(aBook);
		b.setPrice(price);
		b.setStock(0);
		b.simplify();
		if(isInStock) {
			b.setStock(100000);
		}
		this.books.add(b);
		this.items.add(new CartItemJson(aBook.getIdBook(), quantity, isInStock));
	}
}

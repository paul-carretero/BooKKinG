package command.response;

import java.util.LinkedList;
import java.util.List;

import book.entity.BookEntItf;
import book.response.BookJson;
import cart.request.CartItemJson;
import command.dataItf.CommandJsonItf;
import shared.GenericResponseJson;

public class CommandJson extends GenericResponseJson implements CommandJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1001378718668543497L;

	/**
	 * Date de la commande
	 */
	@SuppressWarnings("unused")
	private String 				date;
	
	@SuppressWarnings("unused")
	private Integer				idCmd;

	private List<BookJson>		books;

	private List<CartItemJson> 	items;
	
	@SuppressWarnings("unused")
	private Integer 			shippingCost;
	
	@SuppressWarnings("unused")
	private String				shippingAddress;

	public CommandJson() {
		super();
		this.books 		= new LinkedList<>();
		this.items 		= new LinkedList<>();
	}

	public CommandJson(final String date, final Integer idCmd, final Integer shippingCost, final String shippingAddress) {
		super();
		this.date				= date;
		this.idCmd				= idCmd;
		this.shippingAddress	= shippingAddress;
		this.shippingCost		= shippingCost;
		this.books 				= new LinkedList<>();
		this.items 				= new LinkedList<>();
	}
	
	@Override
	public void setDate(final String date) {
		this.date = date;
	}

	@Override
	public void setIdCmd(final Integer idCmd) {
		this.idCmd = idCmd;
	}
	
	@Override
	public void setShippingCost(final Integer shippingCost) {
		this.shippingCost = shippingCost;
	}

	@Override
	public void setShippingAddress(final String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	/**
	 * @param aBook
	 * @param price
	 * @param quantity
	 */
	@Override
	public void addCmdEntry(BookEntItf aBook,Float price, Integer quantity) {
		BookJson b = new BookJson(aBook);
		b.setPrice(price);
		this.books.add(b);
		this.items.add(new CartItemJson(aBook.getIdBook(), quantity));
	}
	
	/**
	 * @param aBook
	 * @param price
	 * @param quantity
	 */
	@Override
	public void addCmdEntry(BookEntItf aBook,Float price, Integer quantity, boolean isInStock) {
		BookJson b = new BookJson(aBook);
		b.setPrice(price);
		this.books.add(b);
		this.items.add(new CartItemJson(aBook.getIdBook(), quantity, isInStock));
	}
}

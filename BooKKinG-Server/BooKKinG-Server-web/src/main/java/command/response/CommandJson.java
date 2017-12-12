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

	public CommandJson() {
		super();
		this.books 		= new LinkedList<>();
		this.items 		= new LinkedList<>();
	}

	public CommandJson(final String date, final Integer idCmd) {
		super();
		this.date		= date;
		this.idCmd		= idCmd;
		this.books 		= new LinkedList<>();
		this.items 		= new LinkedList<>();
	}
	
	@Override
	public void setDate(String date) {
		this.date = date;
	}

	@Override
	public void setIdCmd(Integer idCmd) {
		this.idCmd = idCmd;
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

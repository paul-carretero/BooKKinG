package command.response;

import java.util.HashMap;
import java.util.Map;

import book.entity.BookEntItf;
import book.response.BookJson;
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
	private String 					date;
	
	@SuppressWarnings("unused")
	private Integer					idCmd;

	/**
	 * idBook=>BookJson
	 */
	private Map<Integer,BookJson>	books;

	/**
	 * idBook=>price(unitaire)
	 */
	private Map<Integer,Float> 		prices;

	/**
	 * idBook=>quantity
	 */
	private Map<Integer,Integer> 	quantities;

	/**
	 * @param date
	 */
	public CommandJson() {
		super();
		this.books 		= new HashMap<>();
		this.prices 	= new HashMap<>();
		this.quantities = new HashMap<>();
	}

	public CommandJson(final String date, final Integer idCmd) {
		super();
		this.date		= date;
		this.idCmd		= idCmd;
		this.books 		= new HashMap<>();
		this.prices 	= new HashMap<>();
		this.quantities = new HashMap<>();
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
		this.books.put(aBook.getIdBook(), new BookJson(aBook));
		this.prices.put(aBook.getIdBook(), price);
		this.quantities.put(aBook.getIdBook(), quantity);
	}
}

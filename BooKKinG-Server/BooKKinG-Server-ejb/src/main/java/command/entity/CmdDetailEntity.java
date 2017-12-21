package command.entity;

import java.io.Serializable;
import javax.persistence.*;

import book.entity.BookEntItf;
import book.entity.BookEntity;

/**
 * Entity implementation class for Entity: CmdDetails
 *
 */
@Entity @IdClass(CmdDetailId.class)
@Table(name="CmdDetail")

public class CmdDetailEntity implements Serializable, CmdDetailEntItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 4664536675074750961L;

	/**
	 * command associé à cette entrée de commande
	 */
	@Id
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="idCmd", nullable=false)
	private CommandEntity command;

	/**
	 * livre associé à cette commande
	 */
	@Id
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="idBook", nullable=false)
	private BookEntity book;
	
	/**
	 * quantité de livre dans cette entrée de commande
	 */
	@Column(name="quantity")
	private int quantity;
	
	/**
	 * prix d'une entrée de la commande (uniaire) au moment de la commandes
	 */
	@Column(name="price")
	private float price;

	/**
	 * default constructor
	 */
	public CmdDetailEntity() {
		super();
	}

	/**
	 * @param command
	 * @param book
	 * @param amount
	 * @param price
	 */
	public CmdDetailEntity(CommandEntity command, BookEntity book, int amount, Float price) {
		super();
		this.command = command;
		this.book = book;
		this.quantity = amount;
		this.price = price;
	}

	@Override
	public CommandEntItf getCommand() {
		return this.command;
	}

	@Override
	public BookEntItf getBook() {
		return this.book;
	}

	@Override
	public int getQuantity() {
		return this.quantity;
	}

	@Override
	public float getPrice() {
		return this.price;
	}
	
	@Override
	public String toString() {
		String stock = (this.getBook().getStock() > 0) ? "oui" : "non"; // le stock a été maj avant l'envoi du mail
		StringBuffer res = new StringBuffer();
		res.append("<tr>");
		res.append("<td class=\"item-col item\">");
		res.append("<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">");
		res.append("<tr>");
		res.append("<td class=\"mobile-hide-img\">");
		//res.append("<a href=\"\"><img width=\"110\" height=\"92\" src=\"data:image/jpeg;base64, ");
		//res.append(this.book.getPicture());
		//res.append("\" alt=\"item2\"></a>");
		res.append("</td>");
		res.append("<td class=\"product\">");
		res.append("<span style=\"color: #4d4d4d; font-weight: bold;\">");
		res.append(this.book.getTitle());
		res.append("</span> <br />");
		res.append(this.book.getType());
		res.append(" - ");
		res.append(this.book.getGenre());
		res.append("</td>");
		res.append("</tr>");
		res.append("</table>");
		res.append("</td>");
		res.append("<td class=\"item-col quantity\">");
		res.append(this.quantity);
		res.append("</td>");
		res.append("<td class=\"item-col quantity\">");
		res.append(stock);
		res.append("</td>");
		res.append("<td class=\"item-col price\">");
		res.append(this.price);
		res.append("€");
		res.append("</td>");
		res.append("</tr>");
		return res.toString();
	}
   
}

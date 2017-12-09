package command.entity;

import java.io.Serializable;
import javax.persistence.*;

import book.entity.BookEntItf;
import book.entity.BookEntity;
import shared.Helper;

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

	@Id
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idCmd")
	private CommandEntity command;

	@Id
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idBook")
	private BookEntity book;
	
	@Column(name="quantity")
	private Integer quantity;
	
	@Column(name="price")
	private Float price;

	public CmdDetailEntity() {
		super();
	}

	/**
	 * @param command
	 * @param book
	 * @param amount
	 * @param price
	 */
	public CmdDetailEntity(CommandEntity command, BookEntity book, Integer amount, Float price) {
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
	public Integer getQuantity() {
		return this.quantity;
	}

	@Override
	public Float getPrice() {
		return this.price;
	}

	public void setCommand(CommandEntity command) {
		this.command = command;
	}

	public void setBook(BookEntity book) {
		this.book = book;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public void setPrice(Float price) {
		this.price = price;
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
		res.append("<a href=\"\"><img width=\"110\" height=\"92\" src=\"data:image/png;base64, ");
		res.append(this.book.getPicture());
		res.append("\" alt=\"item2\"></a>");
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
		res.append(this.quantity.toString());
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

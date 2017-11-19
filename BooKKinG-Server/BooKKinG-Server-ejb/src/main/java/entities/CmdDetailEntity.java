package entities;

import java.io.Serializable;
import javax.persistence.*;

import localItf.BookEntItf;
import localItf.CmdDetailEntItf;
import localItf.CommandEntItf;

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
		StringBuffer res = new StringBuffer();
		res.append(this.quantity);
		res.append(" * [");
		res.append(this.book.getTitle());
		res.append("]  (");
		res.append((this.quantity * this.price));
		res.append("€)");
		return res.toString();
	}
   
}

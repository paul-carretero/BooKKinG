package entities;

import java.io.Serializable;
import javax.persistence.*;

/**
 * Entity implementation class for Entity: CmdDetails
 *
 */
@Entity @IdClass(CmdDetailId.class)
@Table(name="CmdDetail")

public class CmdDetail implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 4664536675074750961L;

	@Id
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idCmd")
	private Command command;

	@Id
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idBook")
	private Book book;
	
	@Column(name="amount")
	private Integer amount;
	
	@Column(name="price")
	private Integer price;

	public CmdDetail() {
		super();
	}

	/**
	 * @param command
	 * @param book
	 * @param amount
	 * @param price
	 */
	public CmdDetail(Command command, Book book, Integer amount, Integer price) {
		super();
		this.command = command;
		this.book = book;
		this.amount = amount;
		this.price = price;
	}

	public Command getCommand() {
		return this.command;
	}

	public Book getBook() {
		return this.book;
	}

	public Integer getAmount() {
		return this.amount;
	}

	public Integer getPrice() {
		return this.price;
	}

	public void setCommand(Command command) {
		this.command = command;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}
   
}

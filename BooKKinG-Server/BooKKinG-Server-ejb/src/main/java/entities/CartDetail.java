package entities;

import java.io.Serializable;

import javax.persistence.*;

/**
 * Entity implementation class for Entity: CartDetail
 *
 */
@Entity @IdClass(CartDetailId.class)
@Table(name="CartDetail")

public class CartDetail implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3660254030963323536L;

	@Id
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idUser")
	private UserEntity user;

	@Id
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idBook")
	private Book book;

	@Column(name="quantity")
	private Integer quantity;

	public CartDetail() {
		super();
	}
	
	/**
	 * @param user
	 * @param book
	 * @param amount
	 */
	public CartDetail(UserEntity user, Book book, Integer amount) {
		super();
		this.user = user;
		this.book = book;
		this.quantity = amount;
	}

	public UserEntity getUser() {
		return this.user;
	}

	public Book getBook() {
		return this.book;
	}

	public Integer getAmount() {
		return this.quantity;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public void setAmount(Integer amount) {
		this.quantity = amount;
	}

}
package cart.entity;

import java.io.Serializable;

import javax.persistence.*;

import book.entity.BookEntity;
import user.entity.UserEntItf;
import user.entity.UserEntity;

/**
 * Entity implementation class for Entity: CartDetail
 *
 */
@Entity @IdClass(CartDetailId.class)
@Table(name="CartDetail")

public class CartDetailEntity implements Serializable, CartDetailEntItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3660254030963323536L;

	@Id
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="idUser", nullable=false)
	private UserEntity user;

	@Id
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="idBook", nullable=false)
	private BookEntity book;

	@Column(name="quantity", nullable=false)
	private Integer quantity;

	public CartDetailEntity() {
		super();
	}
	
	/**
	 * @param user
	 * @param book
	 * @param quantity
	 */
	public CartDetailEntity(UserEntity user, BookEntity book, Integer quantity) {
		super();
		this.user		= user;
		this.book		= book;
		this.quantity	= quantity;
	}

	@Override
	public UserEntItf getUser() {
		return this.user;
	}

	@Override
	public BookEntity getBook() {
		return this.book;
	}

	@Override
	public Integer getQuantity() {
		return this.quantity;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public void setBook(BookEntity book) {
		this.book = book;
	}

	public void setQuantity(Integer amount) {
		this.quantity = amount;
	}

}
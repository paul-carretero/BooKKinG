package cart.entity;

import java.io.Serializable;

import javax.persistence.*;

import book.entity.BookEntity;
import user.entity.UserEntItf;
import user.entity.UserEntity;

/**
 * Entity implementation class for Entity: CartDetail
 * représente une entrée d'un panier d'un utilisateur
 */
@Entity @IdClass(CartDetailId.class)
@Table(name="CartDetail")

public class CartDetailEntity implements Serializable, CartDetailEntItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3660254030963323536L;

	/**
	 * un utilisateur associé à cette entrée de panier
	 */
	@Id
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="idUser", nullable=false)
	private UserEntity user;

	/**
	 * un livre associé à cette entrée panier
	 */
	@Id
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="idBook", nullable=false)
	private BookEntity book;

	/**
	 * la quantité de livre pour cette entrée panier
	 */
	@Column(name="quantity", nullable=false)
	private int quantity;

	/**
	 * default constructor
	 */
	public CartDetailEntity() {
		super();
	}
	
	/**
	 * @param user
	 * @param book
	 * @param quantity
	 */
	public CartDetailEntity(UserEntity user, BookEntity book, int quantity) {
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
	public int getQuantity() {
		return this.quantity;
	}

	/**
	 * @param amount une nouvelle quantité pour cette entrée panier
	 */
	public void setQuantity(int amount) {
		this.quantity = amount;
	}

}
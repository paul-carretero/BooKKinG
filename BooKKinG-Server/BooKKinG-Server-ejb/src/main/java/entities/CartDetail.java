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
	private User user;

	@Id
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idBook")
	private Book book;

	@Column(name="amount")
	private Integer amount;

	public CartDetail() {
		super();
	}

}
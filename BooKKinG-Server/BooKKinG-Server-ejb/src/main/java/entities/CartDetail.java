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

	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="idUser")
	private Integer idUser;
	
	@Id
	@Column(name="idBook")
	private Integer idBook;
	
	@Column(name="amount")
	private Integer amount;

	public CartDetail() {
		super();
	}
   
}
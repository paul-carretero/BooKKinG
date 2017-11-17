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
   
}

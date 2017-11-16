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
	@Column(name="idCmd")
	private Integer idCmd;
	
	@Id
	@Column(name="idBook")
	private Integer idBook;
	
	@Column(name="amount")
	private Integer amount;
	
	@Column(name="price")
	private Integer price;

	public CmdDetail() {
		super();
	}
   
}

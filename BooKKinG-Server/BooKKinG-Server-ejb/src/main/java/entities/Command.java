package entities;

import java.io.Serializable;
import javax.persistence.*;

/**
 * Entity implementation class for Entity: Commande
 *
 */
@Entity
@Table(name="Command")

public class Command implements Serializable {

	@Id
	@Column(name="idCmd")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer idCmd;
	
	@Column(name="idUser")
	private Integer idUser;
	
	@Column(name="date")
	private java.sql.Date date;
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1461999638388752244L;

	public Command() {
		super();
	}
   
}

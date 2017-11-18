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
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idUser")
	private UserEntity user;
	
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

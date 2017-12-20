package command.entity;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import user.entity.UserEntity;

/**
 * Entity implementation class for Entity: Commande
 *
 */
@Entity
@Table(name="Command")

public class CommandEntity implements CommandEntItf {

	/**
	 * id unique de la commande
	 */
	@Id
	@Column(name="idCmd")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idCmd;
	
	/**
	 * client associé à cette commande
	 */
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="idUser", nullable=false)
	private UserEntity user;
	
	/**
	 * date de la commande
	 */
	@Column(name="date")
	private Date date;
	
	/**
	 * addresse de livraison de la commande
	 */
	@Column(name="address")
	private String address;
	
	/**
	 * cout de livraison
	 */
	@Column(name="livraison")
	private int shipping;
	
	/**
	 * entrées de la commande
	 */
	@OneToMany(mappedBy="command", fetch=FetchType.LAZY, orphanRemoval=true, cascade=CascadeType.ALL)
	private List<CmdDetailEntity> cmdDetails;
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1461999638388752244L;

	/**
	 * default constructor
	 */
	public CommandEntity() {
		super();
		this.cmdDetails = new ArrayList<>();
	}

	/**
	 * @param user le client de la commande
	 * @param address adresse de livraison de la commande
	 * @param shipping cout de livraison de la commande (à la date de la commande)
	 */
	public CommandEntity(final UserEntity user, final String address, final int shipping) {
		super();
		this.cmdDetails = new ArrayList<>();
		this.address	= address;
		this.date 		= new Date(System.currentTimeMillis());
		this.shipping 	= shipping;
		this.user 		= user;
	}
	
	@Override
	public int getIdCmd() {
		return this.idCmd;
	}

	@Override
	public UserEntity getUser() {
		return this.user;
	}

	@Override
	public String getDate() {
		LocalDate localDate = LocalDate.parse(this.date.toString());
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE d MMMM yyyy");
		return formatter.format(localDate);
	}

	@Override
	public List<CmdDetailEntity> getCmdDetails() {
		return this.cmdDetails;
	}
	
	@Override
	public String getAddress() {
		return this.address;
	}
	
	@Override
	public int getShippingCost() {
		return this.shipping;
	}
	
	@Override
	public float getTotal() {
		float res = 0f;
		for(CmdDetailEntity cmdEntry : this.cmdDetails) {
			res += cmdEntry.getPrice() * cmdEntry.getQuantity();
		}
		return res;
	}

	/**
	 * @param cmdDetail une nouvelle entrée pour la commande
	 */
	public void addEntry(CmdDetailEntity cmdDetail) {
		this.cmdDetails.add(cmdDetail);
	}
   
}

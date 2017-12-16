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

	@Id
	@Column(name="idCmd")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer idCmd;
	
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="idUser", nullable=false)
	private UserEntity user;
	
	@Column(name="date")
	private Date date;
	
	@Column(name="address")
	private String address;
	
	@Column(name="livraison")
	private Integer shipping;
	
	@OneToMany(mappedBy="command", fetch=FetchType.LAZY, orphanRemoval=true, cascade=CascadeType.ALL)
	private List<CmdDetailEntity> cmdDetails;
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1461999638388752244L;

	public CommandEntity() {
		super();
		this.cmdDetails = new ArrayList<>();
	}

	public CommandEntity(final String address, final Integer shipping) {
		super();
		this.cmdDetails = new ArrayList<>();
		this.address	= address;
		this.date 		= new Date(System.currentTimeMillis());
		this.shipping 	= shipping;
	}
	
	@Override
	public Integer getIdCmd() {
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
	public Integer getShippingCost() {
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

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public void addEntry(CmdDetailEntity cmdDetail) {
		this.cmdDetails.add(cmdDetail);
	}
   
}

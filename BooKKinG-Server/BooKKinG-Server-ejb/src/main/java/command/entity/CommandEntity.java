package command.entity;

import java.sql.Date;
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
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idUser")
	private UserEntity user;
	
	@Column(name="date")
	private Date date;
	
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
		return this.date.toString();
	}

	@Override
	public List<CmdDetailEntity> getCmdDetails() {
		return this.cmdDetails;
	}

	public void setIdCmd(Integer idCmd) {
		this.idCmd = idCmd;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public void setDate() {
		this.date = new Date(System.currentTimeMillis());
	}

	public void setCmdDetails(List<CmdDetailEntity> cmdDetails) {
		this.cmdDetails = cmdDetails;
	}

	@Override
	public float getTotal() {
		float res = 0f;
		for(CmdDetailEntity cmdEntry : this.cmdDetails) {
			res += cmdEntry.getPrice() * cmdEntry.getQuantity();
		}
		return res;
	}

	public void addEntry(CmdDetailEntity cmdDetail) {
		this.cmdDetails.add(cmdDetail);
	}
   
}

package user.entity;

import java.util.List;

import javax.persistence.*;

import cart.entity.CartDetailEntity;
import command.entity.CommandEntity;
import shared.Helper;

/**
 * Entity implementation class for Entity: User
 */
@Entity @Table(name="user")

public class UserEntity implements UserEntItf {


	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 8048316863241179933L;

	/**
	 * l'id d'un utilisateur
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="idUser")
	private int idUser;
	
	/**
	 * le nom d'un utilisateur
	 */
	@Column(name="name")
	private String name;
	
	/**
	 * addresse du client
	 */
	@Column(name="address")
	private String address;
	
	/**
	 * email du client
	 */
	@Column(name="email")
	private String email;

	/**
	 * mot de passe de l'utilisateur
	 */
	@Column(name="password")
	private String password;
	
	/**
	 * détail du panier de l'utilisateur
	 */
	@OneToMany(mappedBy="user", fetch=FetchType.LAZY, orphanRemoval=true)
	private List<CartDetailEntity> cart;
	
	/**
	 * commandes d'un utilisateur
	 */
	@OneToMany(mappedBy="user", fetch=FetchType.LAZY, orphanRemoval=true)
	private List<CommandEntity> commands;
	
	/**
	 * true si l'utilisateur est un admin
	 */
	@Column(name="admin")
	private boolean admin;
	
	/**
	 * default constructor
	 */
	public UserEntity() {}

	/**
	 * @param name
	 * @param address
	 * @param email
	 * @param password
	 */
	public UserEntity(final String name, final String address, final String email, final String password) {
		super();
		this.name		= name;
		this.address 	= address;
		this.email 		= email;
		this.password 	= Helper.getEncodedPwd(password, this.email);
		this.admin		= false;
	}
	
	@Override
	public int getIdUser() {
		return this.idUser;
	}

	@Override
	public String getName() {
		return this.name;
	}

	@Override
	public String getAddress() {
		return this.address;
	}

	@Override
	public String getEmail() {
		return this.email;
	}
	

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public List<CartDetailEntity> getCart() {
		return this.cart;
	}
	
	@Override
	public List<CommandEntity> getCommands() {
		return this.commands;
	}
	
	@Override
	public boolean isAdmin() {
		return this.admin;
	} 

	@Override
	public void setName(final String name) {
		this.name = name;
	}

	@Override
	public void setAddress(final String address) {
		this.address = address;
	}

	@Override
	public void setPassword(final String password) {
		this.password = Helper.getEncodedPwd(password, this.email);
	}
}

package entities;

import javax.persistence.*;

import localItf.UserEntItf;
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

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="idUser")
	private Integer idUser;
	
	@Column(name="name")
	private String name;
	
	@Column(name="address")
	private String address;
	
	@Column(name="email")
	private String email;

	@Column(name="password")
	private String password;
	
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
	}
	
	@Override
	public Integer getId() {
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

	public void setIdUser(final Integer idUser) {
		this.idUser = idUser;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public void setAddress(final String address) {
		this.address = address;
	}

	public void setEmail(final String email) {
		this.email = email;
	}

	public void setPassword(final String password) {
		this.password = Helper.getEncodedPwd(password, this.email);
	}
   
}

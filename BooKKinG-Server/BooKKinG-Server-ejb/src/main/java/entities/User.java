package entities;

import javax.persistence.*;

import localItf.UserItf;

/**
 * Entity implementation class for Entity: User
 */
@Entity @Table(name="user")

public class User implements UserItf {


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
	public User() {}

	/**
	 * @param name
	 * @param address
	 * @param email
	 * @param password
	 */
	public User(final String name, final String address, final String email, final String password) {
		super();
		this.name = name;
		this.address = address;
		this.email = email;
		this.password = password;
	}
	
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

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}
   
}

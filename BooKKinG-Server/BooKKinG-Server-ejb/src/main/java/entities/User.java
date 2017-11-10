package entities;

import java.io.Serializable;
import javax.persistence.*;

/**
 * Entity implementation class for Entity: User
 */
@Entity @Table(name="users")

public class User implements Serializable {


	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 8048316863241179933L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Integer id;
	
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
	public User(String name, String address, String email, String password) {
		super();
		this.name = name;
		this.address = address;
		this.email = email;
		this.password = password;
	}

	public Integer getId() {
		return this.id;
	}

	public String getName() {
		return this.name;
	}

	public String getAddress() {
		return this.address;
	}

	public String getEmail() {
		return this.email;
	}
   
}

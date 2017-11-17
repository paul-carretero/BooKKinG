package request;

import localItf.UserItf;
import shared.AbstractJson;

public class UserJson extends AbstractJson implements UserItf{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -8982345743408596911L;
	
	private String name;
	
	private String email;
	
	private String password;
	
	private String address;
	
	public UserJson() {
		super();
	}
	
	/**
	 * @param name
	 * @param email
	 * @param address
	 */
	public UserJson(String name, String email, String address) {
		super();
		this.name = name;
		this.email = email;
		this.address = address;
	}

	/**
	 * @param name
	 * @param email
	 * @param password
	 * @param address
	 */
	public UserJson(String name, String email, String password, String address) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.address = address;
	}

	@Override
	public String getName() {
		return this.name;
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
	public String getAddress() {
		return this.address;
	}

}

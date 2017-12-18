package user.response;

import shared.GenericResponseJson;
import user.dataItf.UserJsonResponseItf;

public class UserJsonResponse extends GenericResponseJson implements UserJsonResponseItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -3230317911884211035L;

	private String name;
	
	private String email;
	
	private String address;
	
	@SuppressWarnings("unused")
	private boolean admin;
	
	/**
	 * @param name
	 * @param email
	 * @param address
	 * @param b 
	 */
	public UserJsonResponse(String name, String email, String address, boolean b) {
		super();
		this.name	= name;
		this.email	= email;
		this.address = address;
		this.admin 	= b;
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
	public String getAddress() {
		return this.address;
	}
}

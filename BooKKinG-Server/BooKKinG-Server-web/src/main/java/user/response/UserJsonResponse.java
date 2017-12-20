package user.response;

import shared.GenericResponseJson;
import user.dataItf.UserJsonResponseItf;

/**
 * représente les données d'un utilisateur retourné par le serveur
 */
@SuppressWarnings("unused")
public class UserJsonResponse extends GenericResponseJson implements UserJsonResponseItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -3230317911884211035L;

	/**
	 * le nom de l'utilisateur
	 */
	private String name;
	
	/**
	 * l'email de l'utilisateur
	 */
	private String email;
	
	/**
	 * addresse de l'utilisateur
	 */
	private String address;
	
	/**
	 * vrai si l'utilisateur est administrateur, faux sinon
	 */
	private boolean admin;
	
	/**
	 * constructeur par défault
	 * @param name nom de l'utilisateur
	 * @param email email de l'utilisateur
	 * @param address addresse de l'utilisateur
	 * @param admin vrai si l'utilisateur est administrateur, faux sinon
	 */
	public UserJsonResponse(String name, String email, String address, boolean admin) {
		super();
		this.name	 = name;
		this.email	 = email;
		this.address = address;
		this.admin 	 = admin;
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

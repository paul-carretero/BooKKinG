package user.request;

import shared.AbstractJson;
import shared.HttpHelper;
import shared.Validifyable;
import user.dataItf.UserJsonItf;

/**
 * représente les données utilisateur fourni par les client pour les création ou mise à jour
 */
public class UserJson extends AbstractJson implements UserJsonItf, Validifyable{
	
	/**
	 * taille minimum des mots de passe
	 */
	private static final int MIN_PWD_LENGTH = 6;

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -8982345743408596911L;
	
	/**
	 * nom de l'utilisateur
	 */
	private String name;
	
	/**
	 * email de l'utilsateur
	 */
	private String email;
	
	/**
	 * mot de passe de l'utilisateur en clair
	 */
	private String password;
	
	/**
	 * addresse de l'utilisateur
	 */
	private String address;
	
	/**
	 * default constructor
	 */
	public UserJson() {
		super();
	}
	
	/**
	 * @param name
	 * @param email
	 * @param password
	 * @param address
	 */
	public UserJson(final String name, final String email, final String password, final String address) {
		super();
		this.name		= name;
		this.email		= email;
		this.password 	= password;
		this.address 	= address;
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

	@Override
	public void validify() {
		if(this.name == null) {
			this.name = "";
		}
		if(this.email == null) {
			this.email = "";
		}
		if(this.password == null) {
			this.password = "";
		}
		if(this.address == null) {
			this.address = "";
		}
	}

	/**
	 * @return vrai si l'email renseigné est valide, faux sinon
	 */
	public boolean checkEmail() {
		return HttpHelper.isEmailValid(this.email);
	}
	
	/**
	 * @return vrai si les données fourni sont valide pour une création, faux sinon
	 */
	public boolean checkContent() {
		return (this.name.length() > 0) 
				&& (this.address.length() > 0) 
				&& (this.password.length() >= MIN_PWD_LENGTH) 
				&& (HttpHelper.isEmailValid(this.email));
	}
	
	/**
	 * @return vrai si le mot de passe existe et respecte les critères
	 */
	public boolean checkContentForUpdate() {
		return this.password.length() == 0 || this.password.length() >= MIN_PWD_LENGTH;
	}
}

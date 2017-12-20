package user.dataItf;

/**
 * interface représentant un utilisateur
 */
public interface UserJsonItf {

	/**
	 * @return le nom de l'utilisateur
	 */
	public String getName();

	/**
	 * @return l'email de l'utilisateur
	 */
	public String getEmail();

	/**
	 * @return le mot de passe de l'utilisateur
	 */
	public String getPassword();

	/**
	 * @return l'adresse de l'utilisateur
	 */
	public String getAddress();

}
package user.dataItf;

import shared.GenericResponseJsonItf;

/**
 * une réponse contenant des informations utilisateur, sauf son mot de passe (hashé)
 */
public interface UserJsonResponseItf extends GenericResponseJsonItf {

	/**
	 * @return le nom de l'utilisateur
	 */
	public String getName();

	/**
	 * @return l'email de l'utilisateur
	 */
	public String getEmail();

	/**
	 * @return l'adresse de l'utilisateur
	 */
	public String getAddress();

}
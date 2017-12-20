package user.bean;

import javax.ejb.Local;

import user.dataItf.UserJsonItf;
import user.entity.UserEntItf;
import user.entity.UserEntity;

/**
 * interface local du bean de gestion des utilisateurs
 */
@Local
public interface UserBeanLocal {
	
	/**
	 * @param user données représentant les informations d'un nouvel utilisateur
	 * @return true si l'utilisateur à pu être créer, faux sinon
	 */
	public boolean createUser(UserJsonItf user);
	
	/**
	 * @param user données représentant les informations de connexion d'un utilisateur
	 * @return true si le couple email/password existe, faux sinon
	 */
	public boolean tryLogin(UserJsonItf user);
	
	/**
	 * @param idUser l'id d'un utilisateur
	 * @return l'entité associé à cet utilisateur
	 */
	public UserEntity getUser(int idUser);
	
	/**
	 * @param email un email d'utilisateur
	 * @return une interface associé à une entité associé à l'utilisateur associé à cet email
	 */
	public UserEntItf getUser(String email);
	
	/**
	 * @param idUser id d'un utilisateur à mettre à jour
	 * @param data met à jour les données non vide de cette représentation des données utilisateur
	 */
	public void updateUser(int idUser, UserJsonItf data);

	/**
	 * @param email un email d'un utilisateur
	 * @return true si l'on a pu envoyer à l'utilisateur un noouveau mot de passe
	 */
	public boolean resetPassword(String email);

	/**
	 * @param idUser l'id d'un utilsiateur
	 * @return true si l'utilisateur ayant l'id spécifié est administrateur
	 */
	public boolean isAdmin(int idUser);
}

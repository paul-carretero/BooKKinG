package user.entity;

import java.io.Serializable;
import java.util.List;

import cart.entity.CartDetailEntity;
import command.entity.CommandEntity;

/**
 * Interface d'une entité utilisateur
 */
public interface UserEntItf extends Serializable{

	/**
	 * @return le nom de l'utilisateur
	 */
	public String getName();

	/**
	 * @return l'email de l'utilisateur
	 */
	public String getEmail();

	/**
	 * @return le mot de passe hashé de l'utilisateur
	 */
	public String getPassword();

	/**
	 * @return l'adresse de l'utilisateur
	 */
	public String getAddress();

	/**
	 * @return l'id de l'utilisateur
	 */
	public int getIdUser();

	/**
	 * @return la liste des commandes de l'utilisateur
	 */
	public List<CommandEntity> getCommands();

	/**
	 * @return le détail du panier d'un utilisateur
	 */
	public List<CartDetailEntity> getCart();

	/**
	 * @return true si l'utilisateur est admin, faux sinon
	 */
	public boolean isAdmin();
	
	/**
	 * met à jour le mot de passe d'un utilisateur
	 * @param newPwd un nouveau mot de passe
	 */
	public void setPassword(String newPwd);

	/**
	 * met à jour l'adresse d'un utilisateur
	 * @param address l'adresse d'un utilisateur
	 */
	public void setAddress(String address);

	/**
	 * met à jour le nom de l'utilisateur
	 * @param name un nouveau nom
	 */
	public void setName(String name);
}
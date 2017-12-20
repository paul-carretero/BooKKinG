package command.entity;

import java.io.Serializable;
import java.util.List;

import user.entity.UserEntity;

/**
 * interface public pour une entité associé à une commande
 */
public interface CommandEntItf extends Serializable {

	/**
	 * @return l'id d'une commande
	 */
	public int getIdCmd();

	/**
	 * @return le client cette commande
	 */
	public UserEntity getUser();

	/**
	 * @return la date de la commande en format texte
	 */
	public String getDate();

	/**
	 * @return la liste des entrées de la commande
	 */
	public List<CmdDetailEntity> getCmdDetails();

	/**
	 * @return le prix total de la commande
	 */
	public float getTotal();

	/**
	 * @return l'adresse de livraison de la commande
	 */
	public String getAddress();

	/**
	 * @return le cout de livraison de la commande
	 */
	public int getShippingCost();

}
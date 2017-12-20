package command.bean;

import javax.ejb.Local;

import command.dataItf.CmdGetJsonItf;
import command.dataItf.CommandJsonItf;
import command.dataItf.CommandListJsonItf;
import command.dataItf.CommandReqJsonItf;

/**
 * interface locale du bean de gestion des commandes
 */
@Local
public interface CommandBeanLocal {
	
	/**
	 * valide la commande d'un utilsateur avec le panier courrant
	 * @param idUser id d'un utilisateur
	 * @param data informations pour la commande (adresse)
	 * @param response réponse de confirmation de commande
	 */
	public void proceedCartCheckout(int idUser, CommandReqJsonItf data, CommandJsonItf response);
	
	/**
	 * @param idCmd id d'une commande
	 * @param response représente la commande
	 */
	public void getCommand(int idCmd, CommandJsonItf response);

	/**
	 * retourne les commandes d'un utilisateur
	 * @param idUser id d'un utilisateur
	 * @param response contient une liste des commandes de l'utilisateur
	 */
	public void getCommands(int idUser, CommandListJsonItf response);

	/**
	 * @param idUser id d'un utilisateur
	 * @param idCmd id d'une commande
	 * @return true si l'id de la commande est associé à cet utilisateur, faux sinon
	 */
	public boolean isCmdOfUser(int idUser, int idCmd);

	/**
	 * admin only
	 * @param data plage dans laquelle rechercher des commandes
	 * @param response contient la liste des commandes dans cette palge
	 */
	public void getCommands(CmdGetJsonItf data, CommandListJsonItf response);
}

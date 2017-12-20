package command.dataItf;

import shared.GenericResponseJsonItf;

/**
 * représente une liste de commande
 */
public interface CommandListJsonItf extends GenericResponseJsonItf {

	/**
	 * ajoute une commande à la liste et retourne une interface permettant de la modifier
	 * @return une interface permettant de définire la commande ajouté à la liste
	 */
	public CommandJsonItf prepareNewEntry();

}
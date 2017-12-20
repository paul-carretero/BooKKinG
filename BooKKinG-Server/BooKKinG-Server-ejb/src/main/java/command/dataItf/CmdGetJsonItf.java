package command.dataItf;

import java.sql.Timestamp;

/**
 * représente une plage de recherche pour les commande de tous les utilisateurs
 */
public interface CmdGetJsonItf {

	/**
	 * @return date de début de la recherche
	 */
	public Timestamp getStart();

	/**
	 * @return date de fin de la recherche
	 */
	public Timestamp getEnd();

}
package init;

import javax.ejb.Local;

/**
 * interface local du bean d'initialisation, fourni des constantes
 */
@Local
public interface InitBeanLocal {

	/**
	 * @param response initialise un livre aléatoire dans response
	 */
	public void getRandom(InitResponseJsonItf response);

	/**
	 * @param response initialise un livre le plus récent dans response
	 */
	public void getNewest(InitResponseJsonItf response);

	/**
	 * @param response initialise le livre le plus acheté dans response
	 */
	public void getMostBuy(InitResponseJsonItf response);

	/**
	 * @param response initialise la range des prix des livres dans response
	 */
	public void getRange(InitResponseJsonItf response);

	/**
	 * @param res initialise les adresse static des magasins bookking
	 */
	public void getStatiAddress(InitResponseJsonItf res);

}

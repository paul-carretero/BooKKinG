package shared;

/**
 * interface d'une réponse serveur générique
 */
public interface GenericResponseJsonItf {

	/**
	 * défini le succès de la requête
	 * @param success vrai si la requête à réussi, faus sinon
	 */
	public void setSuccess(boolean success);

	/**
	 * @param message un message optionel décrivant le succès
	 */
	public void setMessage(String message);

}
package book.dataItf;

import shared.GenericResponseJsonItf;

/**
 * représente une réponse contenant une liste de livre
 */
public interface BookListJsonItf extends GenericResponseJsonItf {

	/**
	 * prépare l'ajout d'une nouvelle entrée dans la liste de livre
	 * @return une interface permettant d'initialiser les valeur de ce nouveau livre
	 */
	public BookJsonItf prepareNewEntry();

	/**
	 * @param n le nombre de page total disponible pour la recherche
	 */
	public void setTotalPageAvailable(int n);
	
	/**
	 * @param n le nombre total de résultats disponible pour la recherche
	 */
	public void setTotalAvailable(int n);

}
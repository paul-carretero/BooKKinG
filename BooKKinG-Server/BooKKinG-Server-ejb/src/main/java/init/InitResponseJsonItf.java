package init;

import book.dataItf.BookJsonItf;

/**
 * réponse permettant au front d'initialiser des constantes
 */
public interface InitResponseJsonItf {
	
	/**
	 * défini la fourchette des prix des livres de l'application
	 * @param minPrice le prix du livre le moins cher
	 * @param maxPrice le prix du livre le plus cher
	 */
	public void setRange(int minPrice, int maxPrice);
	
	/**
	 * @return un objet permettant de représenter les données d'un livre aléatorie
	 */
	public BookJsonItf prepareNewBookRandom();

	/**
	 * @return un objet permettant de représenter les donnée du livre le plus récent
	 */
	public BookJsonItf prepareNewBookNewest();

	/**
	 * @return un objet permettant de représenter les données du livre le plus acheté
	 */
	public BookJsonItf prepareNewBookMostBuy();

	/**
	 * @param paris l'adresse de bookking paris
	 */
	public void setParis(String paris);

	/**
	 * @param bordeaux l'adresse de bookking bordeaux
	 */
	public void setBordeaux(String bordeaux);

	/**
	 * @param grenoble l'adresse de bookking grenoble
	 */
	public void setGrenoble(String grenoble);
}

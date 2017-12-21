package book.bean;

import javax.ejb.Local;

import book.dataItf.BookListJsonItf;
import book.dataItf.BookSearchItf;

/**
 * Bean proposant des opération en lecture seule sur les entités livre
 */
@Local
public interface BookBeanROLocal {

	/**
	 * effectue une recherche sur l'ensemble des entités livre
	 * @param searchData données de la recherche
	 * @param response contient une liste de livre, sera rempli par le bean en fonction des résultats
	 */
	public void getBooks(BookSearchItf searchData,BookListJsonItf response);

}

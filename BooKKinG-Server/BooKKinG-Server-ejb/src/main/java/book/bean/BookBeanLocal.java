package book.bean;

import javax.ejb.Local;

import book.dataItf.BookListJsonItf;
import book.dataItf.BookCreateDataItf;
import book.dataItf.BookSearchItf;
import book.entity.BookEntity;

/**
 * interface public du bean BookBean permettant des opérations sur les livres
 */
@Local
public interface BookBeanLocal {

	/**
	 * permet d'accéder à un livre
	 * @param idBook l'id d'un livre
	 * @return l'entité associé à ce livre
	 */
	public BookEntity getBook(int idBook);

	/**
	 * effectue une recherche sur l'ensemble des entités livre
	 * @param searchData données de la recherche
	 * @param response contient une liste de livre, sera rempli par le bean en fonction des résultats
	 */
	public void getBooks(BookSearchItf searchData,BookListJsonItf response);

	/**
	 * créé un livre dans la base de donnée de manière asynchrone et persistante
	 * @param data données représentant un book
	 */
	public void addBooks(BookCreateDataItf data);

	/**
	 * permet de récupérer tout les livres
	 * @param res la liste de tous les livre qui sera rempli par le bean en fonction des résultats
	 */
	public void getAllBooks(BookListJsonItf res);

}

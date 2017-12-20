package book.response;

import java.util.ArrayList;
import java.util.List;

import book.dataItf.BookJsonItf;
import book.dataItf.BookListJsonItf;
import shared.GenericResponseJson;

/**
 * représente une liste de livre associé à une recherche client
 */
@SuppressWarnings("unused")
public class BookListJson extends GenericResponseJson implements BookListJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3258017333213392628L;
	
	/**
	 * la liste des livres demandée
	 */
	private List<BookJson> books;
	
	/**
	 * le nombre de page disponible pour la recherche actuelle basé sur la constante du nombre de page
	 */
	private int pagesAvailable;
	
	/**
	 * nombre de livre correspondant à la recherche sans les contraintes de page
	 */
	private int resultsAvailable;

	/**
	 * default constructor
	 */
	public BookListJson() {
		super();
		this.books = new ArrayList<>();
		this.pagesAvailable = 1;
	}

	@Override
	public BookJsonItf prepareNewEntry(){
		BookJson res = new BookJson();
		this.books.add(res);
		return res;
	}
	
	@Override
	public void setTotalAvailable(final int n) {
		this.resultsAvailable = n;
	}
	
	@Override
	public void setTotalPageAvailable(final int n) {
		this.pagesAvailable = n;
	}
}

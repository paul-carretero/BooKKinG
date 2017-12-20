package cart.response;

import book.response.BookJson;

/**
 * représente un article du panier d'un utilisateur
 */
public class Article {
	
	/**
	 * représentation du livre de cette entrée du panier
	 */
	private final BookJson book;
	
	/**
	 * quantité de ce livre dans le panier
	 */
	private final int quantity;
	
	/**
	 * id du livre du panier
	 */
	private final int idBook;

	/**
	 * @param book livre du panier
	 * @param quantity quantité de celivre
	 * @param idBook id de ce livre
	 */
	public Article(BookJson book, int quantity, int idBook) {
		super();
		this.book = book;
		this.quantity = quantity;
		this.idBook = idBook;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((this.book == null) ? 0 : this.book.hashCode());
		result = prime * result + this.idBook;
		result = prime * result + this.quantity;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Article))
			return false;
		Article other = (Article) obj;
		if (this.book == null) {
			if (other.book != null)
				return false;
		} else if (!this.book.equals(other.book))
			return false;
		if (this.idBook != other.idBook)
			return false;
		if (this.quantity != other.quantity)
			return false;
		return true;
	}

	
}

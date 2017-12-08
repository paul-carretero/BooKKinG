package cart.response;

import book.response.BookJson;

public class Article {
	
	@SuppressWarnings("unused")
	private final BookJson book;
	
	@SuppressWarnings("unused")
	private final Integer quantity;
	
	private final Integer idBook;

	/**
	 * @param book
	 * @param quantity
	 * @param idBook
	 */
	public Article(BookJson book, Integer quantity, Integer idBook) {
		super();
		this.book = book;
		this.quantity = quantity;
		this.idBook = idBook;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((this.idBook == null) ? 0 : this.idBook.hashCode());
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
		if (this.idBook == null) {
			if (other.idBook != null)
				return false;
		} else if (!this.idBook.equals(other.idBook))
			return false;
		return true;
	}
}

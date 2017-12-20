package cart.entity;

import java.io.Serializable;

/**
 * class permetant l'utilisateur d'une clé primaire composé pour l'entité cartdetail
 */
public class CartDetailId implements Serializable{
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -6908277166100646567L;

	/**
	 * id utilisateur
	 */
	public int user;
	
	/**
	 * id livre
	 */
	public int book;
	
	/**
	 * @param user
	 * @param book
	 */
	public CartDetailId(int user, int book) {
		super();
		this.user = user;
		this.book = book;
	}
	
	/**
	 * default constructor
	 */
	public CartDetailId() {
		super();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + this.book;
		result = prime * result + this.user;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof CartDetailId))
			return false;
		CartDetailId other = (CartDetailId) obj;
		if (this.book != other.book)
			return false;
		if (this.user != other.user)
			return false;
		return true;
	}

}

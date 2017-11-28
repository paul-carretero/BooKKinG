package cart.entity;

import java.io.Serializable;

public class CartDetailId implements Serializable{
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -6908277166100646567L;
	public Integer user;
	public Integer book;
	
	/**
	 * @param user
	 * @param book
	 */
	public CartDetailId(Integer user, Integer book) {
		super();
		this.user = user;
		this.book = book;
	}
	
	public CartDetailId() {
		super();
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((this.book == null) ? 0 : this.book.hashCode());
		result = prime * result + ((this.user == null) ? 0 : this.user.hashCode());
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
		if (this.book == null) {
			if (other.book != null)
				return false;
		} else if (!this.book.equals(other.book))
			return false;
		if (this.user == null) {
			if (other.user != null)
				return false;
		} else if (!this.user.equals(other.user))
			return false;
		return true;
	}
}

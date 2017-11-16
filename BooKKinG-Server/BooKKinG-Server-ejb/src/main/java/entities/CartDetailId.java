package entities;

import java.io.Serializable;

public class CartDetailId implements Serializable{
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -6908277166100646567L;
	public Integer idUser;
	public Integer idBook;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((this.idBook == null) ? 0 : this.idBook.hashCode());
		result = prime * result + ((this.idUser == null) ? 0 : this.idUser.hashCode());
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
		if (this.idBook == null) {
			if (other.idBook != null)
				return false;
		} else if (!this.idBook.equals(other.idBook))
			return false;
		if (this.idUser == null) {
			if (other.idUser != null)
				return false;
		} else if (!this.idUser.equals(other.idUser))
			return false;
		return true;
	}
}

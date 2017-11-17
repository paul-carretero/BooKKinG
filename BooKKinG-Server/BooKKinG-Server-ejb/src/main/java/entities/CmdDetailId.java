package entities;

import java.io.Serializable;

public class CmdDetailId  implements Serializable{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3156866025388250150L;
	public Integer command;
	public Integer book;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((this.book == null) ? 0 : this.book.hashCode());
		result = prime * result + ((this.command == null) ? 0 : this.command.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof CmdDetailId))
			return false;
		CmdDetailId other = (CmdDetailId) obj;
		if (this.book == null) {
			if (other.book != null)
				return false;
		} else if (!this.book.equals(other.book))
			return false;
		if (this.command == null) {
			if (other.command != null)
				return false;
		} else if (!this.command.equals(other.command))
			return false;
		return true;
	}

}

package command.entity;

import java.io.Serializable;

public class CmdDetailId  implements Serializable{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3156866025388250150L;
	public int command;
	public int book;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + this.book;
		result = prime * result + this.command;
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
		if (this.book != other.book)
			return false;
		if (this.command != other.command)
			return false;
		return true;
	}
}

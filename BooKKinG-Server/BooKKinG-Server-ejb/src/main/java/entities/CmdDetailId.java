package entities;

import java.io.Serializable;

public class CmdDetailId  implements Serializable{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3156866025388250150L;
	public Integer idCmd;
	public Integer idBook;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idBook == null) ? 0 : idBook.hashCode());
		result = prime * result + ((idCmd == null) ? 0 : idCmd.hashCode());
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
		if (idBook == null) {
			if (other.idBook != null)
				return false;
		} else if (!idBook.equals(other.idBook))
			return false;
		if (idCmd == null) {
			if (other.idCmd != null)
				return false;
		} else if (!idCmd.equals(other.idCmd))
			return false;
		return true;
	}
}

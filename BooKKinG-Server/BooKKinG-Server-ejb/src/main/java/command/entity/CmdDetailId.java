package command.entity;

import java.io.Serializable;

/**
 * classe permettant l'utilisation de clé primaire composé pour les détails des commandes
 */
public class CmdDetailId  implements Serializable{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3156866025388250150L;
	
	/**
	 * id de la commande
	 */
	public int command;
	
	/**
	 * id du livre
	 */
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

package shared;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * base pour la creation des beans
 */
public abstract class AbstractBean {
	
	/**
	 * entitymanager gère les entités
	 */
	@PersistenceContext(unitName="master")
	protected EntityManager manager;

}

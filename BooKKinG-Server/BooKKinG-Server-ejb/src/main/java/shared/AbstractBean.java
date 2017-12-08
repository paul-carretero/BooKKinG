package shared;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class AbstractBean {
	
	@PersistenceContext(unitName="master")
	protected EntityManager manager;

}

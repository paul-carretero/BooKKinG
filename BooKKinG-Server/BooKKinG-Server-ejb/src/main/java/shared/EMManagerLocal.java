package shared;

import javax.ejb.Local;
import javax.persistence.EntityManager;

@Local
public interface EMManagerLocal {
	
	public EntityManager getWriteEM();
	
	public EntityManager getReadEM();

	public void subscribe(AbstractBean aBean);

	public void unSubscribe(AbstractBean aBean);
}

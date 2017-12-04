package shared;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.EJB;
import javax.persistence.EntityManager;

public abstract class AbstractBean {
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/EMManager!shared.EMManagerLocal")
	EMManagerLocal emManager;
	
	protected EntityManager writeEM;
	
	protected EntityManager readEM;

	@PostConstruct
	public void resetEM() {
		System.out.println("resetEM");
		this.writeEM = this.emManager.getWriteEM();
		this.readEM = this.emManager.getReadEM();
		this.emManager.subscribe(this);
	}
	
	@PreDestroy
	protected void onDelete() {
		this.emManager.unSubscribe(this);
	}

}

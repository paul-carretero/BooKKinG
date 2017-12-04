package shared;

import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import javax.annotation.PostConstruct;
import javax.ejb.LocalBean;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

/**
 * Session Bean implementation class EMManager
 */
@Singleton
@LocalBean
@Startup
@TransactionManagement(TransactionManagementType.BEAN)
public class EMManager implements EMManagerLocal {

	@PersistenceUnit(unitName = "master")
	private EntityManagerFactory masterFactory;

	@PersistenceUnit(unitName = "slave")
	private EntityManagerFactory slaveFactory;

	private final Queue<EntityManagerFactory> slaveFactories;

	private final Queue<EntityManagerFactory> physicalSlaveFactories;
	
	private final Set<AbstractBean> subscribers;

	private final ReadWriteLock lock;

	/**
	 * Default constructor. 
	 */
	public EMManager() {
		this.subscribers			= new HashSet<>();
		this.slaveFactories			= new LinkedList<>();
		this.physicalSlaveFactories = new LinkedList<>();
		this.lock 					= new ReentrantReadWriteLock();
	}

	@Override
	synchronized public void subscribe(AbstractBean aBean) {
		this.subscribers.add(aBean);
	}
	
	@Override
	synchronized public void unSubscribe(AbstractBean aBean) {
		this.subscribers.remove(aBean);
	}
	
	synchronized private void publish() {
		for(AbstractBean aBean : this.subscribers) {
			aBean.resetEM();
		}
	}

	/**
	 * ajouter les factory dans l'ordre slave1 puis slave2 ...
	 */
	@PostConstruct
	public void init() {
		this.slaveFactories.add(this.slaveFactory);
		this.physicalSlaveFactories.add(this.slaveFactory);
	}

	@Schedule(hour = "*", minute = "*", second = "*/10", persistent = false)
	private void heartBeat() {
		this.lock.writeLock().lock();
		boolean publish = false;
		try {
			try {
				this.masterFactory.createEntityManager().createNativeQuery("SELECT 1").getSingleResult();
			} catch (Exception e) {
				System.err.println(e.getMessage());
				System.err.println("remove master");
				this.masterFactory = this.slaveFactories.poll();
				publish = true;
			}

			Iterator<EntityManagerFactory> iter = this.slaveFactories.iterator();
			while (iter.hasNext()) {
				EntityManagerFactory current = iter.next();
				try {
					current.createEntityManager().createNativeQuery("SELECT 1").getSingleResult();
				} catch (Exception e) {
					System.err.println(e.getMessage());
					System.err.println("remove slave");
					iter.remove();
					publish = true;
				}
			}
		} finally {
			this.lock.writeLock().unlock();
		}
		if(publish) { publish(); }
	}

	/**
	 * @return round robin around slave (or master if no slave)
	 */
	private EntityManagerFactory getSlaveFactory() {
		if(this.slaveFactories.isEmpty()) {
			return this.masterFactory;
		}
		EntityManagerFactory res = this.slaveFactories.poll();
		this.slaveFactories.add(res);
		return res;
	}

	@Override
	public EntityManager getReadEM() {
		this.lock.readLock().lock();
		try {
			return getSlaveFactory().createEntityManager();
		} finally {
			this.lock.readLock().unlock();
		}
	}

	@Override
	public EntityManager getWriteEM() {
		this.lock.readLock().lock();
		try {
			return this.masterFactory.createEntityManager();
		} finally {
			this.lock.readLock().unlock();
		}
	}
}

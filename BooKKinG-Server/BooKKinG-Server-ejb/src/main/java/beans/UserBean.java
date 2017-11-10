package beans;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.User;

/**
 * Session Bean implementation class UserBean
 */
@Stateless
@LocalBean
public class UserBean implements UserBeanLocal {

	@PersistenceContext()
    private EntityManager manager;
	
    /**
     * Default constructor. 
     */
    public UserBean() {}
    
	public User getUser(String mail) 
	{
		List<User> users = this.manager.createQuery(
			    " FROM User u WHERE u.mail=:mail") //$NON-NLS-1$
			    .setParameter("mail", mail) //$NON-NLS-1$
			    .setMaxResults(1)
			    .getResultList();
		return users.get(0);
	}

}

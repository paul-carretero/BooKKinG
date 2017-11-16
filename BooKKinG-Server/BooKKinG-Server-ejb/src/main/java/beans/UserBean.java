package beans;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.User;
import localItf.UserItf;
import shared.Helper;

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

	@Override
	public User getUser(final String email){
		List<User> users = this.manager.createQuery(
				" FROM User u WHERE u.email=:email")
				.setParameter("email", email)
				.setMaxResults(1)
				.getResultList();
		if(users.isEmpty()) {
			return null;
		}
		return users.get(0);
	}
	
	@Override
	public UserItf getUser(final int id){
		List<User> users = this.manager.createQuery(
				" FROM User u WHERE u.idUser=:idUser")
				.setParameter("idUser", id)
				.setMaxResults(1)
				.getResultList();
		if(users.isEmpty()) {
			return null;
		}
		return users.get(0);
	}

	@Override
	public boolean tryLogin(final UserItf user) {
		User userToCheck = getUser(user.getEmail());
		if(userToCheck != null) {
			String hashedPwd = Helper.getEncodedPwd(user.getPassword(), user.getEmail());
			return userToCheck.getPassword().equals(hashedPwd);
		}
		return false;
	}
	
	@Override
	public void createUser(final UserItf user) {
		User newUser = new User(
				user.getName(),
				user.getAddress(),
				user.getEmail(),
				Helper.getEncodedPwd(user.getPassword(), user.getEmail())
		);
		this.manager.persist(newUser);
	}

}

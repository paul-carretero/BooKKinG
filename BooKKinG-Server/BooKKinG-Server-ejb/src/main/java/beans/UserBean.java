package beans;

import javax.ejb.Asynchronous;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import JsonItf.UserJsonItf;
import entities.UserEntity;
import localItf.UserEntItf;
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
	public UserEntItf getUser(final String email){
		UserEntity user = (UserEntity) this.manager.createQuery(
				" FROM User u WHERE u.email=:email")
				.setParameter("email", email)
				.getSingleResult();
		return user;
	}

	@Override
	public UserEntity getUser(final int idUser){
		UserEntity user = (UserEntity) this.manager.createQuery(
				" FROM User u WHERE u.idUser=:idUser")
				.setParameter("idUser", idUser)
				.getSingleResult();
		return user;
	}

	@Override
	public boolean tryLogin(final UserJsonItf data) {
		UserEntItf userToCheck = getUser(data.getEmail());
		if(userToCheck != null) {
			String hashedPwd = Helper.getEncodedPwd(data.getPassword(), data.getEmail());
			return userToCheck.getPassword().equals(hashedPwd);
		}
		return false;
	}

	@Override
	public boolean createUser(final UserJsonItf user) {
		if(getUser(user.getEmail()) != null) {
			return false;
		}
		UserEntity newUser = new UserEntity(
				user.getName(),
				user.getAddress(),
				user.getEmail(),
				user.getPassword()
				);
		this.manager.persist(newUser);
		return true;
	}

	@Override
	@Asynchronous
	public void updateUser(final Integer idUser, final UserJsonItf data) {
		UserEntity u = getUser(idUser);
		u.setAddress(data.getAddress());
		u.setName(data.getName());
		u.setPassword(data.getPassword());
		this.manager.persist(u);
	}
}

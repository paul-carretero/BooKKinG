package user.bean;

import java.security.SecureRandom;
import java.util.List;

import javax.ejb.Asynchronous;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import mailer.MailerBeanLocal;
import shared.Helper;
import user.dataItf.UserJsonItf;
import user.entity.UserEntItf;
import user.entity.UserEntity;

/**
 * Session Bean implementation class UserBean
 */
@Stateless
@LocalBean
public class UserBean implements UserBeanLocal {

	@PersistenceContext()
	private EntityManager manager;

	@EJB(lookup="java:app/BooKKinG-Server-ejb/MailerBean!mailer.MailerBeanLocal")
	private MailerBeanLocal mailer;
	
	private static final SecureRandom random = new SecureRandom();

	/**
	 * Default constructor. 
	 */
	public UserBean() {}

	@Override
	public UserEntItf getUser(final String email){
		List<UserEntity> users = this.manager.createQuery(
				" FROM UserEntity u WHERE u.email=:email")
				.setParameter("email", email)
				.setMaxResults(1)
				.getResultList();
		if(users.isEmpty()) {
			return null;
		}
		return users.get(0);
	}

	@Override
	public UserEntity getUser(final int idUser){
		return this.manager.find(UserEntity.class, idUser);
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
		this.mailer.sendWelcomeEmail(newUser);
		return true;
	}

	@Override
	@Asynchronous
	public void updateUser(final Integer idUser, final UserJsonItf data) {
		UserEntity u = getUser(idUser);
		u.setAddress(data.getAddress());
		u.setName(data.getName());
		u.setPassword(data.getPassword());
	}

	private static String randomPassword() {
		final int pwdSize = 8;
		char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
		StringBuilder pwd = new StringBuilder();
		for (int i = 0; i < pwdSize; i++) {
			char c = chars[random.nextInt(chars.length)];
			pwd.append(c);
		}
		return pwd.toString();
	}

	@Override
	public boolean resetPassword(final String email) {
		UserEntItf u = getUser(email);
		if(u != null) {
			String newPwd = randomPassword();
			u.setPassword(newPwd);
			this.mailer.sendResetPassword(u,newPwd);
			return true;
		}
		return false;
	}

	@Override
	public boolean isAdmin(Integer idUser) {
		return getUser(idUser).isAdmin();
	}
}

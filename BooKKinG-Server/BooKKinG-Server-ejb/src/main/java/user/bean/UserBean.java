package user.bean;

import java.security.SecureRandom;
import java.util.List;

import javax.ejb.Asynchronous;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;

import mailer.MailerBeanLocal;
import shared.AbstractBean;
import shared.Helper;
import user.dataItf.UserJsonItf;
import user.entity.UserEntROItf;
import user.entity.UserEntRWItf;
import user.entity.UserEntity;

/**
 * Session Bean implementation class UserBean
 */
@Stateless
@LocalBean
public class UserBean extends AbstractBean implements UserBeanLocal {

	@EJB(lookup="java:app/BooKKinG-Server-ejb/MailerBean!mailer.MailerBeanLocal")
	private MailerBeanLocal mailer;
	
	private static final SecureRandom random = new SecureRandom();

	/**
	 * Default constructor. 
	 */
	public UserBean() {}

	@Override
	public UserEntROItf getUser(final String email){
		List<UserEntity> users = this.readEM.createQuery(
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
	public UserEntROItf getUser(final int idUser){
		return this.readEM.find(UserEntity.class, idUser);
	}
	
	@Override
	public UserEntRWItf getUserForUpdate(final String email){
		List<UserEntity> users = this.writeEM.createQuery(
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
	public UserEntity getUserForUpdate(final int idUser){
		return this.writeEM.find(UserEntity.class, idUser);
	}

	@Override
	public boolean tryLogin(final UserJsonItf data) {
		UserEntROItf userToCheck = getUser(data.getEmail());
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
		this.writeEM.persist(newUser);
		this.mailer.sendWelcomeEmail(newUser);
		return true;
	}

	@Override
	@Asynchronous
	public void updateUser(final Integer idUser, final UserJsonItf data) {
		UserEntRWItf u = getUserForUpdate(idUser);
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
		UserEntRWItf u = getUserForUpdate(email);
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

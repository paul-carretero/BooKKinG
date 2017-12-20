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
import user.entity.UserEntItf;
import user.entity.UserEntity;

/**
 * Session Bean implementation class UserBean
 */
@Stateless
@LocalBean
public class UserBean extends AbstractBean implements UserBeanLocal {

	/**
	 * un bean pour l'envoi de mail
	 */
	@EJB(lookup="java:app/BooKKinG-Server-ejb/MailerBean!mailer.MailerBeanLocal")
	private MailerBeanLocal mailer;
	
	/**
	 * un générateur aléatoire pour des mot de passe sécurisé
	 */
	private static final SecureRandom random = new SecureRandom();

	/**
	 * Default constructor. 
	 */
	public UserBean() {}

	@Override
	public UserEntItf getUser(final String email){
		final List<UserEntity> users = this.manager.createQuery(
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
		final UserEntItf userToCheck = getUser(data.getEmail());
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
		final UserEntity newUser = new UserEntity(
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
	public void updateUser(final int idUser, final UserJsonItf data) {
		final UserEntItf u = getUser(idUser);
		if(data.getAddress().length() > 0) {
			u.setAddress(data.getAddress());
		}
		if(data.getName().length() > 0) {
			u.setName(data.getName());
		}
		if(data.getPassword().length() > 0) {
			u.setPassword(data.getPassword());
		}
	}

	/**
	 * @return une chaine de caractère aléatorie de taille 8
	 */
	private static String randomPassword() {
		final int pwdSize = 8;
		final char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
		StringBuilder pwd = new StringBuilder();
		for (int i = 0; i < pwdSize; i++) {
			char c = chars[random.nextInt(chars.length)];
			pwd.append(c);
		}
		return pwd.toString();
	}

	@Override
	public boolean resetPassword(final String email) {
		final UserEntItf u = getUser(email);
		if(u != null) {
			final String newPwd = randomPassword();
			u.setPassword(newPwd);
			this.mailer.sendResetPassword(u,newPwd);
			return true;
		}
		return false;
	}

	@Override
	public boolean isAdmin(int idUser) {
		return getUser(idUser).isAdmin();
	}
}

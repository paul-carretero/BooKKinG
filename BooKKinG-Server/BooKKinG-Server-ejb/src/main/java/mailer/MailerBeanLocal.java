package mailer;

import javax.ejb.Local;

import command.entity.CommandEntItf;
import user.entity.UserEntItf;

/**
 * interface du bean de gestion des mails
 */
@Local
public interface MailerBeanLocal {
	
	/**
	 * @param aUser un utilisateur auquel envoyer un mail de bienvenu
	 */
	public void sendWelcomeEmail(UserEntItf aUser);

	/**
	 * @param aUser un utilisateur qui à demandé un reset de sont mot de passe
	 * @param newPwd un nouveau mot de passe à envoyer à cet utilisateur
	 */
	public void sendResetPassword(UserEntItf aUser, String newPwd);

	/**
	 * envoie un mail de confirmation de commande en HTML
	 * @param aUser un utilisateur ayant passé une commande
	 * @param cmd une commande
	 */
	public void sendConfirmationCommand(UserEntItf aUser, CommandEntItf cmd);
	
}

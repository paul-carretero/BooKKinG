package mailer;

import javax.ejb.Local;

import command.entity.CommandEntItf;
import user.entity.UserEntItf;

@Local
public interface MailerBeanLocal {
	
	public void sendWelcomeEmail(UserEntItf aUser);

	public void sendResetPassword(UserEntItf aUser, String newPwd);

	public void sendConfirmationCommand(UserEntItf aUser, CommandEntItf cmd);
	
}

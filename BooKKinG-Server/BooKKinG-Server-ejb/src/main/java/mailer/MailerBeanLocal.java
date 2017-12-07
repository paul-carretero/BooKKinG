package mailer;

import javax.ejb.Local;

import command.entity.CommandEntItf;
import user.entity.UserEntROItf;

@Local
public interface MailerBeanLocal {
	
	public void sendWelcomeEmail(UserEntROItf aUser);

	public void sendResetPassword(UserEntROItf aUser, String newPwd);

	public void sendConfirmationCommand(UserEntROItf aUser, CommandEntItf cmd);
	
}

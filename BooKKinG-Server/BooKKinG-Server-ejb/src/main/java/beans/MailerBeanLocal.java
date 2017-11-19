package beans;

import javax.ejb.Local;

import localItf.CommandEntItf;
import localItf.UserEntItf;

@Local
public interface MailerBeanLocal {
	
	public void sendWelcomeEmail(UserEntItf aUser);

	public void sendResetPassword(UserEntItf aUser, String newPwd);

	public void sendConfirmationCommand(UserEntItf aUser, CommandEntItf cmd);
	
}

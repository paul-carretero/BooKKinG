package beans;

import java.util.Properties;

import javax.ejb.Asynchronous;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import localItf.CmdDetailEntItf;
import localItf.CommandEntItf;
import localItf.UserEntItf;

/**
 * Session Bean implementation class Mailer
 */
@Stateless
@LocalBean
public class MailerBean implements MailerBeanLocal {

	private static final String SMTP_HOST_NAME = "SSL0.OVH.NET";
	private static final String SMTP_AUTH_USER = "contact@bookking.ovh";
	private static final String SMTP_HOST_PORT = "587";

	/**
	 * Default constructor. 
	 */
	public MailerBean() {}

	private class SMTPAuthenticator extends Authenticator {
		public SMTPAuthenticator() {
			super();
		}
		@Override
		public PasswordAuthentication getPasswordAuthentication() {
			return new PasswordAuthentication(SMTP_AUTH_USER, getJCVD());
		}
	}
	
	/**
	 * juste pour que ce soit un peu moins obvious...
	 * @return jcvd
	 */
	public static String getJCVD(){
		int jcvd = 246913567;
		jcvd -= 31;
		jcvd += 42;
		jcvd /= 2;
		return String.valueOf(jcvd)+"?";
	}
	
	private void actualSender(final String toEmail, final String subject, final String textMessage) {
		Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", SMTP_HOST_NAME);
		properties.setProperty("mail.smtp.port", SMTP_HOST_PORT);
		properties.setProperty("mail.user", SMTP_AUTH_USER);
		properties.setProperty("mail.smtp.auth", "true");
		Authenticator auth = new SMTPAuthenticator();
		Session session = Session.getDefaultInstance(properties, auth);
		
		try {
			MimeMessage mail = new MimeMessage(session);
			mail.setFrom(new InternetAddress(SMTP_AUTH_USER));
			mail.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
			mail.setSubject(subject);
			mail.setText(textMessage);
			Transport.send(mail);
		} catch (MessagingException e) {
			System.err.println(e.getMessage());
		}
	}

	@Asynchronous
	@Override
	public void sendWelcomeEmail(final UserEntItf aUser) {
		StringBuffer actualMessage = new StringBuffer();
		actualMessage.append("Bonjour ");
		actualMessage.append(aUser.getName());
		actualMessage.append("\r\n\r\n");
		actualMessage.append("Merci pour votre inscription sur BooKKinG et bienvenu!");
		actualMessage.append("\r\n\r\n");
		actualMessage.append("Voici un rappel de vos coordonnées:\r\n");
		actualMessage.append(aUser.getAddress());
		actualMessage.append("\r\n\r\n");
		actualMessage.append("N'hésitez pas à nous contacter pour toutes autres questions");
		actualMessage.append("\r\n\r\n");
		actualMessage.append("L'équipe BooKKinG");
		actualSender(aUser.getEmail(), "BooKKinG : création de votre compte client", actualMessage.toString());
	}

	@Asynchronous
	@Override
	public void sendResetPassword(final UserEntItf aUser, final String newPwd) {
		StringBuffer actualMessage = new StringBuffer();
		actualMessage.append("Bonjour ");
		actualMessage.append(aUser.getName());
		actualMessage.append("\r\n\r\n");
		actualMessage.append("Nous avons bien pris en compte votre demande de nouveau mot de passe");
		actualMessage.append("\r\n");
		actualMessage.append("Voici votre nouveau mot de passe: ");
		actualMessage.append(newPwd);
		actualMessage.append("\r\n\r\n");
		actualMessage.append("N'hésitez pas à nous contacter pour toutes autres questions");
		actualMessage.append("\r\n\r\n");
		actualMessage.append("L'équipe BooKKinG");
		actualSender(aUser.getEmail(), "BooKKinG : votre nouveau mot de passe", actualMessage.toString());
	}

	@Asynchronous
	@Override
	public void sendConfirmationCommand(final UserEntItf aUser, final CommandEntItf cmd) {
		StringBuffer actualMessage = new StringBuffer();
		actualMessage.append("Bonjour ");
		actualMessage.append(aUser.getName());
		actualMessage.append("\r\n\r\n");
		actualMessage.append("Nous avons bien pris en compte votre commande (numéro ");
		actualMessage.append(cmd.getIdCmd());
		actualMessage.append(") du ");
		actualMessage.append(cmd.getDate());
		actualMessage.append(" et nous vous en remercions");
		actualMessage.append("\r\n");
		actualMessage.append("Pour rappel, voici sa composition: \r\n\r\n");
		actualMessage.append("----------------------------------\r\n");
		for(CmdDetailEntItf cmdEntry : cmd.getCmdDetails()) {
			actualMessage.append(cmdEntry.toString());
			actualMessage.append("\r\n");
		}
		actualMessage.append("----------------------------------\r\n");
		actualMessage.append("TOTAL : ");
		actualMessage.append(cmd.getTotal());
		
		actualMessage.append("\r\n\r\n");
		actualMessage.append("N'hésitez pas à nous contacter pour toutes autres questions");
		actualMessage.append("\r\n\r\n");
		actualMessage.append("L'équipe BooKKinG");
		
		actualSender(aUser.getEmail(), "BooKKinG : Confirmation de votre commande", actualMessage.toString());
	}
}

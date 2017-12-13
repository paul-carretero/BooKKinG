package mailer;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Properties;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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

import command.entity.CmdDetailEntItf;
import command.entity.CommandEntItf;
import user.entity.UserEntItf;

/**
 * Session Bean implementation class Mailer
 */
@Stateless
@LocalBean
public class MailerBean implements MailerBeanLocal {

	private static final boolean ACTUALLY_SEND_MAIL = true;
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

	private void actualSender(final String toEmail, final String subject, final String textMessage, final boolean useHTML) {
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
			if(useHTML) {
				mail.setText(textMessage, "utf-8", "html");
			}
			else {
				mail.setText(textMessage);
			}
			if(ACTUALLY_SEND_MAIL) {
				Transport.send(mail);
			}
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
		actualSender(aUser.getEmail(), "BooKKinG : création de votre compte client", actualMessage.toString(), false);
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
		actualSender(aUser.getEmail(), "BooKKinG : votre nouveau mot de passe", actualMessage.toString(), false);
	}

	@Asynchronous
	@Override
	public void sendConfirmationCommand(final UserEntItf aUser, final CommandEntItf cmd) {
		String template = getTemplate("invoice");
		String subtotal = String.valueOf(cmd.getTotal());
		String shipping = "3";
		String total = String.valueOf(cmd.getTotal() + 3);
		
		template = template.replaceFirst(Pattern.quote("{{USER_NAME}}"), aUser.getName());
		template = template.replaceFirst(Pattern.quote("{{SHIPPING_ADRESSE}}"), cmd.getAddress());
		template = template.replaceFirst(Pattern.quote("{{INVOICE_ADRESSE}}"), cmd.getAddress());
		template = template.replaceFirst(Pattern.quote("{{COMMAND_DATE}}"), cmd.getDate());
		template = template.replaceFirst(Pattern.quote("{{COMMAND_ID}}"), cmd.getIdCmd().toString());
		template = template.replaceFirst(Pattern.quote("{{SUB_TOTAL}}"), subtotal);
		template = template.replaceFirst(Pattern.quote("{{SHIPPING_COST}}"), shipping);
		template = template.replaceFirst(Pattern.quote("{{TOTAL_PRICE}}"), total);
		
		StringBuffer details = new StringBuffer();
		for(CmdDetailEntItf cmdEntry : cmd.getCmdDetails()) {
			details.append(cmdEntry.toString());
		}
		
		template = template.replaceFirst(Pattern.quote("{{IN_STOCK_BOOK_DETAIL}}"), details.toString());

		actualSender(aUser.getEmail(), "BooKKinG : Confirmation de votre commande", template, true);
	}
	
	private String getTemplate(String name) {
		try {
			BufferedReader reader = new BufferedReader(new InputStreamReader(MailerBean.class.getResourceAsStream(name + ".html"), "UTF-8"));
			return reader.lines().collect(Collectors.joining());
		} catch (UnsupportedEncodingException e) {
			System.err.println(e.getMessage());
			return "";
		}
		
	}
}

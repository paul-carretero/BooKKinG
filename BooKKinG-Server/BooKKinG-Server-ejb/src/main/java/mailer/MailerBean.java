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
 * fourni des fonctionalités de mail
 * les envois de mail se font de manière asynchrone
 */
@Stateless
@LocalBean
public class MailerBean implements MailerBeanLocal {

	/**
	 * true si l'on envoie des mail, faux sinon
	 */
	private static final boolean ACTUALLY_SEND_MAIL = true;
	
	/**
	 * host smtp pour l'envoie de mail
	 */
	private static final String SMTP_HOST_NAME = "SSL0.OVH.NET";
	
	/**
	 * user smtp
	 */
	private static final String SMTP_AUTH_USER = "contact@bookking.ovh";
	
	/**
	 * port smtp
	 */
	private static final String SMTP_HOST_PORT = "587";
	
	/**
	 * fin de ligne html
	 */
	private static final String END_LINE = "\r\n\r\n";

	/**
	 * Default constructor. 
	 */
	public MailerBean() {}

	/**
	 * authentification pour l'envoi de mail ovh
	 */
	private class SMTPAuthenticator extends Authenticator {
		/**
		 * default constructor
		 */
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

	/**
	 * @param toEmail adresse mail de destination
	 * @param subject sujet du mail
	 * @param textMessage corp du mail
	 * @param useHTML vrai si le mail est au format html
	 */
	private void actualSender(final String toEmail, final String subject, final String textMessage, final boolean useHTML) {
		final Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", SMTP_HOST_NAME);
		properties.setProperty("mail.smtp.port", SMTP_HOST_PORT);
		properties.setProperty("mail.user", SMTP_AUTH_USER);
		properties.setProperty("mail.smtp.auth", "true");
		final Authenticator auth = new SMTPAuthenticator();
		final Session session = Session.getDefaultInstance(properties, auth);
		try {
			final MimeMessage mail = new MimeMessage(session);
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
		final StringBuffer actualMessage = new StringBuffer();
		actualMessage.append("Bonjour ");
		actualMessage.append(aUser.getName());
		actualMessage.append(END_LINE);
		actualMessage.append("Merci pour votre inscription sur BooKKinG et bienvenu!");
		actualMessage.append(END_LINE);
		actualMessage.append("Voici un rappel de vos coordonnées:\r\n");
		actualMessage.append(aUser.getAddress());
		actualMessage.append(END_LINE);
		actualMessage.append("N'hésitez pas à nous contacter pour toutes autres questions");
		actualMessage.append(END_LINE);
		actualMessage.append("L'équipe BooKKinG");
		actualSender(aUser.getEmail(), "BooKKinG : création de votre compte client", actualMessage.toString(), false);
	}

	@Asynchronous
	@Override
	public void sendResetPassword(final UserEntItf aUser, final String newPwd) {
		StringBuffer actualMessage = new StringBuffer();
		actualMessage.append("Bonjour ");
		actualMessage.append(aUser.getName());
		actualMessage.append(END_LINE);
		actualMessage.append("Nous avons bien pris en compte votre demande de nouveau mot de passe");
		actualMessage.append("\r\n");
		actualMessage.append("Voici votre nouveau mot de passe: ");
		actualMessage.append(newPwd);
		actualMessage.append(END_LINE);
		actualMessage.append("N'hésitez pas à nous contacter pour toutes autres questions");
		actualMessage.append(END_LINE);
		actualMessage.append("L'équipe BooKKinG");
		actualSender(aUser.getEmail(), "BooKKinG : votre nouveau mot de passe", actualMessage.toString(), false);
	}

	@Asynchronous
	@Override
	public void sendConfirmationCommand(final UserEntItf aUser, final CommandEntItf cmd) {
		String template = getTemplate("invoice");
		final String subtotal = String.valueOf(cmd.getTotal());
		final String total 	= String.format("%.2f", (cmd.getTotal() + cmd.getShippingCost()));
		
		template = template.replaceFirst(Pattern.quote("{{USER_NAME}}"), aUser.getName());
		template = template.replaceFirst(Pattern.quote("{{INVOICE_NAME}}"), aUser.getName());
		template = template.replaceFirst(Pattern.quote("{{SHIPPING_ADRESSE}}"), cmd.getAddress());
		template = template.replaceFirst(Pattern.quote("{{INVOICE_ADRESSE}}"), aUser.getAddress());
		template = template.replaceFirst(Pattern.quote("{{COMMAND_DATE}}"), cmd.getDate());
		template = template.replaceFirst(Pattern.quote("{{COMMAND_ID}}"), String.valueOf(cmd.getIdCmd()));
		template = template.replaceFirst(Pattern.quote("{{SUB_TOTAL}}"), subtotal);
		template = template.replaceFirst(Pattern.quote("{{SHIPPING_COST}}"), String.valueOf(cmd.getShippingCost())+",00");
		template = template.replaceFirst(Pattern.quote("{{TOTAL_PRICE}}"), total);
		
		StringBuffer details = new StringBuffer();
		for(CmdDetailEntItf cmdEntry : cmd.getCmdDetails()) {
			details.append(cmdEntry.toString());
		}
		
		template = template.replaceFirst(Pattern.quote("{{IN_STOCK_BOOK_DETAIL}}"), details.toString());

		actualSender(aUser.getEmail(), "BooKKinG : Confirmation de votre commande", template, true);
	}
	
	/**
	 * @param name le nom d'un template
	 * @return un template html pour l'envoie d'un mail
	 */
	private static String getTemplate(String name) {
		try {
			BufferedReader reader = new BufferedReader(new InputStreamReader(MailerBean.class.getResourceAsStream(name + ".html"), "UTF-8"));
			return reader.lines().collect(Collectors.joining());
		} catch (UnsupportedEncodingException e) {
			System.err.println(e.getMessage());
			return "";
		}
		
	}
}

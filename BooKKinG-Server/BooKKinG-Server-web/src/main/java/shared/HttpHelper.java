package shared;

import java.io.IOException;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import user.bean.UserBeanLocal;

/**
 * @author Paul Carretero
 * classe static proposant des methodes pour les servlets
 * 
 * info générale : PUT est idempotent, POST ne l'est pas
 */
public class HttpHelper {

	/**
	 * @param servletName nom du servlet, par exemple "Login"
	 * @param uri uri requested par le client par exemple "/BooKKinG-Server-web/Login/somedatahere/"
	 * @return les données éventuelle, par exemple "somedatahere"
	 */
	public static String extractDataFromGet(final String servletName, final String uri) {
		if(uri.indexOf(servletName) + servletName.length() == uri.length()) {
			return "";
		}
		String data = uri.substring(uri.indexOf(servletName) + servletName.length()+1);
		if(data.length() == 0) {
			return "";
		}
		if(data.endsWith("/")) {
			return data.substring(0,data.length()-1);
		}
		return data;
	}

	public static boolean checkAuth(final HttpServletRequest request, final HttpServletResponse response) throws IOException{
		HttpSession session = request.getSession();
		if(session.getAttribute("idUser") == null) {
			response.getWriter().append(new GenericResponseJson(false,"vous n'êtes pas connecté").toString());
			return false;
		}
		return true;
	}

	public static boolean checkAndValidData(final Validifyable data, final HttpServletResponse response) throws IOException {
		if(data == null) {
			response.getWriter().append(new GenericResponseJson(false,"echec : aucune donnee").toString());
			return false;
		}
		data.validify();
		return true;
	}

	public static Integer getIdUser(final HttpServletRequest request) {
		return (Integer) request.getSession().getAttribute("idUser");
	}

	public static boolean isEmailValid(String email) {
		try {
			new InternetAddress(email).validate();
			return true;
		} catch (@SuppressWarnings("unused") AddressException ex) {
			return false;
		}
	}

	public static boolean checkAdmin(UserBeanLocal userBean, HttpServletRequest request, HttpServletResponse response) throws IOException {
		if(userBean.isAdmin(getIdUser(request))) {
			return true;
		}
		response.getWriter().append(new GenericResponseJson(false,"echec : vous n'êtes pas administrateur").toString());
		return false;
	}
	
}

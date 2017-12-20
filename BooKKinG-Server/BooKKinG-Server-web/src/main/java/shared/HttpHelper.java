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
	 * HTTP_HEADERS (les données retourné sont de type JSON et encodées en UTF-8)
	 */
	public static final String HTTP_HEADERS = "application/json;charset=UTF-8";
	
	/**
	 * constante permettant l'access à l'id d'un utilisateur connecté stocké dans les session http
	 */
	public static final String ID_USER = "idUser";

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

	/**
	 * @param request une requpête HTTP
	 * @param response une réponse HTTP
	 * @return vrai si l'utilisateur est connecté sur le serveur, faux sinon
	 * @throws IOException
	 */
	public static boolean checkAuth(final HttpServletRequest request, final HttpServletResponse response) throws IOException{
		HttpSession session = request.getSession();
		if(session.getAttribute("idUser") == null) {
			response.getWriter().append(new GenericResponseJson(false,"vous n'êtes pas connecté").toString());
			return false;
		}
		return true;
	}

	/**
	 * @param data des données utilisateur
	 * @param response une réponse HTTP sur laquelle emmetre un message d'erreur si le JSON était invalide
	 * @return vrai par défault, sauf si le JSON était invalide
	 * @throws IOException
	 */
	public static boolean checkAndValidData(final Validifyable data, final HttpServletResponse response) throws IOException {
		if(data == null) {
			response.getWriter().append(new GenericResponseJson(false,"echec : JSON invalide").toString());
			return false;
		}
		data.validify();
		return true;
	}

	/**
	 * @param request une requpete HTTP
	 * @return l'id d'un utilisateur connecté sur ce serveur
	 */
	public static int getIdUser(final HttpServletRequest request) {
		return (int) request.getSession().getAttribute("idUser");
	}

	/**
	 * @param email une chaine de caractère
	 * @return vrai si l'adresse est valide, faus sinon
	 */
	public static boolean isEmailValid(String email) {
		try {
			new InternetAddress(email).validate();
			return true;
		} catch (@SuppressWarnings("unused") AddressException ex) {
			return false;
		}
	}

	/**
	 * @param userBean un bean utilisateur pour vérifier si l'utilisateur est un administrateur
	 * @param request une requpete http
	 * @param response une réponse http sur laquelle emettre un message d'erreur si l'utilisateur n'est pas administrateur
	 * @return vrai si l'utilisateur est un admin, faux sinon
	 * @throws IOException
	 */
	public static boolean checkAdmin(UserBeanLocal userBean, HttpServletRequest request, HttpServletResponse response) throws IOException {
		if(userBean.isAdmin(getIdUser(request))) {
			return true;
		}
		response.getWriter().append(new GenericResponseJson(false,"echec : vous n'êtes pas administrateur").toString());
		return false;
	}
	
}

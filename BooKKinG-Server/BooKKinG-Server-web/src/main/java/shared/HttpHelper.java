package shared;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import response.GenericResponseJson;

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
		return data.substring(0,data.length()-1);
	}
	
	public static boolean checkAuth(final HttpServletRequest request, final HttpServletResponse response) throws IOException{
		HttpSession session = request.getSession();
		if(session.getAttribute("idUser") == null) {
			response.getWriter().append(new GenericResponseJson(false,"vous n'êtes pas connecté").toString());
			return false;
		}
		return true;
	}
	
	public static Integer getIdUser(final HttpServletRequest request) {
		return (Integer) request.getSession().getAttribute("idUser");
	}

}

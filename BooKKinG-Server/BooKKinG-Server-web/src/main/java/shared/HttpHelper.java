package shared;

/**
 * @author Paul Carretero
 * classe static proposant des methodes d'extraction/creation du contenu http/url
 */
public class HttpHelper {

	/**
	 * @param servletName nom du servlet, par exemple "Login"
	 * @param uri uri requested par le client par exemple "/BooKKinG-Server-web/Login/somedatahere"
	 * @return les données éventuelle, par exemple "somedatahere"
	 */
	public static String extractDataFromGet(String servletName, String uri) {
		String data = uri.substring(uri.indexOf(servletName) + servletName.length()+1);
		return data.substring(0,data.length()-1);
	}

}

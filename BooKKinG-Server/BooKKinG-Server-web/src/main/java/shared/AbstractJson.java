package shared;

import java.io.Serializable;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


/**
 * Classe abstraite représentant une classe de type "modele de donnée" utilisé 
 * pour envoyer ou recevoir des informations sur le front-end client
 */
public abstract class AbstractJson implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID 	= -8060220138682345016L;
	
	/**
	 * standard gson builder
	 */
	protected static final GsonBuilder	builder	= new GsonBuilder();
	
	/**
	 * Gson pour parser-stringifier les class en JSON
	 */
	protected static final Gson 		gson 	= builder.create();

	/**
	 * default constructor
	 */
	public AbstractJson() {}

	/**
	 * retourne la représentation JSON de cette classe
	 */
	@Override
	public String toString() {
		return gson.toJson(this);
	}
	
	/**
	 * @param request requête http
	 * @param targetClass class sur laquelle déserializer ce json
	 * @return un objet correspondant à la classe spécifié initialisé avec les valeur de la requête http
	 */
	public static Object fromJson(final HttpServletRequest request, final Class<? extends AbstractJson> targetClass) {
		try {
			String requestBody = request.getReader().lines().collect(Collectors.joining());
			return gson.fromJson(requestBody, targetClass);
		} catch (Exception e) {
			System.err.println(e.getMessage());
			return null;
		}
	}
}

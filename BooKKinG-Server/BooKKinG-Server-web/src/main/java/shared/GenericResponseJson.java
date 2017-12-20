package shared;

import java.net.InetAddress;
import java.net.UnknownHostException;

import shared.GenericResponseJsonItf;

/**
 * réponse serveur générique
 */
@SuppressWarnings("unused")
public class GenericResponseJson extends AbstractJson implements GenericResponseJsonItf {


	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -127681048178592031L;
	
	/**
	 * vrai si la requête utilisateur à réussi, faux sinon
	 */
	private boolean success;

	/**
	 * message en cas d'echec de la requête utilisateur
	 */
	private String message;
	
	/**
	 * nom du serveur ayant traité cette requête
	 */
	private String serveurUrl = "undefined";

	/**
	 * default constructor en cas de succès
	 */
	public GenericResponseJson() {
		super();
		this.success = true;
		this.message = "";
		try {
			this.serveurUrl = InetAddress.getLocalHost().getHostAddress();
		} catch (UnknownHostException e) {System.err.println(e.getMessage());}
	}
	
	/**
	 * @param success vrai si la requête à reussi, faux sinon
	 */
	public GenericResponseJson(boolean success) {
		super();
		this.success = success;
		this.message = "";
		try {
			this.serveurUrl = InetAddress.getLocalHost().getHostAddress();
		} catch (UnknownHostException e) {System.err.println(e.getMessage());}
	}

	/**
	 * @param success success vrai si la requête à reussi, faux sinon
	 * @param message message détaillant le résultat
	 */
	public GenericResponseJson(boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
		try {
			this.serveurUrl = InetAddress.getLocalHost().getCanonicalHostName();
		} catch (UnknownHostException e) {System.err.println(e.getMessage());}
	}
	
	@Override
	public void setSuccess(boolean success) {
		this.success = success;
	}

	@Override
	public void setMessage(String message) {
		this.message = message;
	}
}

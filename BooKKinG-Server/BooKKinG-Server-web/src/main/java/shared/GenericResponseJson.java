package shared;

import java.net.InetAddress;
import java.net.UnknownHostException;

import shared.GenericResponseJsonItf;

public class GenericResponseJson extends AbstractJson implements GenericResponseJsonItf {


	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -127681048178592031L;
	
	@SuppressWarnings("unused")
	private boolean success;

	@SuppressWarnings("unused")
	private String message;
	
	@SuppressWarnings("unused")
	private String serveurUrl = "undefined";

	public GenericResponseJson() {
		super();
		this.success = true;
		this.message = "";
		try {
			this.serveurUrl = InetAddress.getLocalHost().getHostAddress();
		} catch (UnknownHostException e) {System.err.println(e.getMessage());}
	}
	
	/**
	 * @param success
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
	 * @param success
	 * @param message
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

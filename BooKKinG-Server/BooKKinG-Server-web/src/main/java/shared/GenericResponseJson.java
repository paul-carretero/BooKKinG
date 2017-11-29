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
	private String serveururl = "undefined";

	@SuppressWarnings("unused")
	private String sessionID = "undefined";

	public GenericResponseJson() {
		super();
		this.success = true;
		this.message = "";
		try {
			this.serveururl = InetAddress.getLocalHost().getHostAddress();
		} catch (@SuppressWarnings("unused") UnknownHostException e) {}
	}
	
	/**
	 * @param success
	 */
	public GenericResponseJson(boolean success) {
		super();
		this.success = success;
		this.message = "";
		try {
			this.serveururl = InetAddress.getLocalHost().getHostAddress();
		} catch (@SuppressWarnings("unused") UnknownHostException e) {}
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
			this.serveururl = InetAddress.getLocalHost().getCanonicalHostName();
		} catch (@SuppressWarnings("unused") UnknownHostException e) {}
	}
	
	@Override
	public void setSuccess(boolean success) {
		this.success = success;
	}

	@Override
	public void setMessage(String message) {
		this.message = message;
	}
	
	public void setSessionID(String str) {
		this.sessionID = str;
	}
}

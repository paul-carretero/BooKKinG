package response;

import shared.AbstractJson;

public class GenericResponseJson extends AbstractJson {


	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -127681048178592031L;
	
	@SuppressWarnings("unused")
	private boolean success;
	
	@SuppressWarnings("unused")
	private String message;

	public GenericResponseJson() {
		super();
		this.success = true;
		this.message = "";
	}
	
	/**
	 * @param success
	 */
	public GenericResponseJson(boolean success) {
		super();
		this.success = success;
		this.message = "";
	}

	/**
	 * @param success
	 * @param message
	 */
	public GenericResponseJson(boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
	}
}

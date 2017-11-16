package response;

public class Command extends CartJsonResponse {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1001378718668543497L;
	
	/**
	 * Date de la commande
	 */
	private String date;

	public Command(Integer[][] tc, BookListJson books, String date) {
		super(tc, books);
		this.date = date;
	}
}

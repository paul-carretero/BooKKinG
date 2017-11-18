package response;

public class Command extends CartJsonResponse {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1001378718668543497L;
	
	/**
	 * Date de la commande
	 */
	@SuppressWarnings("unused")
	private String date;

	/**
	 * @param numberOfEntries
	 * @param books
	 */
	public Command(int numberOfEntries, BookListJson books, String date) {
		super(numberOfEntries, books);
		this.date = date;
	}
}

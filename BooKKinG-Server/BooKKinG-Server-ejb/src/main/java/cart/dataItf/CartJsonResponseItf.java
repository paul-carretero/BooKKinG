package cart.dataItf;

import book.entity.BookEntItf;
import shared.GenericResponseJsonItf;

public interface CartJsonResponseItf extends GenericResponseJsonItf {

	public void addBook(BookEntItf aBook, Integer quantity);

}
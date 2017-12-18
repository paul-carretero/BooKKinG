package book.dataItf;

import book.entity.BookEntItf;
import shared.GenericResponseJsonItf;

public interface BookJsonItf extends GenericResponseJsonItf {

	public void setField(BookEntItf bookEnt);

	public BookJsonItf simplify();

	public void setField(int idBook, String title, int stock);

}
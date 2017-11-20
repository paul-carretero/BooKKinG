package JsonItf;

import localItf.BookEntItf;

public interface BookJsonItf extends GenericResponseJsonItf {

	public void setField(BookEntItf bookEnt);

}
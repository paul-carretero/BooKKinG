package book.dataItf;

import shared.GenericResponseJsonItf;

public interface BookListJsonItf extends GenericResponseJsonItf {

	public BookJsonItf prepareNewEntry();

	public void setTotalPageAvailable(int n);
	
	public void setTotalAvailable(int n);

}
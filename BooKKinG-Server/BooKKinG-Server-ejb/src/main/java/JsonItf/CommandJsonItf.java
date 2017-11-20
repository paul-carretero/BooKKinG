package JsonItf;

import localItf.BookEntItf;

public interface CommandJsonItf extends GenericResponseJsonItf {

	public void addCmdEntry(BookEntItf aBook, Float price, Integer quantity);

	public void setIdCmd(Integer idCmd);

	public void setDate(String date);

}
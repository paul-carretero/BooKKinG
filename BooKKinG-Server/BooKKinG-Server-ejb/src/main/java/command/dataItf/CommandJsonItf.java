package command.dataItf;

import book.entity.BookEntItf;
import shared.GenericResponseJsonItf;

public interface CommandJsonItf extends GenericResponseJsonItf {

	public void addCmdEntry(BookEntItf aBook, Float price, Integer quantity);

	public void setIdCmd(Integer idCmd);

	public void setDate(String date);

}
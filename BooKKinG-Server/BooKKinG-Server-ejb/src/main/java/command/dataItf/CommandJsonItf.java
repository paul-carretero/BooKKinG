package command.dataItf;

import book.entity.BookEntItf;
import shared.GenericResponseJsonItf;

public interface CommandJsonItf extends GenericResponseJsonItf {

	public void addCmdEntry(BookEntItf aBook, Float price, Integer quantity, boolean isInStock);

	public void setIdCmd(Integer idCmd);

	public void setDate(String date);

	public void addCmdEntry(BookEntItf aBook, Float price, Integer quantity);

}
package command.dataItf;

import book.entity.BookEntItf;
import shared.GenericResponseJsonItf;

public interface CommandJsonItf extends GenericResponseJsonItf {

	public void addCmdEntry(BookEntItf aBook, Float price, int quantity, boolean isInStock);

	public void setIdCmd(int idCmd);

	public void setDate(String date);

	public void addCmdEntry(BookEntItf aBook, Float price, int quantity);

	public void setShippingCost(int shippingCost);

	public void setShippingAddress(String shippingAddress);

}
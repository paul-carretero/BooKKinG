package command.entity;

import book.entity.BookEntItf;

public interface CmdDetailEntItf {

	public CommandEntItf getCommand();

	public BookEntItf getBook();

	public Integer getQuantity();

	public Float getPrice();

}
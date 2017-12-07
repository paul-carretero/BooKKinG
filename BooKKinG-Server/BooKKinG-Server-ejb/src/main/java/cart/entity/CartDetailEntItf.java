package cart.entity;

import book.entity.BookEntItf;
import user.entity.UserEntROItf;

public interface CartDetailEntItf {

	public UserEntROItf getUser();

	public BookEntItf getBook();

	public Integer getQuantity();

}
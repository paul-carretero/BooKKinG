package cart.entity;

import book.entity.BookEntItf;
import user.entity.UserEntItf;

public interface CartDetailEntItf {

	public UserEntItf getUser();

	public BookEntItf getBook();

	public Integer getQuantity();

}
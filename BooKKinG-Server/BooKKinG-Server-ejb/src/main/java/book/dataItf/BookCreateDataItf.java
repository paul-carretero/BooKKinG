package book.dataItf;

import shared.Genre;
import shared.Type;

public interface BookCreateDataItf {

	Genre getGenre();

	Type getType();

	String getAuthor();

	Float getPrice();

	String getTitle();

	String getPicture();

	String getSummary();

	int getStock();

}
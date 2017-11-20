package JsonItf;

import shared.Genre;
import shared.Type;

public interface BookPostJsonItf {

	Genre getGenre();

	Type getType();

	String getAuthor();

	Float getPrice();

	String getTitle();

	String getPicture();

	String getSummary();

	Integer getStock();

}
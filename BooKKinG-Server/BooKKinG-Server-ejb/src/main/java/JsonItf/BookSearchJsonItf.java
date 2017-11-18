package JsonItf;

import java.util.List;

import shared.Genre;
import shared.Type;

public interface BookSearchJsonItf {

	String getTitle();

	String getAuthor();

	Integer getMaxPrice();

	Integer getMinPrice();

	Type getTypes();

	List<Genre> getGenres();

}
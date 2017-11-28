package book.dataItf;

import java.util.List;

import shared.Genre;
import shared.Type;

public interface BookSearchItf {

	public String getTitle();

	public String getAuthor();

	public Integer getMaxPrice();

	public Integer getMinPrice();

	public Type getType();

	public List<Genre> getGenres();

}
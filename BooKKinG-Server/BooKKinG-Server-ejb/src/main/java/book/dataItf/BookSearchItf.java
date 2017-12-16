package book.dataItf;

import shared.Genre;
import shared.Type;

public interface BookSearchItf {

	public String getTitle();

	public String getAuthor();

	public int getMaxPrice();

	public int getMinPrice();

	public Type getType();

	public Genre getGenre();
	
	public String getAnySearch();

	public int getPage();

}
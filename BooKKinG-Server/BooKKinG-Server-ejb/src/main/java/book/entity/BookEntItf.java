package book.entity;

import shared.Genre;
import shared.Type;

public interface BookEntItf {

	public int getIdBook();

	public Genre getGenre();

	public Type getType();

	public String getAuthor();

	public String getSummary();

	public String getPicture();

	public Float getPrice();

	public int getStock();

	public String getTitle();
	
	public void removeFromStock(int value);

}
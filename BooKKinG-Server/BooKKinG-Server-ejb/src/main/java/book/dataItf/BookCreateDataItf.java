package book.dataItf;

import shared.Genre;
import shared.Type;

public interface BookCreateDataItf {

	public Genre getGenre();

	public Type getType();

	public String getAuthor();

	public float getPrice();

	public String getTitle();

	public String getPicture();

	public String getSummary();

	public int getStock();

	public int getIdBook();

}
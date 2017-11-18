package localItf;

import shared.Genre;
import shared.Type;

public interface BookEntItf {

	public Integer getIdBook();

	public Genre getGenre();

	public Type getType();

	public String getAuthor();

	public String getSummary();

	public String getPicture();

	public Float getPrice();

	public Integer getStock();

	public String getTitle();

}
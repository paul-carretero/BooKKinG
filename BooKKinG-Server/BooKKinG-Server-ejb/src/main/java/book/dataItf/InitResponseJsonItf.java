package book.dataItf;

public interface InitResponseJsonItf {
	
	public void setRange(int minPrice, int maxPrice);
	
	public BookJsonItf prepareNewBookRandom();

	public BookJsonItf prepareNewBookNewest();

	public BookJsonItf prepareNewBookMostBuy();

	public void setParis(String paris);

	public void setBordeaux(String bordeaux);

	public void setGrenoble(String grenoble);
}

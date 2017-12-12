package book.dataItf;

public interface InitResponseJsonItf {
	
	public void setRange(int minPrice, int maxPrice);
	
	public BookJsonItf prepareNewBookRandom();

	public BookJsonItf prepareNewBookNewest();

	public BookJsonItf prepareNewBookMostBuy();
}

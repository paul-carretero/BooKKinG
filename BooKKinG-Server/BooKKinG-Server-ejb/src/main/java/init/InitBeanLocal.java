package init;

import javax.ejb.Local;

import book.dataItf.InitResponseJsonItf;

@Local
public interface InitBeanLocal {

	public void getRandom(InitResponseJsonItf response);

	public void getNewest(InitResponseJsonItf response);

	public void getMostBuy(InitResponseJsonItf response);

	public void getRange(InitResponseJsonItf response);

	public void getStatiAddress(InitResponseJsonItf res);

}

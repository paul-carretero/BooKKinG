package request;

import JsonItf.CartItemJsonItf;
import JsonItf.CartJsonItf;
import shared.AbstractJson;

public class CartJson extends AbstractJson implements CartJsonItf {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -5439224468396563278L;
	
	CartItemJson[] items;

	public CartJson() {
		super();
	}
	
	@Override
	public CartItemJsonItf[] getItems() {
		return this.items;
	}

}

package request;

import JsonItf.CartItemJsonItf;
import JsonItf.CartJsonItf;
import shared.AbstractJson;

public class CartJson extends AbstractJson implements CartJsonItf, Validifyable {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -5439224468396563278L;
	
	CartItemJson[] items;

	public CartJson() {
		super();
	}
	
	public CartJson(CartItemJson[] items) {
		this.items = items;
	}

	@Override
	public CartItemJsonItf[] getItems() {
		return this.items;
}

	@Override
	public void validify() {
		if (this.items == null) {
			this.items = new CartItemJson[0];
		}
	}

}

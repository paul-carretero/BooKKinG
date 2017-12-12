package command.request;

import command.dataItf.CommandReqJsonItf;
import shared.AbstractJson;
import shared.Validifyable;

/**
 * @author Paul Carretero
 * représente les données lors de la validation d'une commande
 */
public class CommandReqJson extends AbstractJson implements CommandReqJsonItf, Validifyable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 4735873589496854747L;
	
	private String address;
	
	/**
	 * Default constructor
	 */
	public CommandReqJson() {}

	@Override
	public String getAddress() {
		return this.address;
	}

	@Override
	public void validify() {
		if(this.address == null || this.address.equals("")) {
			this.address = "Identique à l'adresse de facturation";
		}
	}

}

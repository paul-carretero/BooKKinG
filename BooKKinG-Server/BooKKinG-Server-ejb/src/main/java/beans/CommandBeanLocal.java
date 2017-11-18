package beans;

import javax.ejb.Local;

import JsonItf.CommandJsonItf;
import JsonItf.CommandListJsonItf;

@Local
public interface CommandBeanLocal {
	
	public void proceedCartCheckout(Integer idUser);

	public void getCommand(Integer idCmd, CommandJsonItf response);

	public void getCommands(Integer idUser, CommandListJsonItf response);

}

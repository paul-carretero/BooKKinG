package command.bean;

import javax.ejb.Local;

import command.dataItf.CommandJsonItf;
import command.dataItf.CommandListJsonItf;

@Local
public interface CommandBeanLocal {
	
	public void proceedCartCheckout(Integer idUser);

	public void getCommand(Integer idCmd, CommandJsonItf response);

	public void getCommands(Integer idUser, CommandListJsonItf response);

	public boolean isCmdOfUser(Integer idUser, Integer idCmd);

}

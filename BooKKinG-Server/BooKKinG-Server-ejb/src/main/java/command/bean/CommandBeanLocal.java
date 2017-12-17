package command.bean;

import javax.ejb.Local;

import command.dataItf.CmdGetJsonItf;
import command.dataItf.CommandJsonItf;
import command.dataItf.CommandListJsonItf;
import command.dataItf.CommandReqJsonItf;

@Local
public interface CommandBeanLocal {
	
	public void proceedCartCheckout(int idUser, CommandReqJsonItf data, CommandJsonItf response);
	
	public void getCommand(int idCmd, CommandJsonItf response);

	public void getCommands(int idUser, CommandListJsonItf response);

	public boolean isCmdOfUser(int idUser, int idCmd);

	public void getCommands(CmdGetJsonItf data, CommandListJsonItf response);
}

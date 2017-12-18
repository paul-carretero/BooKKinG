package command.response;

import java.util.ArrayList;
import java.util.List;

import command.dataItf.CommandJsonItf;
import command.dataItf.CommandListJsonItf;
import shared.GenericResponseJson;

public class CommandListJson extends GenericResponseJson implements CommandListJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1001378718668543497L;
	
	private List<CommandJson> commands;

	/**
	 * default constructor
	 */
	public CommandListJson() {
		super();
		this.commands = new ArrayList<>();
	}
	
	@Override
	public CommandJsonItf prepareNewEntry(){
		CommandJson res = new CommandJson();
		this.commands.add(res);
		return res;
	}

}

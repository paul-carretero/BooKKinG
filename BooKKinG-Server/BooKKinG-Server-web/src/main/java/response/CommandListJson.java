package response;

import java.util.ArrayList;
import java.util.List;

import JsonItf.CommandJsonItf;
import JsonItf.CommandListJsonItf;
import shared.AbstractJson;

public class CommandListJson extends AbstractJson implements CommandListJsonItf {

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
	public CommandJsonItf prepareNewEntry(final String date, final Integer idCmd){
		CommandJson res = new CommandJson(date,idCmd);
		this.commands.add(res);
		return res;
	}

}

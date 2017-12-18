package command.dataItf;

import shared.GenericResponseJsonItf;

public interface CommandListJsonItf extends GenericResponseJsonItf {

	public CommandJsonItf prepareNewEntry();

}
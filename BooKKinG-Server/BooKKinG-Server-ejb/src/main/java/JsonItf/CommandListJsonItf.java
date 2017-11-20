package JsonItf;

public interface CommandListJsonItf extends GenericResponseJsonItf {

	public CommandJsonItf prepareNewEntry(String date, Integer idCmd);

}
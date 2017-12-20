package command.request;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import command.dataItf.CmdGetJsonItf;
import shared.AbstractJson;

/**
 * ordre administrateur demandant de récupérer des commandes
 */
public class CommandGetJson extends AbstractJson implements CmdGetJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -2288596061155849391L;
	
	/**
	 * date de début de la recherche des commandes clients
	 */
	private String start;
	
	/**
	 * date de fin
	 */
	private String end;

	/**
	 * default constructor
	 */
	public CommandGetJson() {
		super();
	}

	/**
	 * @param str une chaine de caractère
	 * @return le timestamp associé à cette chaine de caractère
	 */
	private static Timestamp getTimestamp(String str) {
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date parsedDate = dateFormat.parse(str);
			return new Timestamp(parsedDate.getTime());
		} catch (ParseException e) {
			System.err.println(e.getMessage());
			return new Timestamp(0);
		}
	}
	
	@Override
	public Timestamp getStart() {
		return getTimestamp(this.start);
	}

	@Override
	public Timestamp getEnd() {
		return getTimestamp(this.end);
	}
}

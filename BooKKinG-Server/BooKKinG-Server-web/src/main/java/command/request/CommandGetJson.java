package command.request;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import command.dataItf.CmdGetJsonItf;
import shared.AbstractJson;

public class CommandGetJson extends AbstractJson implements CmdGetJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -2288596061155849391L;
	
	private String start;
	
	private String end;

	public CommandGetJson() {}

	private Timestamp getTimestamp(String str) {
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

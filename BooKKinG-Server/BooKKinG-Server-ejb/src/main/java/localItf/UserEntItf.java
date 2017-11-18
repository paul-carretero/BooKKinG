package localItf;

import java.io.Serializable;

public interface UserEntItf extends Serializable{

	public String getName();

	public String getEmail();

	public String getPassword();

	public String getAddress();

	public Integer getId();
}
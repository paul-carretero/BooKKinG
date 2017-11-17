package localItf;

import java.io.Serializable;

public interface UserItf extends Serializable{

	String getName();

	String getEmail();

	String getPassword();

	String getAddress();
}
package user.dataItf;

import shared.GenericResponseJsonItf;

public interface UserJsonResponseItf extends GenericResponseJsonItf {

	public String getName();

	public String getEmail();

	public String getAddress();

}
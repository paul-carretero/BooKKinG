package beans;

import javax.ejb.Local;

import JsonItf.UserJsonItf;
import localItf.UserEntItf;

@Local
public interface UserBeanLocal {
	public boolean createUser(UserJsonItf user);
	
	public boolean tryLogin(UserJsonItf user);
	
	public UserEntItf getUser(int id);
	
	public UserEntItf getUser(String email);
	
	public void updateUser(Integer attribute, UserJsonItf data);
}

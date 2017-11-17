package beans;

import javax.ejb.Local;

import localItf.UserItf;

@Local
public interface UserBeanLocal {
	public void createUser(UserItf user);
	
	public boolean tryLogin(UserItf user);
	
	public UserItf getUser(int id);
	
	public UserItf getUser(String email);
}

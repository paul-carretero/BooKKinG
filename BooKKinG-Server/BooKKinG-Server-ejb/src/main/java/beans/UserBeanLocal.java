package beans;

import javax.ejb.Local;

import JsonItf.UserJsonItf;
import entities.UserEntity;
import localItf.UserEntItf;

@Local
public interface UserBeanLocal {
	public boolean createUser(UserJsonItf user);
	
	public boolean tryLogin(UserJsonItf user);
	
	public UserEntity getUser(int idUser);
	
	public UserEntItf getUser(String email);
	
	public void updateUser(Integer attribute, UserJsonItf data);
}

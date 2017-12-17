package user.bean;

import javax.ejb.Local;

import user.dataItf.UserJsonItf;
import user.entity.UserEntItf;
import user.entity.UserEntity;

@Local
public interface UserBeanLocal {
	
	public boolean createUser(UserJsonItf user);
	
	public boolean tryLogin(UserJsonItf user);
	
	public UserEntity getUser(int idUser);
	
	public UserEntItf getUser(String email);
	
	public void updateUser(int attribute, UserJsonItf data);

	public boolean resetPassword(String email);

	public boolean isAdmin(int idUser);
}

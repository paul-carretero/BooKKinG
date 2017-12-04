package user.bean;

import javax.ejb.Local;

import user.dataItf.UserJsonItf;
import user.entity.UserEntROItf;
import user.entity.UserEntRWItf;
import user.entity.UserEntity;

@Local
public interface UserBeanLocal {
	
	public boolean createUser(UserJsonItf user);
	
	public boolean tryLogin(UserJsonItf user);
	
	public UserEntROItf getUser(int idUser);
	
	public UserEntROItf getUser(String email);
	
	public UserEntRWItf getUserForUpdate(String email);

	public UserEntity getUserForUpdate(int idUser);
	
	public void updateUser(Integer attribute, UserJsonItf data);

	public boolean resetPassword(String email);

	public boolean isAdmin(Integer idUser);
}

package user;

import user.bean.UserBeanLocal;
import user.dataItf.UserJsonItf;
import user.entity.UserEntItf;
import user.entity.UserEntity;

public class MockedUserBean implements UserBeanLocal {

	public MockedUserBean() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean createUser(UserJsonItf user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean tryLogin(UserJsonItf user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public UserEntity getUser(int idUser) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserEntItf getUser(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateUser(int attribute, UserJsonItf data) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean resetPassword(String email) {
		return email.equals("paul@carretero.ovh");
	}

	@Override
	public boolean isAdmin(int idUser) {
		return idUser == 42;
	}

}

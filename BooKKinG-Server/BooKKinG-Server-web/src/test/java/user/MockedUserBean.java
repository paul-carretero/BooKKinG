package user;

import user.bean.UserBeanLocal;
import user.dataItf.UserJsonItf;
import user.entity.UserEntItf;
import user.entity.UserEntity;

@SuppressWarnings("javadoc")
public class MockedUserBean implements UserBeanLocal {

	public MockedUserBean() {
		super();
	}

	@Override
	public boolean createUser(UserJsonItf user) {
		return !(user.getEmail().equals("paul@carretero.ovh"));
	}

	@Override
	public boolean tryLogin(UserJsonItf user) {
		return (user.getPassword().equals("123456"));
	}

	@Override
	public UserEntity getUser(int idUser) {
		return new UserEntity("paul carretero", "", "paul@carretero.ovh", "123456" );
	}

	@Override
	public UserEntItf getUser(String email) {
		return new UserEntity("paul carretero", "", "paul@carretero.ovh", "123456");
	}

	@Override
	public void updateUser(int attribute, UserJsonItf data) {
		// unimplemented

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

package user;

public class MockedUser extends User{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1736546299975301865L;

	public MockedUser() {
		super();
		this.userBean = new MockedUserBean();
	}
}

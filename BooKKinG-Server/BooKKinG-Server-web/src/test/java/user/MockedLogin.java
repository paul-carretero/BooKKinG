package user;

public class MockedLogin extends Login {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6823032110821536412L;

	public MockedLogin() {
		super();
		this.userBean = new MockedUserBean();
	}

}

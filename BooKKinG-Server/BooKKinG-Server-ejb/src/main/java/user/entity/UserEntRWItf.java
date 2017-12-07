package user.entity;

public interface UserEntRWItf extends UserEntROItf{

	public void setPassword(String newPwd);

	public void setAddress(String address);

	public void setName(String name);
}
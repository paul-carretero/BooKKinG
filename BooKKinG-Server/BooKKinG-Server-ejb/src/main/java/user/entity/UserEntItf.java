package user.entity;

import java.io.Serializable;
import java.util.List;

import cart.entity.CartDetailEntity;
import command.entity.CommandEntity;

public interface UserEntItf extends Serializable{

	public String getName();

	public String getEmail();

	public String getPassword();

	public String getAddress();

	public int getIdUser();

	public List<CommandEntity> getCommands();

	public List<CartDetailEntity> getCart();

	public boolean isAdmin();
	
	public void setPassword(String newPwd);

	public void setAddress(String address);

	public void setName(String name);
}
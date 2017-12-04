package user.entity;

import java.io.Serializable;
import java.util.List;

import cart.entity.CartDetailEntity;
import command.entity.CommandEntity;

public interface UserEntROItf extends Serializable{

	public String getName();

	public String getEmail();

	public String getPassword();

	public String getAddress();

	public Integer getIdUser();

	public List<CommandEntity> getCommands();

	public List<CartDetailEntity> getCart();

	public boolean isAdmin();
}
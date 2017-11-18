package localItf;

import java.io.Serializable;
import java.util.List;

import entities.CartDetailEntity;
import entities.CommandEntity;

public interface UserEntItf extends Serializable{

	public String getName();

	public String getEmail();

	public String getPassword();

	public String getAddress();

	public Integer getIdUser();

	public List<CommandEntity> getCommands();

	public List<CartDetailEntity> getCart();
}
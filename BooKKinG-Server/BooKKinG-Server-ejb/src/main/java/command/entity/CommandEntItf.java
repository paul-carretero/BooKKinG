package command.entity;

import java.io.Serializable;
import java.util.List;

import user.entity.UserEntity;

public interface CommandEntItf extends Serializable {

	public int getIdCmd();

	public UserEntity getUser();

	public String getDate();

	public List<CmdDetailEntity> getCmdDetails();

	public float getTotal();

	public String getAddress();

	public int getShippingCost();

}
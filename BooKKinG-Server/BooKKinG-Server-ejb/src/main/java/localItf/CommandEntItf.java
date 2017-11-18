package localItf;

import java.util.List;

import entities.CmdDetailEntity;
import entities.UserEntity;

public interface CommandEntItf {

	public Integer getIdCmd();

	public UserEntity getUser();

	public String getDate();

	public List<CmdDetailEntity> getCmdDetails();

}
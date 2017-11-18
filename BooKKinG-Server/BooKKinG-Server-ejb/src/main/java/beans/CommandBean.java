package beans;

import java.util.List;

import javax.ejb.Asynchronous;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import JsonItf.CommandJsonItf;
import JsonItf.CommandListJsonItf;
import entities.CartDetailEntity;
import entities.CmdDetailEntity;
import entities.CommandEntity;
import entities.UserEntity;
import localItf.UserEntItf;

/**
 * Session Bean implementation class CommandBean
 */
@Stateless
@LocalBean
public class CommandBean implements CommandBeanLocal {
	
	@PersistenceContext()
	private EntityManager manager;
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/UserBean!beans.UserBeanLocal")
	UserBeanLocal user;

    /**
     * Default constructor. 
     */
    public CommandBean() {}
    
    @Asynchronous
    @Override
    public void proceedCartCheckout(final Integer idUser) {
    	UserEntity u = this.user.getUser(idUser);
    	List<CartDetailEntity> currentCart = u.getCart();
    	CommandEntity cmd = new CommandEntity();
    	cmd.setDate();
    	cmd.setUser(u);
    	this.manager.persist(cmd);
    	this.manager.flush();
    	
    	for(CartDetailEntity cartEntry : currentCart) {
    		CmdDetailEntity cmdDetail = new CmdDetailEntity(
    				cmd, 
    				cartEntry.getBook(), 
    				cartEntry.getQuantity(), 
    				cartEntry.getBook().getPrice()
    				);
    		this.manager.persist(cmdDetail);
    	}
    }

    @Override
    public void getCommand(final Integer idCmd, final CommandJsonItf response) {
    	CommandEntity command = (CommandEntity) this.manager.createQuery(
				" FROM CommandEntity c WHERE c.idCmd=:idCmd")
				.setParameter("idCmd", idCmd)
				.getSingleResult();
    	response.setDate(command.getDate());
    	response.setIdCmd(idCmd);
    	for(CmdDetailEntity cmdDetail : command.getCmdDetails()) {
    		response.addCmdEntry(cmdDetail.getBook(), cmdDetail.getPrice(), cmdDetail.getQuantity());
    	}
    }
    
    @Override
    public void getCommands(final Integer idUser, final CommandListJsonItf response) {
    	UserEntItf u = this.user.getUser(idUser);
    	for(CommandEntity command : u.getCommands()) {
    		CommandJsonItf cmdJson = response.prepareNewEntry(command.getDate(),command.getIdCmd());
    		for(CmdDetailEntity cmdDetail : command.getCmdDetails()) {
    			cmdJson.addCmdEntry(cmdDetail.getBook(), cmdDetail.getPrice(), cmdDetail.getQuantity());
    		}
    	}
    }
}

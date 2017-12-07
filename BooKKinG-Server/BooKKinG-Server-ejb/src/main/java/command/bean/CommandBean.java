package command.bean;

import java.util.List;

import javax.ejb.Asynchronous;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.transaction.Transactional;

import cart.entity.CartDetailEntity;
import command.dataItf.CommandJsonItf;
import command.dataItf.CommandListJsonItf;
import command.entity.CmdDetailEntity;
import command.entity.CommandEntity;
import mailer.MailerBeanLocal;
import shared.AbstractBean;
import user.bean.UserBeanLocal;
import user.entity.UserEntItf;
import user.entity.UserEntity;

/**
 * Session Bean implementation class CommandBean
 */
@Stateless
@LocalBean
public class CommandBean extends AbstractBean implements CommandBeanLocal {
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/UserBean!user.bean.UserBeanLocal")
	private UserBeanLocal user;

	@EJB(lookup="java:app/BooKKinG-Server-ejb/MailerBean!mailer.MailerBeanLocal")
	private MailerBeanLocal mailer;

	/**
	 * Default constructor. 
	 */
	public CommandBean() {}

	@Asynchronous
	@Override
	@Transactional(rollbackOn={Exception.class})
	public void proceedCartCheckout(final Integer idUser) {
		UserEntity u = this.user.getUser(idUser);
		List<CartDetailEntity> currentCart = u.getCart();
		CommandEntity cmd = new CommandEntity();
		cmd.setDate();
		cmd.setUser(u);
		this.manager.persist(cmd);
		for(CartDetailEntity cartEntry : currentCart) {
			CmdDetailEntity cmdDetail = new CmdDetailEntity(
					cmd, 
					cartEntry.getBook(), 
					cartEntry.getQuantity(), 
					cartEntry.getBook().getPrice()
					);
			this.manager.persist(cmdDetail);
			cmd.addEntry(cmdDetail);
		}
		this.manager.flush();
		this.mailer.sendConfirmationCommand(u, cmd);
	}
	
	private CommandEntity getCommand(Integer idCmd) {
		return this.manager.find(CommandEntity.class, idCmd);
	}

	@Override
	public void getCommand(final Integer idCmd, final CommandJsonItf response) {
		CommandEntity command = getCommand(idCmd);
		if(command != null) {
			response.setDate(command.getDate());
			response.setIdCmd(idCmd);
			for(CmdDetailEntity cmdDetail : command.getCmdDetails()) {
				response.addCmdEntry(cmdDetail.getBook(), cmdDetail.getPrice(), cmdDetail.getQuantity());
			}
		}
		else {
			response.setSuccess(false);
			response.setMessage("La commande n'existe pas");
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

	@Override
	public boolean isCmdOfUser(Integer idUser, Integer idCmd) {
		CommandEntity command = getCommand(idCmd);
		return (command.getUser().getIdUser() == idUser) || command.getUser().isAdmin();
	}
}

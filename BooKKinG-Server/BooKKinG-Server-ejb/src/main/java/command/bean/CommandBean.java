package command.bean;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.transaction.Transactional;

import cart.entity.CartDetailEntity;
import command.dataItf.CommandJsonItf;
import command.dataItf.CommandListJsonItf;
import command.dataItf.CommandReqJsonItf;
import command.entity.CmdDetailEntity;
import command.entity.CommandEntItf;
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
	
	private CommandEntity getCommand(final Integer idCmd) {
		return this.manager.find(CommandEntity.class, idCmd);
	}
	
	/**
	 * @param command
	 * @param response
	 * @param showStock
	 */
	private static void populateResponse(final CommandEntItf command, final CommandJsonItf response, final boolean showStock) {
		response.setDate(command.getDate());
		response.setIdCmd(command.getIdCmd());
		for(CmdDetailEntity cmdDetail : command.getCmdDetails()) {
			if(showStock) {
				// On a déjà retiré le stock pour la commande, on vérifie si on a plus que 0 en rajoutant le stock retiré...
				boolean isInStock = (cmdDetail.getBook().getStock() + cmdDetail.getQuantity() >= 0);
				response.addCmdEntry(cmdDetail.getBook(), cmdDetail.getPrice(), cmdDetail.getQuantity(), isInStock);
			}
			else {
				response.addCmdEntry(cmdDetail.getBook(), cmdDetail.getPrice(), cmdDetail.getQuantity());
			}
		}
	}

	@Override
	@Transactional(rollbackOn={Exception.class})
	public void proceedCartCheckout(final Integer idUser, final CommandReqJsonItf data, final CommandJsonItf response) {
		UserEntity u = this.user.getUser(idUser);
		List<CartDetailEntity> currentCart = u.getCart();
		CommandEntity cmd = new CommandEntity(data.getAddress());
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
			cartEntry.getBook().removeFromStock(cartEntry.getQuantity());
		}
		this.manager.flush();
		this.mailer.sendConfirmationCommand(u, cmd);
		populateResponse(cmd, response, true);
	}

	@Override
	public void getCommand(final Integer idCmd, final CommandJsonItf response) {
		CommandEntity command = getCommand(idCmd);
		if(command != null) {
			populateResponse(command, response, false);
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
	public boolean isCmdOfUser(final Integer idUser, final Integer idCmd) {
		CommandEntity command = getCommand(idCmd);
		return (command.getUser().getIdUser() == idUser) || command.getUser().isAdmin();
	}
}

package command.bean;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.transaction.Transactional;

import cart.entity.CartDetailEntity;
import command.dataItf.CmdGetJsonItf;
import command.dataItf.CommandJsonItf;
import command.dataItf.CommandListJsonItf;
import command.dataItf.CommandReqJsonItf;
import command.entity.CmdDetailEntity;
import command.entity.CommandEntItf;
import command.entity.CommandEntity;
import mailer.MailerBeanLocal;
import shared.AbstractBean;
import shared.Helper;
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
	
	private CommandEntity getCommand(final int idCmd) {
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
		response.setShippingCost(command.getShippingCost());
		response.setInvoiceAddress(command.getUser().getName() + " - " + command.getUser().getAddress());
		response.setShippingAddress(command.getAddress());
		for(CmdDetailEntity cmdDetail : command.getCmdDetails()) {
			if(showStock) {
				// On a déjà retiré le stock pour la commande, on vérifie si on a plus que 0 en rajoutant le stock retiré...
				boolean isInStock = (cmdDetail.getBook().getStock() >= 0);
				response.addCmdEntry(cmdDetail.getBook(), cmdDetail.getPrice(), cmdDetail.getQuantity(), isInStock);
			}
			else {
				response.addCmdEntry(cmdDetail.getBook(), cmdDetail.getPrice(), cmdDetail.getQuantity());
			}
		}
	}

	@Override
	@Transactional(rollbackOn={Exception.class})
	public void proceedCartCheckout(final int idUser, final CommandReqJsonItf data, final CommandJsonItf response) {
		final UserEntity u = this.user.getUser(idUser);
		final List<CartDetailEntity> currentCart = u.getCart();
		final int shippingPrice = Helper.getShippingPrice(data.getAddress());
		final String shippingAddress = Helper.getAddress(data.getAddress());
		final CommandEntity cmd = new CommandEntity(shippingAddress,shippingPrice);
		
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
	public void getCommand(final int idCmd, final CommandJsonItf response) {
		final CommandEntity command = getCommand(idCmd);
		if(command != null) {
			populateResponse(command, response, false);
		}
		else {
			response.setSuccess(false);
			response.setMessage("La commande n'existe pas");
		}
	}

	@Override
	public void getCommands(final int idUser, final CommandListJsonItf response) {
		final UserEntItf u = this.user.getUser(idUser);
		for(CommandEntity command : u.getCommands()) {
			CommandJsonItf cmdJson = response.prepareNewEntry();
			populateResponse(command,cmdJson,false);
		}
	}
	
	@Override
	public void getCommands(final CmdGetJsonItf data, final CommandListJsonItf response) {
		 final List<CommandEntity> cmdList = this.manager.createQuery("FROM CommandEntity where date BETWEEN :start AND :end")
				.setParameter("start", data.getStart())
				.setParameter("end", data.getEnd())
				.getResultList();
		 
		for(CommandEntity command : cmdList) {
			CommandJsonItf cmdJson = response.prepareNewEntry();
			populateResponse(command,cmdJson,false);
		}
	}

	@Override
	public boolean isCmdOfUser(final int idUser, final int idCmd) {
		final CommandEntity command = getCommand(idCmd);
		return (command.getUser().getIdUser() == idUser) || command.getUser().isAdmin();
	}
}

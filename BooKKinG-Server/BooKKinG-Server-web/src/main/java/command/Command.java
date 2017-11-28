package command;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cart.bean.CartBeanLocal;
import command.bean.CommandBeanLocal;
import command.response.CommandJson;
import command.response.CommandListJson;
import shared.GenericResponseJson;
import shared.HttpHelper;

/**
 * Servlet implementation class Command
 */
public class Command extends HttpServlet {

	private static final String NAME = "Command";

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 5666493273940405667L;

	@EJB(lookup="java:app/BooKKinG-Server-ejb/CommandBean!command.bean.CommandBeanLocal")
	private CommandBeanLocal commandBean;

	@EJB(lookup="java:app/BooKKinG-Server-ejb/CartBean!cart.bean.CartBeanLocal")
	private CartBeanLocal cartBean;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Command() {
		super();
	}

	/**
	 * Objectif = récupère la liste des commande d'un utilisateur
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		if(HttpHelper.checkAuth(request, response)) {
			String stringReq = HttpHelper.extractDataFromGet(NAME, request.getRequestURI());
			if(stringReq.length() == 0) {
				CommandListJson res = new CommandListJson();
				this.commandBean.getCommands(HttpHelper.getIdUser(request), res);
				response.getWriter().append(res.toString());
			}
			else {
				Integer idCmd = Integer.valueOf(stringReq);
				if(this.commandBean.isCmdOfUser(HttpHelper.getIdUser(request),idCmd)) {
					CommandJson res = new CommandJson();
					this.commandBean.getCommand(idCmd, res);
					response.getWriter().append(res.toString());
				}
				else {
					response.getWriter().append(new GenericResponseJson(false,"cette commande ne vous appartient pas").toString());
				}
			}
		}
	}

	/**
	 * Objectif = Créer une nouvelle commande
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		if(HttpHelper.checkAuth(request, response)) {
			if(this.cartBean.checkNoEmpty(HttpHelper.getIdUser(request))) {
				this.commandBean.proceedCartCheckout(HttpHelper.getIdUser(request));
				response.getWriter().append(new GenericResponseJson(true).toString());
			}
			else {
				response.getWriter().append(new GenericResponseJson(false,"Votre panier est vide").toString());
			}
		}
	}

}

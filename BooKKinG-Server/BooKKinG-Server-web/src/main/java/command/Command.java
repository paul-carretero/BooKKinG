package command;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cart.bean.CartBeanLocal;
import command.bean.CommandBeanLocal;
import command.request.CommandGetJson;
import command.request.CommandReqJson;
import command.response.CommandJson;
import command.response.CommandListJson;
import shared.AbstractJson;
import shared.GenericResponseJson;
import shared.HttpHelper;
import user.bean.UserBeanLocal;

/**
 * Servlet implementation class Command
 */
public class Command extends HttpServlet {

	private static final String NAME = "Command";

	private static final String UTF_CONST = "text/plain;charset=UTF-8"; 
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 5666493273940405667L;

	@EJB(lookup="java:app/BooKKinG-Server-ejb/CommandBean!command.bean.CommandBeanLocal")
	private CommandBeanLocal commandBean;

	@EJB(lookup="java:app/BooKKinG-Server-ejb/CartBean!cart.bean.CartBeanLocal")
	private CartBeanLocal cartBean;
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/UserBean!user.bean.UserBeanLocal")
	private UserBeanLocal userBean;

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
		response.setContentType(UTF_CONST);
		if(HttpHelper.checkAuth(request, response)) {
			String stringReq = HttpHelper.extractDataFromGet(NAME, request.getRequestURI());
			if(stringReq.length() == 0) {
				CommandListJson res = new CommandListJson();
				this.commandBean.getCommands(HttpHelper.getIdUser(request), res);
				response.getWriter().append(res.toString());
			}
			else {
				int idCmd = Integer.valueOf(stringReq);
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
		response.setContentType(UTF_CONST);
		if(HttpHelper.checkAuth(request, response)) {
			CommandReqJson data = (CommandReqJson) AbstractJson.fromJson(request, CommandReqJson.class);
			if(HttpHelper.checkAndValidData(data, response)) {
				if(this.cartBean.checkNoEmpty(HttpHelper.getIdUser(request))) {
					CommandJson newCmd = new CommandJson();
					this.commandBean.proceedCartCheckout(HttpHelper.getIdUser(request),data, newCmd);
					response.getWriter().append(newCmd.toString());
				}
				else {
					response.getWriter().append(new GenericResponseJson(false,"Votre panier est vide").toString());
				}
			}
		}
	}
	
	@Override
	protected void doPut(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		response.setContentType(UTF_CONST);
		if(HttpHelper.checkAuth(request, response)) {
			CommandGetJson data = (CommandGetJson) AbstractJson.fromJson(request, CommandGetJson.class);
			if(HttpHelper.checkAdmin(this.userBean,request,response)) {
				CommandListJson cmds = new CommandListJson();
				this.commandBean.getCommands(data, cmds);
				response.getWriter().append(cmds.toString());
			}
		}
	}

}

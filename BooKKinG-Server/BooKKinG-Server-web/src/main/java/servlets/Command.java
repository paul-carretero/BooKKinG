package servlets;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import beans.CommandBeanLocal;
import response.CommandJson;
import response.CommandListJson;
import response.GenericResponseJson;
import shared.AbstractJson;
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
	
	@EJB(lookup="java:global/BooKKinG-Server-ear/BooKKinG-Server-ejb/CommandBean!beans.CommandBeanLocal")
	private CommandBeanLocal commandBean;

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
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if(HttpHelper.checkAuth(request, response)) {
			String stringReq = HttpHelper.extractDataFromGet(NAME, request.getRequestURI());
			if(stringReq.length() == 0) {
				CommandListJson res = new CommandListJson();
				this.commandBean.getCommands(HttpHelper.getIdUser(request), res);
				response.getWriter().append(res.toString());
			}
			else {
				CommandJson res = new CommandJson();
				this.commandBean.getCommand(Integer.valueOf(stringReq), res);
				response.getWriter().append(res.toString());
			}
		}
	}

	/**
	 * Objectif = Créer une nouvelle commande
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if(HttpHelper.checkAuth(request, response)) {
			this.commandBean.proceedCartCheckout(HttpHelper.getIdUser(request));
			response.getWriter().append(new GenericResponseJson(true).toString());
		}
	}

}

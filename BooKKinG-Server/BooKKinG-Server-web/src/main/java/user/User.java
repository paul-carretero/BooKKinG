package user;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import shared.AbstractJson;
import shared.GenericResponseJson;
import shared.HttpHelper;
import user.bean.UserBeanLocal;
import user.entity.UserEntItf;
import user.request.UserJson;
import user.response.UserJsonResponse;

/**
 * Servlet implementation class User
 */
public class User extends HttpServlet {

	@SuppressWarnings("unused")
	private static final String NAME = "User";

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -9212380023846124020L;

	@EJB(lookup="java:app/BooKKinG-Server-ejb/UserBean!user.bean.UserBeanLocal")
	private UserBeanLocal userBean;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public User() {
		super();
	}

	/**
	 * Objectif = Obtenir les informations d'un utilisateur
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain;charset=UTF-8");
		if(HttpHelper.checkAuth(request, response)) {
			UserEntItf uItf = this.userBean.getUser(HttpHelper.getIdUser(request));
			UserJsonResponse res = new UserJsonResponse(uItf.getName(), uItf.getEmail(), uItf.getAddress(), uItf.isAdmin());
			response.getWriter().append(res.toString());
		}
	}

	/**
	 * Objectif = Ajouter un utilisateur
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain;charset=UTF-8");
		HttpSession session = request.getSession();
		UserJson data = (UserJson) AbstractJson.fromJson(request, UserJson.class);
		if(HttpHelper.checkAndValidData(data, response)) {
			if(data.checkContent()) {
				if(this.userBean.createUser(data)) {
					session.setAttribute( "idUser", this.userBean.getUser(data.getEmail()).getIdUser());
					response.getWriter().append(new GenericResponseJson(true).toString());
				}
				else {
					response.getWriter().append(new GenericResponseJson(false,"l'email existe déjà dans la base").toString());
				}
			}
			else {
				response.getWriter().append(new GenericResponseJson(false,"donnees invalides pour une creation").toString());
			}
		}
	}

	/**
	 * Objectif = mettre à jour un utilisateur
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	@Override
	protected void doPut(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain;charset=UTF-8");
		if(HttpHelper.checkAuth(request, response)) {
			UserJson data = (UserJson) AbstractJson.fromJson(request, UserJson.class);
			if(HttpHelper.checkAndValidData(data, response)) {
				if(data.checkContentForUpdate()) {
					this.userBean.updateUser(HttpHelper.getIdUser(request),data);
					response.getWriter().append(new GenericResponseJson(true).toString());
				}
				else {
					response.getWriter().append(new GenericResponseJson(false,"donnees invalides pour une mise à jour").toString());
				}
			}
		}
	}
}

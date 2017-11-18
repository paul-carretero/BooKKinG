package servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import JsonItf.UserJsonItf;
import beans.UserBean;
import localItf.UserEntItf;
import request.UserJson;
import response.GenericResponseJson;
import shared.AbstractJson;

/**
 * Servlet implementation class User
 */
public class User extends HttpServlet {
       
    /**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -9212380023846124020L;
	
	@EJB(lookup="java:global/BooKKinG-Server-ear/BooKKinG-Server-ejb/UserBean!beans.UserBean")
	private UserBean userBean;

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
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		Integer idUser = (Integer) session.getAttribute("idUser");
		if(idUser == null) {
			response.getWriter().append(new GenericResponseJson(false,"vous n'êtes pas connecté").toString());
		}
		else {
			UserEntItf uItf = this.userBean.getUser(idUser);
			UserJsonItf res = new UserJson(uItf.getName(), uItf.getEmail(), uItf.getAddress());
			response.getWriter().append(res.toString());
		}
	}

	/**
	 * Objectif = Ajouter un utilisateur
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		UserJson data = (UserJson) AbstractJson.fromJson(request, UserJson.class);
		if(this.userBean.createUser(data)) {
			session.setAttribute( "idUser", this.userBean.getUser(data.getEmail()).getId());
			response.getWriter().append(new GenericResponseJson(true).toString());
		}
		else {
			response.getWriter().append(new GenericResponseJson(false,"l'email existe déjà dans la base").toString());
		}
	}

	/**
	 * Objectif = mettre à jour un utilisateur
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	@Override
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		UserJson data = (UserJson) AbstractJson.fromJson(request, UserJson.class);
		if(session.getAttribute("idUser") != null) {
			this.userBean.updateUser((Integer) session.getAttribute("idUser"),data);
			response.getWriter().append(new GenericResponseJson(true).toString());
		}
		else {
			response.getWriter().append(new GenericResponseJson(false,"vous n'êtes pas connecté").toString());
		}
	}

}

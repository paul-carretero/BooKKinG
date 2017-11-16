package servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import beans.UserBean;
import request.UserJson;
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
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * Objectif = Ajouter un utilisateur
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String requestBody = request.getReader().lines().collect(Collectors.joining());
		UserJson data = (UserJson) AbstractJson.fromJson(requestBody, UserJson.class);
		this.userBean.createUser(data);
	}

	/**
	 * Objectif = mettre à jour un utilisateur
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	@Override
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}

package servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import beans.UserBeanLocal;
import request.UserJson;
import response.GenericResponseJson;
import shared.AbstractJson;
import shared.HttpHelper;

/**
 * Servlet implementation class Login
 * test only
 */
public class Login extends HttpServlet {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3080122707245766248L;

	private static final String NAME = "Login";
	
	@EJB(lookup="java:global/BooKKinG-Server-ear/BooKKinG-Server-ejb/UserBean!beans.UserBeanLocal")
	private UserBeanLocal userBean;
       
	/**
	 * Default constructor
	 */
    public Login() {
        super();
    }

	/**
	 * test only
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String requestBody = request.getReader().lines().collect(Collectors.joining());
		System.out.println(HttpHelper.extractDataFromGet(NAME,request.getRequestURI()));
		
		/* Création ou récupération de la session */

		HttpSession session = request.getSession();


		/* récupération de l'id avec succès et tout */

		Integer idUser = 42;

		session.setAttribute( "idUser", idUser );


		/* Récupération de l'objet depuis la session */

		System.out.println((Integer) session.getAttribute( "idUser" ));
		
		session.removeAttribute("idUser"); // logout
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		UserJson data = (UserJson) AbstractJson.fromJson(request, UserJson.class);
		if(this.userBean.tryLogin(data)) {
			session.setAttribute( "idUser", this.userBean.getUser(data.getEmail()).getIdUser());
			response.getWriter().append(new GenericResponseJson().toString());
		}
		else {
			session.removeAttribute("idUser");
			response.getWriter().append(new GenericResponseJson(false,"echec de l'authentification").toString());
		}
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("idUser") != null) {
			response.getWriter().append(new GenericResponseJson().toString());
		}
		else {
			response.getWriter().append(new GenericResponseJson(false).toString());
		}
	}

}

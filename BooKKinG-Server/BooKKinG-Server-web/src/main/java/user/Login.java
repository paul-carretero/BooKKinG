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
import user.request.UserJson;

/**
 * Servlet implementation class Login
 * test only
 */
public class Login extends HttpServlet {
	
	
	private static final String UTF_CONST = "text/plain;charset=UTF-8";
	
	private static final String ID_USER = "idUser";
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3080122707245766248L;
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/UserBean!user.bean.UserBeanLocal")
	protected UserBeanLocal userBean;
       
	/**
	 * Default constructor
	 */
    public Login() {
        super();
    }

	/**
	 * objectif = logout
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType(UTF_CONST);
		HttpSession session = request.getSession();
		session.removeAttribute(ID_USER);
		response.getWriter().append(new GenericResponseJson(true).toString());
	}
	
	/**
	 * objectif = se connecter (idempotent donc put)
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPut(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		response.setContentType(UTF_CONST);
		HttpSession session = request.getSession();
		UserJson data = (UserJson) AbstractJson.fromJson(request, UserJson.class);
		if(HttpHelper.checkAndValidData(data, response)) {
			if(this.userBean.tryLogin(data)) {
				session.setAttribute( ID_USER, this.userBean.getUser(data.getEmail()).getIdUser());
				response.getWriter().append(new GenericResponseJson(true).toString());
			}
			else {
				session.removeAttribute(ID_USER);
				response.getWriter().append(new GenericResponseJson(false,"email ou mot de passe invalide").toString());
			}
		}
		else {
			session.removeAttribute(ID_USER);
		}
	}
	
	/**
	 * objectif = vérifier si l'on est connecté
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		response.setContentType(UTF_CONST);
		HttpSession session = request.getSession();
		if(session.getAttribute(ID_USER) != null) {
			response.getWriter().append(new GenericResponseJson(true).toString());
		}
		else {
			response.getWriter().append(new GenericResponseJson(false).toString());
		}
	}
	
	/**
	 * objectif = reset password (pas idempotent)
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		response.setContentType(UTF_CONST);
		UserJson data = (UserJson) AbstractJson.fromJson(request, UserJson.class);
		if(HttpHelper.checkAndValidData(data, response)) {
			if(data.checkEmail()) {
				if(this.userBean.resetPassword(data.getEmail())) {
					response.getWriter().append(new GenericResponseJson(true).toString());
				}
				else {
					response.getWriter().append(new GenericResponseJson(false,"aucun compte n'est associé à cet email").toString());
				}
			}
			else {
				response.getWriter().append(new GenericResponseJson(false,"email invalide").toString());
			}
		}
	}

}

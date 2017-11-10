package servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import beans.UserBean;
import entities.User;

/**
 * Servlet implementation class Login
 */
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@EJB(lookup="java:global/BooKKinG-Server-ear/BooKKinG-Server-ejb/UserBean!beans.UserBean")
	private UserBean userBean;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String errorMessage = null;
		String requestBody = request.getReader().lines().collect(Collectors.joining());
		JSONObject obj = new JSONObject(requestBody);
		String mail = (String) obj.get("mail");
		if(mail != null)
		{
			User user = this.userBean.getUser(mail);
			if(user != null)
			{
				errorMessage = "Un compte existe déjà avec cette adresse email";
			}
			else
			{
				response.getWriter().append("{ 'state' : '1' }");
			}
		}
		else
		{
			errorMessage = "Un paramètre attendu n'a pas été définit";
		}
		
		if(errorMessage != null)
		{
			response.getWriter().append("{ 'state' : '0', 'msg' : '" + errorMessage + "' }");
		}
		else
		{
			response.getWriter().append("{ 'state' : '1' }");
		}
	}

}

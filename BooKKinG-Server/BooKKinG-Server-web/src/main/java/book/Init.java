package book;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import book.response.InitResponseJson;
import init.InitBeanLocal;

/**
 * Servlet implementation class Init
 */
public class Init extends HttpServlet {
       
    /**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 854905681146711274L;
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/InitBean!init.InitBeanLocal")
	private InitBeanLocal initBean;

	/**
     * @see HttpServlet#HttpServlet()
     */
    public Init() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain;charset=UTF-8");
		InitResponseJson res = new InitResponseJson();
		this.initBean.getRange(res);
		this.initBean.getMostBuy(res);
		this.initBean.getNewest(res);
		this.initBean.getRandom(res);
		this.initBean.getStatiAddress(res);
		response.getWriter().append(res.toString());
	}
}

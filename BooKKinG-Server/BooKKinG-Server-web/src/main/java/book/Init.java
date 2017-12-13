package book;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import book.bean.BookBeanLocal;
import book.response.InitResponseJson;

/**
 * Servlet implementation class Init
 */
public class Init extends HttpServlet {
       
    /**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 854905681146711274L;
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/BookBean!book.bean.BookBeanLocal")
	private BookBeanLocal bookBean;

	/**
     * @see HttpServlet#HttpServlet()
     */
    public Init() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain;charset=UTF-8");
		InitResponseJson res = new InitResponseJson();
		this.bookBean.getRange(res);
		this.bookBean.getMostBuy(res);
		this.bookBean.getNewest(res);
		this.bookBean.getRandom(res);
		response.getWriter().append(res.toString());
	}
}

package book;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import book.bean.BookBeanLocal;
import book.dataItf.BookListJsonItf;
import book.entity.BookEntItf;
import book.request.BookPostJson;
import book.request.BookSearchJson;
import book.response.BookJson;
import book.response.BookListJson;
import shared.AbstractJson;
import shared.GenericResponseJson;
import shared.HttpHelper;
import user.bean.UserBeanLocal;

/**
 * Servlet implementation class Book
 */
public class Book extends HttpServlet {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6506725183529575051L;

	private static final String NAME = "Book";

	@EJB(lookup="java:app/BooKKinG-Server-ejb/BookBean!book.bean.BookBeanLocal")
	private BookBeanLocal bookBean;
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/UserBean!user.bean.UserBeanLocal")
	private UserBeanLocal userBean;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Book() {
		super();
	}

	/**
	 * Objectif = obtenir un livre
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		String stringReq = HttpHelper.extractDataFromGet(NAME, request.getRequestURI());
		if(stringReq.matches("^\\d+$")) {
			BookEntItf requestedBook = this.bookBean.getBook(Integer.valueOf(stringReq));
			if(requestedBook != null) {
				response.getWriter().append(new BookJson(requestedBook).toString());
			}
			else {
				response.getWriter().append(new GenericResponseJson(false,"le book demande n'existe pas").toString());
			}
		}
		else {
			response.getWriter().append(new GenericResponseJson(false,"id de book demande est invalide").toString());
		}
	}

	/**
	 * Objectif = rechercher une liste de livre
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPut(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		BookSearchJson data = (BookSearchJson) AbstractJson.fromJson(request, BookSearchJson.class);
		if(HttpHelper.checkAndValidData(data, response)) {
			BookListJsonItf res = new BookListJson();
			this.bookBean.getBooks(data, res);
			response.getWriter().append(res.toString());
		}
	}

	/**
	 * Objectif = ajouter un livre
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		if(HttpHelper.checkAuth(request, response)) {
			BookPostJson data = (BookPostJson) AbstractJson.fromJson(request, BookPostJson.class);
			if(HttpHelper.checkAndValidData(data, response)) {
				if(HttpHelper.checkAdmin(this.userBean,request,response)) {
					this.bookBean.addBooks(data);
					response.getWriter().append(new GenericResponseJson(true).toString());
				}
			}
		}
	}

}

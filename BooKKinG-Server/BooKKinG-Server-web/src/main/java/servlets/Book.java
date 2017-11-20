package servlets;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import JsonItf.BookListJsonItf;
import beans.BookBeanLocal;
import beans.UserBeanLocal;
import localItf.BookEntItf;
import request.BookPostJson;
import request.BookSearchJson;
import response.BookJson;
import response.BookListJson;
import response.GenericResponseJson;
import shared.AbstractJson;
import shared.HttpHelper;

/**
 * Servlet implementation class Book
 */
public class Book extends HttpServlet {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6506725183529575051L;

	private static final String NAME = "Book";

	@EJB(lookup="java:global/BooKKinG-Server-ear/BooKKinG-Server-ejb/BookBean!beans.BookBean")
	private BookBeanLocal bookBean;
	
	@EJB(lookup="java:global/BooKKinG-Server-ear/BooKKinG-Server-ejb/UserBean!beans.UserBeanLocal")
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

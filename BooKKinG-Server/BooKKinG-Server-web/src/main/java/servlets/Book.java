package servlets;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import JsonItf.BookListJsonItf;
import beans.BookBeanLocal;
import localItf.BookEntItf;
import request.BookSearchJson;
import response.BookJson;
import response.BookListJson;
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
		BookEntItf requestedBook = this.bookBean.getBook(Integer.valueOf(stringReq));
		response.getWriter().append(new BookJson(requestedBook).toString());
	}

	/**
	 * Objectif = rechercher une liste de livre
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		BookListJsonItf res = new BookListJson();
		BookSearchJson searchData = (BookSearchJson) AbstractJson.fromJson(request, BookSearchJson.class);
		this.bookBean.getBooks(searchData, res);
		response.getWriter().append(res.toString());
	}

}

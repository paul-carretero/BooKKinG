package servlets;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import JsonItf.CartItemJsonItf;
import beans.CartBeanLocal;
import request.CartItemJson;
import request.CartJson;
import response.CartJsonResponse;
import response.GenericResponseJson;
import shared.AbstractJson;
import shared.HttpHelper;

/**
 * Servlet implementation class Cart
 */
public class Cart extends HttpServlet {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 2680655063588941058L;

	@EJB(lookup="java:global/BooKKinG-Server-ear/BooKKinG-Server-ejb/CartBean!beans.CartBeanLocal")
	private CartBeanLocal cartBean;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Cart() {
		super();
	}

	/**
	 * Objectif = obtenir un panier enregistré d'un utilisateur
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		if(HttpHelper.checkAuth(request, response)) {
			CartJsonResponse res = new CartJsonResponse();
			this.cartBean.getCart(HttpHelper.getIdUser(request), res);
			response.getWriter().append(res.toString());
		}
	}

	/**
	 * Objectif = initialiser un panier (utilisateur nouvellement connecté)
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		if(HttpHelper.checkAuth(request, response)) {
			CartJson data = (CartJson) AbstractJson.fromJson(request, CartJson.class);
			if(HttpHelper.checkAndValidData(data, response)) {
				this.cartBean.clearCart(HttpHelper.getIdUser(request));
				for(CartItemJsonItf entry : data.getItems()) {
					this.cartBean.setQuantity(HttpHelper.getIdUser(request), entry);
				}
				response.getWriter().append(new GenericResponseJson(true).toString());
			}
		}
	}

	/**
	 * Objectif = mettre à jour une entrée du panier (si quantité=0 => del)
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPut(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		if(HttpHelper.checkAuth(request, response)) {
			CartItemJson data = (CartItemJson) AbstractJson.fromJson(request, CartItemJson.class);
			if(HttpHelper.checkAndValidData(data, response)) {
				this.cartBean.setQuantity(HttpHelper.getIdUser(request), data);
				response.getWriter().append(new GenericResponseJson(true).toString());
			}
		}
	}

	/**
	 * Objectif = Vider le panier
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	@Override
	protected void doDelete(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		if(HttpHelper.checkAuth(request, response)) {
			this.cartBean.clearCart(HttpHelper.getIdUser(request));
			response.getWriter().append(new GenericResponseJson(true).toString());
		}
	}
}

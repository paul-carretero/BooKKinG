package shared;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import book.request.BookSearchJson;
import cart.request.CartItemJson;
import cart.request.CartJson;
import user.dataItf.UserJsonItf;
import user.request.UserJson;

public abstract class AbstractJson implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID 	= -8060220138682345016L;
	protected final static GsonBuilder	builder	= new GsonBuilder();
	protected final static Gson 		gson 	= builder.create();

	public AbstractJson() {}

	@Override
	public String toString() {
		return gson.toJson(this);
	}

	public static Object fromJson(final String json, Class<? extends AbstractJson> targetClass) {
		return gson.fromJson(json, targetClass);
	}
	
	public static Object fromJson(final HttpServletRequest request, final Class<? extends AbstractJson> targetClass) {
		try {
			String requestBody = request.getReader().lines().collect(Collectors.joining());
			return gson.fromJson(requestBody, targetClass);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * génère et affiche des JSON exemple
	 * @param args unused
	 */
	public static void main (String[] args){
		System.out.println("user JSON:");
		UserJsonItf u = new UserJson("Paul Carretero", "paul@carretero.ovh", "123456", "47 rue marius charles 38420 Domene");
		System.out.println(u);
		
		System.out.println("book search JSON:");
		ArrayList<Genre> g = new ArrayList<>();
		g.add(Genre.GENRE1);
		g.add(Genre.GENRE2);
		BookSearchJson b = new BookSearchJson("", "", 0, 0, g, Type.DEFAULT);
		System.out.println(b);

		System.out.println("cart item request json:");
		CartItemJson ci = new CartItemJson(1,42);
		System.out.println(ci);

		System.out.println("cart request json:");
		CartItemJson[] zzz = new CartItemJson[1];
		zzz[0] = ci;
		CartJson c = new CartJson(zzz);
		System.out.println(c);
	}
}

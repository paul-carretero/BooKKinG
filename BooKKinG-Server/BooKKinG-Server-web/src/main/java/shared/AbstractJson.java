package shared;

import java.io.IOException;
import java.io.Serializable;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import JsonItf.UserJsonItf;
import request.UserJson;
import response.BookJson;
import response.BookListJson;

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

	public static Object fromJson(String json, Class<? extends AbstractJson> targetClass) {
		return gson.fromJson(json, targetClass);
	}
	
	public static Object fromJson(HttpServletRequest request, Class<? extends AbstractJson> targetClass) {
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
	 * @param args
	 */
	public static void main (String[] args){
		System.out.println("user JSON:");
		UserJsonItf u = new UserJson("Paul Carretero", "paul@carretero.ovh", "123456", "47 rue marius charles 38420 Domene");
		System.out.println(u);
		BookJson b1 = new BookJson("genre1", "type1", "author1", 42f, "title1", "picture1", "summary1", 1, 1);
		BookJson b2 = new BookJson("genre2", "type2", "author2", 4242f, "title2", "picture2", "summary2", 2, 2);
		System.out.println("book JSON:");
		System.out.println(b1);
		System.out.println("book list JSON:");
		BookJson[] bt = new BookJson[2];
		bt[0] = b1;
		bt[1] = b2;
		BookListJson bl = new BookListJson(bt);
		System.out.println(bl);
		System.out.println("Cart JSON (response) :");
		Integer[][] tc = new Integer[2][2];
		tc[0][0] = 0; //id
		tc[0][1] = 12; //quantite
		tc[1][0] = 1; //id
		tc[1][1] = 3; //quantite
		//CartJsonResponse c = new CartJsonResponse(tc, bl);
		//System.out.println(c);
	}
}

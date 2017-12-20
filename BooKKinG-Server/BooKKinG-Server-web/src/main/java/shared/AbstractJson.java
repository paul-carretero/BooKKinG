package shared;

import java.io.Serializable;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public abstract class AbstractJson implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID 	= -8060220138682345016L;
	protected static final GsonBuilder	builder	= new GsonBuilder();
	protected static final Gson 		gson 	= builder.create();

	public AbstractJson() {}

	@Override
	public String toString() {
		return gson.toJson(this);
	}
	
	public static Object fromJson(final HttpServletRequest request, final Class<? extends AbstractJson> targetClass) {
		try {
			String requestBody = request.getReader().lines().collect(Collectors.joining());
			return gson.fromJson(requestBody, targetClass);
		} catch (Exception e) {
			System.err.println(e.getMessage());
			return null;
		}
	}
}

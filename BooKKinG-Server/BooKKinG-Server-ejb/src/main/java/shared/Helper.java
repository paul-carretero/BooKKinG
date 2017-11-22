package shared;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Helper {

	public static String getEncodedPwd(final String password, final String salt)
	{
		String toHash = password + salt;
		MessageDigest messageDigest;
		try {
			messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(StandardCharsets.UTF_8.encode(toHash));
			return String.format("%032x", new BigInteger(1, messageDigest.digest()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private static String getMissingSpace(int size) {
		StringBuilder res = new StringBuilder();
		for(int i = 0; i < size; i++) {
			res.append(' ');
		}
		return res.toString();
	}
	
	public static String beautifyString(final String str, final int length) {
		if(str.length() == length) {
			return str;
		}
		else if(str.length() > length) {
			return str.substring(0, length-3) + "...";
		}
		else {
			return str + getMissingSpace(length - str.length());
		}
		
	}
}

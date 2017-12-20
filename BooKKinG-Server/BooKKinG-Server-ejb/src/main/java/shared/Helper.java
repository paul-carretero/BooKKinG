package shared;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * classe statique fournissant des méthodes standards et communes
 */
public class Helper {

	/**
	 * adresse de bookking bordeaux
	 */
	public static final String BORDEAUX = "BooKKinG Bordeaux";
	
	/**
	 * adresse de bookking grenoble
	 */
	public static final String GRENOBLE = "BooKKinG Grenoble";
	
	/**
	 * adresse de bookking paris
	 */
	public static final String PARIS = "BooKKinG Paris";

	/**
	 * hash  SHA 256 avec salt un mot de passe
	 * @param password le mot de passe en clair
	 * @param salt un salt pour le hashage
	 * @return un hash avec salt du mot de passe en clair
	 */
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
	
	/**
	 * @param size une taille constante
	 * @return une chaine de caractère avec le nombre précisé d'espace
	 */
	private static String getMissingSpace(final int size) {
		StringBuilder res = new StringBuilder();
		for(int i = 0; i < size; i++) {
			res.append(' ');
		}
		return res.toString();
	}
	
	/**
	 * standardise la taille d'une chaine de caractères
	 * @param str une chaine de caractère quelconque
	 * @param length une taille de chaine à avoir
	 * @return une chaine de caractère de taille défini avec des espace en fin pour combler
	 */
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
	
	/**
	 * @param address le nom d'un magasin bookking
	 * @return l'adresse du magasin bookking associé à cette adresse
	 */
	public static String getAddress(String address) {
		if(address.equals("PARIS")) {
			return PARIS;
		}
		if(address.equals("BORDEAUX")) {
			return BORDEAUX;
		}
		if(address.equals("GRENOBLE")) {
			return GRENOBLE;
		}
		return address;
	}
	
	/**
	 * @param address une adresse de livraison ou le nom d'un magasin bookking
	 * @return le cout de livraison pour cette adresse
	 */
	public static int getShippingPrice(String address) {
		if(address.equals("PARIS") || address.equals("BORDEAUX") || address.equals("GRENOBLE")) {
			return 0;
		}
		return 5;
	}
}

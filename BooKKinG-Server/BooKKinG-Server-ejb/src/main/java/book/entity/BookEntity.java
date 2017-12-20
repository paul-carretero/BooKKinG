package book.entity;

import java.io.Serializable;
import javax.persistence.*;

import shared.Genre;
import shared.Type;

/**
 * Entity implementation class for Entity: Book
 *
 */
@Entity
@Table(name="Book")

public class BookEntity implements Serializable, BookEntItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3747149389810633609L;
	
	/**
	 * id du livre
	 */
	@Id
	@Column(name="idBook")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idBook;
	
	/**
	 * genre du livre
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="genre")
    private Genre genre;
	
	/**
	 * type du livre
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="booktype")
    private Type type;
	
	/**
	 * auteur du livre
	 */
	@Column(name="author")
    private String author;
	
	/**
	 * résumé du livre
	 */
	@Column(name="summary", length=2048)
    private String summary;
	
	/**
	 * photo de couverture en base64
	 * 8Mb max pour la photo
	 */
	@Column(name="picture", length=8388608)
    private String picture;
	
	/**
	 * le prix du livre
	 */
	@Column(name="price")
    private float price;
	
	/**
	 * le stock du livre
	 */
	@Column(name="stock")
    private int stock;
	
	/**
	 * le titre du livre
	 */
	@Column(name="title")
    private String title;

	/**
	 * default constructor
	 */
	public BookEntity() {
		super();
	}
	
	/**
	 * @param genre
	 * @param type
	 * @param author
	 * @param summary
	 * @param picture
	 * @param price
	 * @param stock
	 * @param title
	 */
	public BookEntity(Genre genre, Type type, String author, String summary, String picture, Float price, int stock,
			String title) {
		super();
		this.genre		= genre;
		this.type 		= type;
		this.author 	= author;
		this.summary 	= summary;
		this.picture 	= picture;
		this.price 		= price;
		this.stock 		= stock;
		this.title 		= title;
	}

	@Override
	public int getIdBook() {
		return this.idBook;
	}

	@Override
	public Genre getGenre() {
		return this.genre;
	}

	@Override
	public Type getType() {
		return this.type;
	}

	@Override
	public String getAuthor() {
		return this.author;
	}

	@Override
	public String getSummary() {
		return this.summary;
	}

	@Override
	public String getPicture() {
		return this.picture;
	}

	@Override
	public float getPrice() {
		return this.price;
	}

	@Override
	public int getStock() {
		return this.stock;
	}
   
	@Override
	public String getTitle() {
		return this.title;
	}

	@Override
	public void removeFromStock(final int value) {
		this.stock -= value;
	}

	/**
	 * met à jour le stock du livre
	 * @param s un nouveau stock
	 */
	public void setStock(final int s) {
		this.stock = s;
	}
}

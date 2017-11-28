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

	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="idBook")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer idBook;
	
	@Enumerated(EnumType.STRING)
	@Column(name="genre")
    private Genre genre;
	
	@Enumerated(EnumType.STRING)
	@Column(name="type")
    private Type type;
	
	@Column(name="author")
    private String author;
	
	@Column(name="summary", length=2048)
    private String summary;
	
	/**
	 * photo de couverture en base64
	 * 8Mb max pour la photo
	 */
	@Column(name="picture", length=8388608)
    private String picture;
	
	@Column(name="price")
    private Float price;
	
	@Column(name="stock")
    private Integer stock;
	
	@Column(name="title")
    private String title;

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
	public BookEntity(Genre genre, Type type, String author, String summary, String picture, Float price, Integer stock,
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
	public Integer getIdBook() {
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
	public Float getPrice() {
		return this.price;
	}

	@Override
	public Integer getStock() {
		return this.stock;
	}
   
	@Override
	public String getTitle() {
		return this.title;
	}
}

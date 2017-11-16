package entities;

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

public class Book implements Serializable {

	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="idBook")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer idUser;
	
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
    private Integer price;
	
	@Column(name="stock")
    private Integer stock;

	public Book() {
		super();
	}
   
}

package command;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import book.entity.BookEntity;
import command.response.CommandJson;
import shared.Genre;
import shared.Type;


public class CommandJsonTest {
	
	private CommandJson commandJson;
	
	
	@Before
	public void setUp() throws Exception {
		this.commandJson = new CommandJson();
	}

	
	@Test
	public void TestSetIdCmd() throws Exception {
		this.commandJson.setIdCmd(2);
		assertTrue(this.commandJson.toString().contains("\"idCmd\":2")); 
	}
	
	
	@Test
	public void TestSetShippingCost() throws Exception {
		this.commandJson.setShippingCost(5);;
		assertTrue(this.commandJson.toString().contains("\"shippingCost\":5")); 
	}
	
	@Test
	public void TestAddCmdEntry() throws Exception {
		Float prix = new Float(5.6);
		BookEntity book = new BookEntity(Genre.DRAMATIQUE, Type.ROMAN, "autheur", "", "", prix, 10, "titre");
		
		this.commandJson.addCmdEntry(book, prix, 3);
		assertTrue(this.commandJson.toString().contains("books\":[{\"genre\":\"DRAMATIQUE\",\"type\":\"ROMAN\",\"author\":\"autheur\",\"price\":5.6,\"title\":\"titre\",\"picture\":\"\",\"summary\":\"\",\"idBook\":0,\"stock\":10"));
	}


	
	
}

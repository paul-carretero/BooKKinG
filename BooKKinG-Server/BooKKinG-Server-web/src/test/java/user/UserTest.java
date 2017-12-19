package user;

import static org.junit.Assert.*;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;


public class UserTest extends Mockito {
	
	private StringWriter stringWriter;
	private StringReader stringReader;
	private PrintWriter writer;
	private BufferedReader reader;

	private HttpServletRequest request = mock(HttpServletRequest.class);       
	private HttpServletResponse response = mock(HttpServletResponse.class);   
	private HttpSession session = mock(HttpSession.class);
	
	@Before
	public void setUp() throws Exception {
		this.stringWriter = new StringWriter();
		this.writer = new PrintWriter(this.stringWriter);
		
		when (this.request.getSession()).thenReturn(this.session);
        when (this.response.getWriter()).thenReturn(this.writer);
	}

	@Test
	public void TestSuccessaddUser() throws Exception {
		String str = "{\"name\":\"Paul Carretero\",\"email\":\"toto@toto.ovh\",\"password\":\"123456\",\"address\":\"47 rue marius charles 38420 Domene\"}";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		when (this.request.getReader()).thenReturn(this.reader);		
		
		new MockedUser().doPost(this.request, this.response);
		this.writer.flush();
		assertTrue(this.stringWriter.toString().contains("{\"success\":true"));
		  
		
	}

	@Test
	public void TestErroraddUser() throws Exception {
		String str = "{\"name\":\"Paul Carretero\",\"email\":\"paul@carretero.ovh\",\"password\":\"123456\",\"address\":\"47 rue marius charles 38420 Domene\"}";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		when (this.request.getReader()).thenReturn(this.reader);		
		
		new MockedUser().doPost(this.request, this.response);
		this.writer.flush();
		assertTrue(this.stringWriter.toString().contains("{\"success\":false"));
		  
		
	}

	
}

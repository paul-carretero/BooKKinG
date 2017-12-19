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

import shared.HttpHelper;


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
	public void TestSuccessAddUser() throws Exception {
		String str = "{\"name\":\"Paul Carretero\",\"email\":\"toto@toto.ovh\",\"password\":\"123456\",\"address\":\"47 rue marius charles 38420 Domene\"}";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		when (this.request.getReader()).thenReturn(this.reader);		
		
		new MockedUser().doPost(this.request, this.response);
		this.writer.flush();
		assertTrue(this.stringWriter.toString().contains("{\"success\":true")); 
	}

	
	@Test
	public void TestErrorAddUser() throws Exception {
		String str = "{\"name\":\"Paul Carretero\",\"email\":\"paul@carretero.ovh\",\"password\":\"123456\",\"address\":\"47 rue marius charles 38420 Domene\"}";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		when (this.request.getReader()).thenReturn(this.reader);		
		
		new MockedUser().doPost(this.request, this.response);
		this.writer.flush();
		assertTrue(this.stringWriter.toString().contains("{\"success\":false"));
	}

	
	@Test
	public void TestSuccessUpDateUser() throws Exception {
		String str = "{\"name\":\"Paul \",\"email\":\"paul@carretero.ovh\",\"password\":\"azerty\",\"address\":\"47 rue marius charles 38420 Domene\"}";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		when (this.request.getReader()).thenReturn(this.reader);		
		when(session.getAttribute("idUser")).thenReturn(42);
		
		new MockedUser().doPut(this.request, this.response);
		this.writer.flush();
		assertTrue(this.stringWriter.toString().contains("{\"success\":true")); 
	}
	
	@Test
	public void TestErrorUpDateUser() throws Exception {
		String str = "{\"name\":\"Paul \",\"email\":\"paul@carretero.ovh\",\"password\":\"azerty\",\"address\":\"47 rue marius charles 38420 Domene\"}";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		when (this.request.getReader()).thenReturn(this.reader);		
		when(session.getAttribute("idUser")).thenReturn(null);
		
		new MockedUser().doPut(this.request, this.response);
		this.writer.flush();
		assertTrue(this.stringWriter.toString().contains("{\"success\":false")); 
	}

	
	@Test
	public void TestSuccessGetUser() throws Exception {
		String str = "{\"name\":\"Paul \",\"email\":\"paul@carretero.ovh\",\"password\":\"azerty\",\"address\":\"47 rue marius charles 38420 Domene\"}";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		when (this.request.getReader()).thenReturn(this.reader);		
		when(session.getAttribute("idUser")).thenReturn(42);
		
		new MockedUser().doGet(this.request, this.response);
		this.writer.flush();
		assertTrue(this.stringWriter.toString().contains("success\":true")); 
	}
	
	@Test
	public void TestErrorGetUser() throws Exception {
		String str = "{\"name\":\"Paul \",\"email\":\"paul@carretero.ovh\",\"password\":\"azerty\",\"address\":\"47 rue marius charles 38420 Domene\"}";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		when (this.request.getReader()).thenReturn(this.reader);		
		when(session.getAttribute("idUser")).thenReturn(null);
		
		new MockedUser().doGet(this.request, this.response);
		this.writer.flush();
		assertTrue(this.stringWriter.toString().contains("success\":false")); 
	}
	
	
}

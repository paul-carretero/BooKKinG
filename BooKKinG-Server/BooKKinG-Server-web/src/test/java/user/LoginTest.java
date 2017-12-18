package user;

import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

public class LoginTest  extends Mockito {
	
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
    public void testNotConnected() throws Exception {
		when (this.session.getAttribute("idUser")).thenReturn(null);
        new Login().doGet(this.request, this.response);
        verify(this.session, atLeast(1)).getAttribute("idUser");
        this.writer.flush();
        assertTrue(this.stringWriter.toString().contains("{\"success\":false,\"message\":\"\""));
    }
	
	@Test
    public void testErrorResetPwd() throws Exception {
		String str = "";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		
        new MockedLogin().doPost(this.request, this.response);
        // verify(this.session, atLeast(1)).getAttribute("idUser");
        this.writer.flush();
        assertTrue(this.stringWriter.toString().contains("{\"success\":false"));
    }
	
	@Test
    public void testSuccessResetPwd() throws Exception {
		String str = "{\"email\":\"paul@carretero.ovh\"}";
		this.stringReader = new StringReader(str);
		this.reader = new BufferedReader(this.stringReader);
		when (this.request.getReader()).thenReturn(this.reader);
		
        new MockedLogin().doPost(this.request, this.response);
        // verify(this.session, atLeast(1)).getAttribute("idUser");
        this.writer.flush();
        System.out.println(this.stringWriter.toString());
        assertTrue(this.stringWriter.toString().contains("{\"success\":true"));
    }


}

package init;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.annotation.PostConstruct;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Startup;

import shared.AbstractBean;


/**
 * Session Bean implementation class InitBean
 */
@Singleton
@LocalBean
@Startup
public class StartUpBean extends AbstractBean {

    /**
     * Default constructor. 
     */
    public StartUpBean() {}
    
    @PostConstruct
    private void initDB() {
		try {
			BufferedReader r = new BufferedReader(new InputStreamReader(StartUpBean.class.getResourceAsStream("import.sql"), "UTF-8"));
			String line;
			while ((line = r.readLine()) != null) {
				if(line.trim().length() > 0) {
					this.manager.createNativeQuery(line).executeUpdate();
				}
			}
		} catch (IOException e) {
			System.err.println(e.getMessage());
		}
    }

}

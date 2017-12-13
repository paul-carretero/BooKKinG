
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertNotNull;

import javax.inject.Inject;

import book.bean.BookBeanLocal;

@RunWith(Arquillian.class)
public class BookTest {
	
	@Inject
	BookBeanLocal bookBean;

    @Deployment
    public static JavaArchive createDeployment() {
        JavaArchive jar = ShrinkWrap.create(JavaArchive.class)
        		.addPackage(BookBeanLocal.class.getPackage())
                .addAsManifestResource(EmptyAsset.INSTANCE, "META-INF/beans.xml");
            System.out.println(jar.toString(true));
            return jar;
    }

    @Test
    public void success() {
    	assertNotNull(this.bookBean);
    }
}
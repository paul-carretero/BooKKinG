package shared;

import org.hibernate.dialect.MySQLDialect;
import org.hibernate.dialect.function.SQLFunctionTemplate;
import org.hibernate.type.IntegerType;


public class RegexpMySQLDialect extends MySQLDialect {
    public RegexpMySQLDialect() {
        super();
        registerFunction("regexp", new SQLFunctionTemplate(IntegerType.INSTANCE, "?1 REGEXP ?2"));
    }
    
    @Override
    public String getTableTypeString() {
        return " DEFAULT CHARSET=utf8";
    }
}
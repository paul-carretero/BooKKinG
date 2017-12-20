package shared;

import org.hibernate.dialect.MySQLDialect;
import org.hibernate.dialect.function.SQLFunctionTemplate;
import org.hibernate.type.IntegerType;


/**
 * dislect custom hibernate, pour extension
 * Défini le charset en utf-8
 */
public class RegexpMySQLDialect extends MySQLDialect {
    /**
     * default constructor
     * ajoute à hibernate la fonctionalité MySQL de recherche par expression régulière
     */
    public RegexpMySQLDialect() {
        super();
        registerFunction("regexp", new SQLFunctionTemplate(IntegerType.INSTANCE, "?1 REGEXP ?2"));
    }
    
    @Override
    public String getTableTypeString() {
        return " DEFAULT CHARSET=utf8";
    }
}
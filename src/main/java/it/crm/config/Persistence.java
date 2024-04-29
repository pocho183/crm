package it.crm.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.eclipse.persistence.config.PersistenceUnitProperties;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.orm.jpa.JpaBaseConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.jpa.vendor.AbstractJpaVendorAdapter;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.jta.JtaTransactionManager;

@Configuration
@EnableTransactionManagement
@PropertySource(value = {"classpath:persistence.properties"})
@EntityScan(basePackages = {"it.crm.domain"})
public class Persistence extends JpaBaseConfiguration {

	@Autowired
	Environment env;
	
	protected Persistence(DataSource dataSource, JpaProperties properties, ObjectProvider<JtaTransactionManager> jtaTransactionManager) {
		super(dataSource, properties, jtaTransactionManager);
	}

	@Override
	protected AbstractJpaVendorAdapter createJpaVendorAdapter() {
		return new EclipseLinkJpaVendorAdapter();
	}

	@Override
	protected Map<String, Object> getVendorProperties() {
		Map<String, Object> prop = new HashMap<>();
		/* Clean cache first level with sharedCache and WEAVING_INTERNAL */
		prop.put("javax.persistence.sharedCache.mode", "NONE");
		prop.put(PersistenceUnitProperties.WEAVING, "static");
		prop.put("javax.persistence.schema-generation.database.action", env.getProperty("spring.datasource.dataTable"));
		prop.put(PersistenceUnitProperties.WEAVING_INTERNAL, Boolean.FALSE.toString());
		if(env.getProperty("spring.datasource.dataTable").equals("drop-and-create") || env.getProperty("spring.datasource.dataTable").equals("create"))
			prop.put("javax.persistence.sql-load-script-source", "file:src/main/resources/initdb.sql");
		return prop;
	}
}

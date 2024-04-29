package it.crm;

import org.burningwave.core.assembler.StaticComponentContainer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;

@SpringBootApplication
public class Starter {

	public static void main(String[] args) {
		StaticComponentContainer.Modules.exportAllToAll();
		var app = new SpringApplication(Starter.class);
		app.addListeners(new ApplicationPidFileWriter("crm.pid"));
		app.run(args);
	}

}
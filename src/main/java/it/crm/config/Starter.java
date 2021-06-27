package it.crm.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;

@SpringBootApplication
public class Starter {

	public static void main(String[] args) {
		var app = new SpringApplication(Starter.class);
		app.addListeners(new ApplicationPidFileWriter("starter.pid"));
		app.run(args);
	}
}
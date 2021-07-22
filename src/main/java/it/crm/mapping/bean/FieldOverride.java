package it.crm.mapping.bean;

import static java.lang.annotation.RetentionPolicy.RUNTIME;
import java.lang.annotation.Retention;

@Retention(RUNTIME)
public @interface FieldOverride {

	FieldBinding origin();
	
	String override();
}
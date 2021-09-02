package it.crm.security.model;

import java.io.Serializable;

import it.crm.domain.Company;
import it.crm.enumerator.RoleTypes;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User implements Serializable {

	private static final long serialVersionUID = 4711226627271438235L;
	
	private Long id;
	private String username;
	private String name;
	private String surname;
	private String email;
	private String company;
	private RoleTypes roles;
}

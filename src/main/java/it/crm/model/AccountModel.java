package it.crm.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.OneToOne;

import it.crm.domain.Company;
import it.crm.enumerator.RoleTypes;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountModel {

	private String name;
	private String surname;
	private String email;
	private String password;
	private String phone;
	private String label;
	private String status;
	@OneToOne(cascade = CascadeType.ALL)
	private Company company;
	private RoleTypes role;
	private Date lastConnection;
}

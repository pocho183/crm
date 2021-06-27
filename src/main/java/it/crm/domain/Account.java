package it.crm.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

import it.crm.enumerator.RoleTypes;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Account extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 7438544473254925603L;
	
	private String username;
	private String name;
	private String surname;
	private String email;
	private String phone;
	private String label;
	private Boolean active;
	@OneToOne(cascade = CascadeType.ALL)
	private Company company;
	private RoleTypes role;
}

package it.crm.domain;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Company extends BaseEntity {

	private static final long serialVersionUID = -3702434523867111846L;
	
	private String name;
	private String email;
	private String phone;
	private String label;
	private Boolean active;
	@OneToOne(mappedBy = "company")
	private Account account;
}

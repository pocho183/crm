package it.crm.domain;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;

import it.crm.enumerator.RoleTypes;
import it.crm.enumerator.StatusType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Account extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 7438544473254925603L;	
	
	private String name;
	private String surname;
	private String email;
	private String password;
	private String phone;
	private String label;
	@Enumerated(EnumType.STRING)
	private StatusType status;
	@ManyToOne
	private Company company;
	@Enumerated(EnumType.STRING)
	private RoleTypes role;
	private Date lastConnection;
	
	@Override
	protected void softRemove(Date deleted) {
		// TODO Auto-generated method stub
	}
}

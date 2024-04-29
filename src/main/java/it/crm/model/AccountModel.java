package it.crm.model;

import java.util.Date;

import it.crm.enumerator.RoleTypes;
import it.crm.enumerator.StatusType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountModel {

	private Long id;
	private String name;
	private String surname;
	private String email;
	private String password;
	private String phone;
	private String label;
	private StatusType status = StatusType.ACTIVE;
	private CompanyModel company;
	private RoleTypes role = RoleTypes.READER;
	private Date lastConnection;
}

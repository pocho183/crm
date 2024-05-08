package it.crm.model;

import java.util.Date;

import it.crm.enumerator.CompanyType;
import it.crm.enumerator.StatusType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyModel {

	private Long id;
	private String name;
	private String email;
	private String phone;
	private String label;
	private StatusType status = StatusType.ACTIVE;
	private Date createdAt;
	private CompanyType companyType;
}

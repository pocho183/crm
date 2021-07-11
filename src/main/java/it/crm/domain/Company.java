package it.crm.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;

import it.crm.enumerator.StatusType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Company extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -3702434523867111846L;
	
	private String name;
	private String email;
	private String phone;
	private String label;
	@Enumerated(EnumType.STRING)
	private StatusType status;
	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
	private List<Account> accounts;
	
	@Override
	protected void softRemove(Date deleted) {
		if(accounts != null)
			accounts.forEach(acc -> acc.setDeleteDate(deleted));
	}
}

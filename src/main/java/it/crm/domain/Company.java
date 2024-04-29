package it.crm.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;

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
	
	@Override
	protected void softRemove(Date deleted) {
//		if(accounts != null)
//			accounts.forEach(acc -> acc.setDeleteDate(deleted));
	}
}

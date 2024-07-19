package it.crm.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import it.crm.enumerator.ResponsabilityTypes;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Responsability extends BaseEntity {

	private static final long serialVersionUID = -2991280414058563775L;
	
	@Enumerated(EnumType.STRING)
	private ResponsabilityTypes responsabilityType;
	@ManyToOne
	private Company company;
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "responsibility_id")
    private List<ResFunction> resFunctions;
	
	public void addResFunctions(ResFunction resFunction) {
		if(this.resFunctions == null)
			this.resFunctions = new ArrayList<>();
		if(!this.resFunctions.contains(resFunction)) {
			this.resFunctions.add(resFunction);
		}
	}
		
	@Override
	protected void softRemove(Date deleted) {

	}
	
}

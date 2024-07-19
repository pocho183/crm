package it.crm.domain;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ResFunction extends BaseEntity {

	private static final long serialVersionUID = -5867618243727021281L;
	
	private Long position;
	private String functionName;
	private String name;
	@Column(length = 2048)
	private String email;
	@Column(length = 2048)
	private String phoneNumber;
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "resFunction_id")
    private List<ResFunction> resFunctions;
	
	
	@Override
	protected void softRemove(Date deleted) {

	}

}

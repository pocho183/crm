package it.crm.model;

import java.util.List;

import it.crm.domain.ResFunction;
import it.manu.mapping.annotation.TypeBinding;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@TypeBinding(binding = ResFunction.class)
public class ResFunctionModel {

	private Long id;
	private Long position;
	private String functionName;
	private String name;
	private String email;
	private String phoneNumber;
    private List<ResFunctionModel> resFunctions;
}

package it.crm.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import it.crm.domain.Responsability;
import it.crm.enumerator.ResponsabilityTypes;
import it.manu.mapping.annotation.TypeBinding;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@TypeBinding(binding = Responsability.class)
public class ResponsabilityModel {

	private Long id;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
	private Date updatedAt;
	private ResponsabilityTypes responsabilityType;
	private List<ResFunctionModel> resFunctions;
	private CompanyModel company;
}

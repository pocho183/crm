package it.crm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.crm.domain.Company;
import it.crm.domain.ResFunction;
import it.crm.domain.Responsability;
import it.crm.enumerator.ResponsabilityTypes;
import it.crm.model.ResponsabilityModel;
import it.crm.repository.CompanyRepository;
import it.crm.repository.ResFunctionRepository;
import it.crm.repository.ResponsabilityRepository;
import it.esinware.mapping.BeanMapper;

@Service
public class ResponsabilityService {

	@Autowired
	private BeanMapper mapper;
	@Autowired
	private ResponsabilityRepository responsabilityRepository;
	@Autowired
    private ResFunctionRepository resFunctionRepository;
	@Autowired
	private CompanyRepository companyRepository;
	
	public List<ResponsabilityModel> saveAll(List<ResponsabilityModel> responsibilities) {
	    List<ResponsabilityModel> savedResponsibilities = new ArrayList<>();
	    for (ResponsabilityModel responsibility : responsibilities) {
	        Optional<Company> company = companyRepository.findById(responsibility.getCompany().getId());
	        if (company.isPresent()) {
	            Responsability resp = mapper.map(responsibility, Responsability.class);
	            resp.setCompany(company.get());
	            Responsability savedResp = responsabilityRepository.save(resp);
	            savedResponsibilities.add(mapper.map(savedResp, ResponsabilityModel.class));
	        }
	    }
	    return savedResponsibilities;
	}
	
	
	public List<ResponsabilityModel> findByCompanyIdAndResponsabilityType(Long id, ResponsabilityTypes responsabilityTypes) {
		List<ResponsabilityModel> loadedResponsibilities = new ArrayList<>();
		List<Responsability> responsability = responsabilityRepository.findByCompanyIdAndResponsabilityType(id, responsabilityTypes);
		if(responsability != null && !responsability.isEmpty())
			loadedResponsibilities.addAll(mapper.map(responsability, Responsability.class, ResponsabilityModel.class));
		return loadedResponsibilities;
	}
	
	public void deleteResponsability(Long id) {
		Optional<ResFunction> resFunction = resFunctionRepository.findById(id);
	    if (resFunction.isPresent()) {
	    	Optional<Responsability> responsability = responsabilityRepository.findByResFunctions(resFunction.get());
	    	resFunctionRepository.deleteById(resFunction.get().getId());
	    	if(responsability.isPresent() && responsability.get().getResFunctions().isEmpty())
	    		responsabilityRepository.deleteById(responsability.get().getId());
	    }
	}

}

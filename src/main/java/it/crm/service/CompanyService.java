package it.crm.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.crm.domain.Company;
import it.crm.enumerator.CompanyType;
import it.crm.exception.ExceptionContext;
import it.crm.exception.ValidateInputException;
import it.crm.model.CompanyModel;
import it.crm.repository.CompanyRepository;
import it.esinware.mapping.BeanMapper;

@Service
public class CompanyService {

	@Autowired
	private BeanMapper mapper;
	@Autowired
	private CompanyRepository companyRepository;
	
	public List<CompanyModel> adminLoadCompanies() {
		List<Company> companies = companyRepository.findAll();
		// Order by createdAt by DESC
		companies.sort((a1,a2) -> a2.getCreatedAt().compareTo(a1.getCreatedAt()));
		return mapper.map(companies, Company.class, CompanyModel.class);
	}
	
	public List<CompanyModel> moderatoreLoadCompanies() {
		List<Company> companies = companyRepository.findByCompanyType(CompanyType.REFERENTE);
		// Order by createdAt by DESC
		companies.sort((a1,a2) -> a2.getCreatedAt().compareTo(a1.getCreatedAt()));
		return mapper.map(companies, Company.class, CompanyModel.class);
	}
	
	public CompanyModel loadCompany(String companyName) {
		Optional<Company> company = companyRepository.findByName(companyName);
		if(company.isPresent())
			return mapper.map(company.get(), CompanyModel.class);
		else
			return null;
	}
	
	public CompanyModel saveCompany(CompanyModel model) {
		Company company = companyRepository.findByNameAndEmail(model.getName(), model.getEmail());
		if(company != null) {
			company = mapper.map(model, Company.class);
			if(company.getId() == null)
				throw new ValidateInputException(ExceptionContext.COMPANY, "Duplicated Company ! ");
		} else {
			company = new Company();
			company = mapper.map(model, Company.class);
		}
		return mapper.map(companyRepository.save(company), CompanyModel.class);
	}
	
	public void deleteCompany(CompanyModel model) {
		Optional<Company> company = companyRepository.findById(model.getId());
		if(company.isPresent()) {
			company.get().setDeleteDate(new Date());
			companyRepository.save(company.get());
		}
	}
}

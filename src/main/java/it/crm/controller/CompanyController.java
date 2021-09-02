package it.crm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.crm.model.CompanyModel;
import it.crm.service.CompanyService;

@RestController
@RequestMapping(path = "company")
public class CompanyController {

	private static final Logger logger = LoggerFactory.getLogger(CompanyController.class);

	@Autowired
	private CompanyService serviceCompany;
	
	@GetMapping(path = "admin/load")
	public ResponseEntity<List<CompanyModel>> loadCompanies() {
		return ResponseEntity.ok(serviceCompany.loadCompanies());
	}
	
	@GetMapping(path = "manager/load/{company}")
	public ResponseEntity<CompanyModel> loadCompany(@PathVariable String company) {
		return ResponseEntity.ok(serviceCompany.loadCompany(company));
	}
	
	@PostMapping(path = "save")
	public ResponseEntity<CompanyModel> companySave(@RequestBody CompanyModel company) {
		logger.debug("Saving company: " + company.getEmail());
		return ResponseEntity.ok(serviceCompany.saveCompany(company));
	}
	
	@PostMapping(path = "delete")
	public ResponseEntity<Boolean> companyDelete(@RequestBody CompanyModel model) {
		logger.debug("Deleting company: " + model.getName());
		serviceCompany.deleteCompany(model);
		return ResponseEntity.ok(true);
	}
}

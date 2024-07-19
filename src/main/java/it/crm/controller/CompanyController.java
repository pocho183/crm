package it.crm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
	
	@GetMapping(path = "/load/{company}")
	public ResponseEntity<CompanyModel> loadCompany(@PathVariable("company") String company) {
		return new ResponseEntity<CompanyModel>(serviceCompany.loadCompany(company), HttpStatus.OK);
	}
	
	@PostMapping(path = "save")
	public ResponseEntity<CompanyModel> companySave(@RequestBody CompanyModel company) {
		logger.debug("Saving company: " + company.getEmail());
		return new ResponseEntity<CompanyModel>(serviceCompany.saveCompany(company),  HttpStatus.CREATED);	
	}
	
	@PostMapping(path = "delete")
	public ResponseEntity<Void> companyDelete(@RequestBody CompanyModel model) {
		logger.debug("Deleting company: " + model.getName());
		serviceCompany.deleteCompany(model);
		return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
	}
}

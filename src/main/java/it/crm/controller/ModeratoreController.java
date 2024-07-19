package it.crm.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.crm.enumerator.ResponsabilityTypes;
import it.crm.model.AccountModel;
import it.crm.model.CompanyModel;
import it.crm.model.ResponsabilityModel;
import it.crm.service.AccountService;
import it.crm.service.CompanyService;
import it.crm.service.ResponsabilityService;

@RestController
@RequestMapping(path = "moderatore")
public class ModeratoreController {

	private static final Logger logger = LoggerFactory.getLogger(ModeratoreController.class);

	@Autowired
	private AccountService serviceAccount;
	@Autowired
	private CompanyService serviceCompany;
	@Autowired
	private ResponsabilityService serviceResponsability;
	
	@GetMapping(path = "account/load/{company}")
	public ResponseEntity<List<AccountModel>> loadAccounts(@PathVariable("company") String company) {
		return new ResponseEntity<List<AccountModel>>(serviceAccount.moderatoreLoadAccounts(company), HttpStatus.OK);
	}

	@GetMapping(path = "company/load")
	public ResponseEntity<List<CompanyModel>> loadCompanies() {
		return new ResponseEntity<List<CompanyModel>>(serviceCompany.moderatoreLoadCompanies(), HttpStatus.OK);
	}
	
	@PostMapping(path = "responsability/save")
	public ResponseEntity<List<ResponsabilityModel>> createResponsibilities(@RequestBody List<ResponsabilityModel> responsibilities) {
	    List<ResponsabilityModel> savedResponsibilities = serviceResponsability.saveAll(responsibilities);
	    return ResponseEntity.ok(savedResponsibilities);
	}

    @PostMapping(path = "responsability/load")
    public ResponseEntity<List<ResponsabilityModel>> getAllResponsibilities(@RequestParam("id") Long id, @RequestParam("responsabilityTypes") ResponsabilityTypes responsabilityTypes) {
    	List<ResponsabilityModel> responsibility = serviceResponsability.findByCompanyIdAndResponsabilityType(id, responsabilityTypes);
        return ResponseEntity.ok(responsibility);
    }
    
    @PostMapping(path = "responsability/delete")
	public ResponseEntity<Void> responsabilityDelete(@RequestParam("id") Long id) {
		logger.debug("Deleting responsability: " + id);
		serviceResponsability.deleteResponsability(id);
		return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
	}
}

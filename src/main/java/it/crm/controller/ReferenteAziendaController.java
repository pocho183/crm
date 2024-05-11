package it.crm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import it.crm.model.AccountModel;
import it.crm.model.CompanyModel;
import it.crm.service.AccountService;
import it.crm.service.CompanyService;

@RestController
@RequestMapping(path = "referenteazienda")
public class ReferenteAziendaController {

	private static final Logger logger = LoggerFactory.getLogger(ReferenteAziendaController.class);

	@Autowired
	private AccountService serviceAccount;
	@Autowired
	private CompanyService serviceCompany;
	
	@GetMapping(path = "account/load/{company}")
	@ResponseBody
	public ResponseEntity<List<AccountModel>> loadAccounts(@PathVariable("company") String company) {
		return new ResponseEntity<List<AccountModel>>(serviceAccount.referenteAziendaLoadAccounts(company), HttpStatus.OK);
	}
	
	@GetMapping(path = "company/load")
	public ResponseEntity<List<CompanyModel>> loadCompanies() {
		return new ResponseEntity<List<CompanyModel>>(serviceCompany.adminLoadCompanies(), HttpStatus.OK);
	}
}

package it.crm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.crm.model.AccountModel;
import it.crm.service.AccountService;

@RestController
@RequestMapping(path = "account")
public class AccountController {

	private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

	@Autowired
	private AccountService serviceAccount;
	
	@PostMapping(path = "save")
	public ResponseEntity<AccountModel> accountSave(@RequestBody AccountModel account) {
		logger.debug("Saving account: " + account.getEmail());
		return ResponseEntity.ok(serviceAccount.saveAccount(account));
	}
	
	@GetMapping(path = "load")
	public ResponseEntity<List<AccountModel>> loadAccounts() {
		return ResponseEntity.ok(serviceAccount.loadAccounts());
	}
	
	@PostMapping(path = "delete")
	public ResponseEntity<Boolean> accountDelete(@RequestBody AccountModel model) {
		logger.debug("Deleting account: " + model.getEmail());
		serviceAccount.deleteAccount(model);
		return ResponseEntity.ok(true);
	}
}

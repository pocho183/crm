package it.crm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.crm.model.AccountModel;
import it.crm.model.CompanyModel;
import it.crm.security.model.User;
import it.crm.service.AccountService;

@RestController
@RequestMapping(path = "account")
public class AccountController {

	private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

	@Autowired
	private AccountService serviceAccount;
	
	@GetMapping(path = "admin/load")
	public ResponseEntity<List<AccountModel>> loadAccounts() {
		return ResponseEntity.ok(serviceAccount.adminLoadAccounts());
	}
	
	@PostMapping(path = "manager/load")
	public ResponseEntity<List<AccountModel>> accountSave(@RequestBody User user) {
		return ResponseEntity.ok(serviceAccount.managerLoadAccounts(user));
	}
	
	@PostMapping(path = "save")
	public ResponseEntity<AccountModel> accountSave(@RequestBody AccountModel account) {
		logger.debug("Saving account: " + account.getEmail());
		try {
			return ResponseEntity.ok(serviceAccount.saveAccount(account));
		} catch(Exception ex) {
			logger.error(ex.getMessage() + " " + account.getEmail());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).header("Message", ex.getMessage()).header("Context", "Saving Account").build();
		}
	}
	
	@PostMapping(path = "delete")
	public ResponseEntity<Boolean> accountDelete(@RequestBody AccountModel model) {
		logger.debug("Deleting account: " + model.getEmail());
		serviceAccount.deleteAccount(model);
		return ResponseEntity.ok(true);
	}
}

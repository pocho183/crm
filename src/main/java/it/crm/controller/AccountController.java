package it.crm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.crm.model.AccountModel;
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
		return new ResponseEntity<List<AccountModel>>(serviceAccount.adminLoadAccounts(), HttpStatus.OK);
	}
	
	@PostMapping(path = "manager/load")
	public ResponseEntity<List<AccountModel>> accountSave(@RequestBody User user) {
		return new ResponseEntity<List<AccountModel>>(serviceAccount.managerLoadAccounts(user), HttpStatus.OK);
	}
	
	@PostMapping(path = "save")
	public ResponseEntity<AccountModel> accountSave(@RequestBody AccountModel account) {
		logger.debug("Saving account: " + account.getEmail());
		return new ResponseEntity<AccountModel>(serviceAccount.saveAccount(account),  HttpStatus.CREATED);		
	}
	
	@PostMapping(path = "delete")
	public ResponseEntity<Void> accountDelete(@RequestBody AccountModel model) {
		logger.debug("Deleting account: " + model.getEmail());
		UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		serviceAccount.deleteAccount(model, userDetails);
		return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
	}
}

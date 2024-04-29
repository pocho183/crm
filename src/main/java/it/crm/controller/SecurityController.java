package it.crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import it.crm.domain.Account;
import it.crm.enumerator.StatusType;
import it.crm.security.TokenHelper;
import it.crm.security.model.User;
import it.crm.service.AccountService;
import it.crm.service.SecurityService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class SecurityController {

	@Autowired
	private SecurityService service;
	@Autowired
	private TokenHelper tokenHelper;
	@Autowired
	private AccountService accountService;
	
	@PostMapping(path = "/login")
	public ResponseEntity<LoginResponse> login(@RequestParam("username") String username, @RequestParam("password") String password) {
		User user = service.login(username, password);
		if(user != null) {
			String token = tokenHelper.createToken(user);
			Account account = accountService.getAccount(user);
			if(account.getStatus() == StatusType.SUSPENDED)
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			else {
				accountService.saveLastConnection(account);
				return ResponseEntity.ok().body(new LoginResponse(token));
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
	
	@GetMapping(path = "/logout")
	public ResponseEntity<Boolean> logout() {
		SecurityContextHolder.getContext().setAuthentication(null);
		SecurityContextHolder.clearContext();
		return ResponseEntity.ok().body(Boolean.TRUE);
	}
	
	@PostMapping(path = "/authenticate")
	public ResponseEntity<LoginResponse> authenticate(@RequestParam String token) {
		try {
			User user = service.authenticate(token);
			if(user != null) {
				String jwtToken = tokenHelper.createToken(user);
				return ResponseEntity.ok().body(new LoginResponse(jwtToken));
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	private static class LoginResponse {

		public String token;
	
	    public LoginResponse(final String token) {
	        this.token = token;
	    }
	}
}


package it.crm.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import it.crm.domain.Account;
import it.crm.enumerator.RoleTypes;
import it.crm.repository.AccountRepository;
import it.crm.security.model.User;
import lombok.Getter;
import lombok.Setter;

@Service
public class SecurityService implements UserDetailsService {
	
	private Logger logger = LoggerFactory.getLogger(SecurityService.class);

	@Value(value = "${camerassoHost:nothing}")
	private String cameraSSO;
	@Value(value = "${app.code}")
	private String applicationCode;
	@Autowired
	private ObjectMapper jsonObjectMapper;
	@Autowired
	private AccountRepository accountRepository;
	
    public SecurityService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
	
	public User login(String username, String password) {
		try {
			Account credentials = accountRepository.findByEmailAndPassword(username, password);
			SSOUser remoteUser = new SSOUser();
			remoteUser.setId(credentials.getId());
			remoteUser.setName(credentials.getName());
			remoteUser.setSurname(credentials.getSurname());
			remoteUser.setEmail(credentials.getEmail());
			remoteUser.setUsername(credentials.getEmail());
			remoteUser.setRole(credentials.getRole());
			if(credentials.getCompany() != null && credentials.getCompany().getName() != null)
				remoteUser.setCompany(credentials.getCompany().getName());
			return createUser(remoteUser);
		} catch(Exception e) {
			logger.error("Login not authorized !");
		}
		return null;
	}
	
	public User authenticate(String token) throws JsonMappingException, JsonProcessingException {
		Claims claims = decodeJWT(token);
		SSOUser remoteUser = jsonObjectMapper.readValue(claims.get("user").toString(), SSOUser.class);
		return createUser(remoteUser);
	}
	
	private static Claims decodeJWT(String jwt) {
	    Claims claims = Jwts.parser().parseClaimsJws(jwt).getBody();
	    return claims;
	}

	private User createUser(SSOUser remoteUser) {
		User user = new User();
		user.setName(remoteUser.name);
		user.setSurname(remoteUser.surname);
		user.setEmail(remoteUser.email);
		user.setUsername(remoteUser.username);
		user.setRoles(remoteUser.role);
		user.setCompany(remoteUser.company);
		return user;
	}

	@Getter
	@Setter
	public static class SSOUser {
		public Long id;
		public Long applicationId;
		public String username;
		public String name;
		public String surname;
		public String email;
		public boolean enabled;
		public ApplicationModel current;
		public RoleTypes role;
		public String company;
	}

	public static class ApplicationModel {
		public String code;
		public String label;
		public String url;
		public List<ActionModel> actions = new ArrayList<ActionModel>();
		public List<MenuModel> menus = new ArrayList<MenuModel>();
	}

	public static class ActionModel {
		public String label;
		public String url;
	}

	public static class MenuModel extends ActionModel {
		public String icon;
		public List<MenuModel> children;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account credential = accountRepository.findByEmail(username);
		if (credential == null) {
	        throw new UsernameNotFoundException(username);
	    }
	    return new User(credential.getEmail());
	}

}
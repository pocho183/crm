package it.crm.config;

import java.util.ArrayList;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

@Configuration
public class RequestHeaderAuthenticationProvider implements AuthenticationProvider {
    
	@Value("${jwt.secret}")
	private String authSecret;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
       String authSecretKey = String.valueOf(authentication.getPrincipal());

       if(StringUtils.isBlank(authSecretKey) || !authSecretKey.equals(authSecret)) {
           throw new BadCredentialsException("Bad Request Header Credentials");
       }
       return new PreAuthenticatedAuthenticationToken(authentication.getPrincipal(), null, new ArrayList<>());
	}

	@Override
	public boolean supports(Class<?> authentication) {
	    return authentication.equals(PreAuthenticatedAuthenticationToken.class);
	}
}
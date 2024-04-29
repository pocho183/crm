package it.crm.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import it.crm.service.SecurityService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class TokenAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	@Value("${jwt.header}")
	private String AUTH_HEADER;
	@Autowired
	TokenHelper tokenHelper;
	@Autowired
	SecurityService securityService;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String error = "";
		String authToken = ((HttpServletRequest)request).getHeader(AUTH_HEADER);
		if(authToken != null) {
			String username = tokenHelper.getUsernameFromToken(authToken);
			if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = securityService.loadUserByUsername(username);
				if(tokenHelper.validateToken(authToken, userDetails)) {
					TokenBasedAuthentication authentication = new TokenBasedAuthentication(userDetails);
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails((HttpServletRequest)request));
					SecurityContextHolder.getContext().setAuthentication(authentication);
					((HttpServletResponse)response).setHeader(AUTH_HEADER, tokenHelper.refreshToken(authToken));
				}
			}
		}
		if(!error.equals("")) {
			System.out.println(error);
		}
		filterChain.doFilter(request, response);
	}
}
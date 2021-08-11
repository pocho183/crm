package it.crm.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import it.crm.security.TokenAuthenticationFilter;
import it.crm.security.TokenHelper;

@Configuration
@EnableWebSecurity
@ComponentScan(basePackageClasses = TokenHelper.class)
@PropertySource(value = {"classpath:/security.properties"})
public class Security extends WebSecurityConfigurerAdapter {

	@Autowired
  private UserDetailsService userDetailsService;
  @Autowired
  private AuthenticationEntryPoint authenticationEntryPoint;

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public TokenAuthenticationFilter jwtAuthenticationTokenFilter() throws Exception {
		TokenAuthenticationFilter tokenFilter = new TokenAuthenticationFilter();
		tokenFilter.setAuthenticationManager(authenticationManagerBean());
		return tokenFilter;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
					.authorizeRequests().anyRequest().authenticated()
					.and().formLogin().disable().logout().disable().anonymous().disable().csrf().disable().exceptionHandling()
          .authenticationEntryPoint(authenticationEntryPoint).and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}
	
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Autowired
  public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
      authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(this.bCryptPasswordEncoder());
  }

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(HttpMethod.GET, "/**", "/favicon.ico").and().ignoring()
		.antMatchers(HttpMethod.POST, "/login", "/company/**", "/account/**").and().ignoring()
		.antMatchers(HttpMethod.OPTIONS, "/**");
		//web.ignoring().antMatchers("/**").antMatchers(HttpMethod.OPTIONS, "/**");
	}
		
}
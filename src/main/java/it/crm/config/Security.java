package it.crm.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import it.crm.repository.AccountRepository;
import it.crm.security.TokenAuthenticationFilter;
import it.crm.service.SecurityService;

@Configuration
@EnableWebSecurity
//@ComponentScan(basePackageClasses = TokenHelper.class)
@PropertySource(value = {"classpath:/security.properties"})
public class Security {

	@Autowired
	private AccountRepository accountRepository;
	
	@Bean
	public UserDetailsService userDetailsService(AccountRepository accountRepository) {
		return new SecurityService(accountRepository);
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
	    return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable());
		http.authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
    		.requestMatchers(HttpMethod.GET, "/logout", "/**", "/favicon.ico").permitAll()
    		.requestMatchers(HttpMethod.POST,"/login", "/logout", "/company/**", "/account/**").permitAll()
    		.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll());
//				.requestMatchers("/**").permitAll());
            //.requestMatchers("/api/**").authenticated());
		http.authenticationProvider(authenticationProvider());
		http.addFilterBefore(jwtAuthenticationTokenFilter(http), UsernamePasswordAuthenticationFilter.class);
		http.sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));    	   	
	    //http.formLogin(formLogin -> formLogin .loginPage("/login") .permitAll());
	    //http.logout(logout -> logout .logoutUrl("/logout") .logoutSuccessUrl("/logout"));
		http.logout(logout -> logout .logoutUrl("/logout").invalidateHttpSession(true).logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)));	
		return http.build();
	}
	
	@Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService(accountRepository));
        authProvider.setPasswordEncoder(bCryptPasswordEncoder());
        return authProvider;
    }
	
	@Bean
	public TokenAuthenticationFilter jwtAuthenticationTokenFilter(HttpSecurity http) throws Exception {
		TokenAuthenticationFilter tokenFilter = new TokenAuthenticationFilter();
		tokenFilter.setAuthenticationManager(authenticationManager(http));
		return tokenFilter;
	}
	
	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
	    return http.getSharedObject(AuthenticationManagerBuilder.class).build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
	    return (web) -> web.ignoring().requestMatchers("/images/**", "/js/**", "/webjars/**");
	}
}
	
//	SOLUTION 2
	
//	@Autowired
//	private SecurityService securityService;
//	@Autowired
//	private RequestHeaderAuthenticationProvider requestHeaderAuthenticationProvider;
//
//    // Configuring HttpSecurity
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        return http
//        		.cors(cors -> cors.disable())
//        		.csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> auth.requestMatchers("/login").permitAll())
//                .authorizeHttpRequests(auth -> auth.requestMatchers("/auth/user/**").authenticated())
//                .authorizeHttpRequests(auth -> auth.requestMatchers("/auth/admin/**").authenticated())
//                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authenticationProvider(authenticationProvider())
//                .addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
//                .build();
//    }
//
//    @Bean
//    public AuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
//        authenticationProvider.setUserDetailsService(securityService);
//        authenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());
//        return authenticationProvider;
//    }
//    
//    @Bean
//	public TokenAuthenticationFilter jwtAuthenticationTokenFilter() throws Exception {
//		TokenAuthenticationFilter tokenFilter = new TokenAuthenticationFilter();
//		tokenFilter.setAuthenticationManager(authenticationManagerBean());
//		return tokenFilter;
//	}
//    
//    @Bean
//    protected AuthenticationManager authenticationManagerBean() {
//    	return new ProviderManager(Collections.singletonList(requestHeaderAuthenticationProvider));
//    }
//    
//  	@Bean
//	public BCryptPasswordEncoder bCryptPasswordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
	
  	// SOLUTION 1
  	
  	
//    @Autowired
//    private SecurityService securityService;
//    @Autowired
//    private RequestHeaderAuthenticationProvider requestHeaderAuthenticationProvider;
//    @Autowired
//    private AuthenticationEntryPoint authenticationEntryPoint;
//    @Value("${jwt.secret}")
//	private String authSecret;
//    @Autowired
//    private AccountRepository accountRepository;
        
//    @Bean
//    public UserDetailsService userDetailsService(AccountRepository accountRepository) {
//        return new SecurityService(accountRepository);
//    }
//   
//    @Bean
//    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
//        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
//        authenticationManagerBuilder.userDetailsService(securityService).passwordEncoder(this.bCryptPasswordEncoder());
//        return authenticationManagerBuilder.build();
//    }
//    
//    @Bean
//	public BCryptPasswordEncoder bCryptPasswordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//    
//    @Bean
//	public TokenAuthenticationFilter jwtAuthenticationTokenFilter() throws Exception {
//		TokenAuthenticationFilter tokenFilter = new TokenAuthenticationFilter();
//		tokenFilter.setAuthenticationManager(authenticationManagerBean());
//		return tokenFilter;
//	}
//    
//    @Bean
//    protected AuthenticationManager authenticationManagerBean() {
//        return new ProviderManager(Collections.singletonList(requestHeaderAuthenticationProvider));
//    }
//    
//    @Bean
//    public RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter() {
//        RequestHeaderAuthenticationFilter filter = new RequestHeaderAuthenticationFilter();
//        filter.setPrincipalRequestHeader(authSecret);
//        filter.setExceptionIfHeaderMissing(false);
//        //filter.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/**"));
//        filter.setAuthenticationManager(authenticationManagerBean());
//        return filter;
//    }
    
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//       http
//       	.cors(cors -> cors.disable())
//       	//.cors(Customizer.withDefaults())
//       	//.csrf().disable()
//       	.csrf(AbstractHttpConfigurer::disable)
//       	//.addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
//       	.sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))      	
//       	//.addFilterAfter(requestHeaderAuthenticationFilter(), HeaderWriterFilter.class)
//        .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
//        		.requestMatchers(HttpMethod.GET, "/**", "/favicon.ico").permitAll()
//        		.requestMatchers(HttpMethod.POST,"/login", "/company/**", "/account/**").permitAll()
//        		.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
//                .requestMatchers("/api/**").authenticated())
//       .exceptionHandling(httpSecurityExceptionHandlingConfigurer -> 
//       		httpSecurityExceptionHandlingConfigurer.authenticationEntryPoint((request, response, authException) -> 
//       			response.sendError(HttpServletResponse.SC_UNAUTHORIZED)));
//        return http.build();
//    }

    
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.addAllowedOrigin("*");
//        configuration.addAllowedMethod("*");
//        configuration.addAllowedHeader("*");
//        configuration.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

//}

package it.crm.security.model;

import java.io.Serializable;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import it.crm.enumerator.RoleTypes;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User implements UserDetails, Serializable {

	private static final long serialVersionUID = 4711226627271438235L;
	
	private Long id;
	private String username;
	private String name;
	private String surname;
	private String email;
	private String company;
	private RoleTypes roles;
	
	public User() {
		super();
	}
	
	public User(String username) {
		super();
		this.username = username;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}
}

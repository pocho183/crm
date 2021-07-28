package it.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.crm.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	public Account findByEmailAndPassword(String email, String password);

}

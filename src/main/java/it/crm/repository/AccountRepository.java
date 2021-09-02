package it.crm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.crm.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	public Account findByEmailAndPassword(String email, String password);
	
	public Account findByEmail(String email);
	
	@Query("select a from Account a where a.company.name = ?1")
	public List<Account> findByCompany(@Param("company") String company);

}
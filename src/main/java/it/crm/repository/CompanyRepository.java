package it.crm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.crm.domain.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>{

	public Optional<Company> findByName(@Param("name") String name);
	
	public Company findByNameAndEmail(@Param("name") String name, @Param("email") String email);
}

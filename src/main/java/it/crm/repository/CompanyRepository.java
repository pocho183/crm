package it.crm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.crm.domain.Company;
import it.crm.enumerator.CompanyType;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>{

	public Optional<Company> findByName(@Param("name") String name);
	
	public List<Company> findByCompanyType(@Param("companyType") CompanyType companyType);
	
	public Company findByNameAndEmail(@Param("name") String name, @Param("email") String email);
}

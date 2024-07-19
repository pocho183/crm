package it.crm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.crm.domain.Company;
import it.crm.enumerator.CompanyType;
import it.crm.enumerator.StatusType;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>{

	public Optional<Company> findByName(@Param("name") String name);
	
	public List<Company> findByCompanyType(@Param("companyType") CompanyType companyType);
	
	public List<Company> findByCompanyTypeAndStatus(@Param("companyType") CompanyType companyType, @Param("statusType") StatusType statusType);
	
	public Company findByNameAndEmail(@Param("name") String name, @Param("email") String email);
}

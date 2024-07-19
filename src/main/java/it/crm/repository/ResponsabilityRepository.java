package it.crm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.crm.domain.ResFunction;
import it.crm.domain.Responsability;
import it.crm.enumerator.ResponsabilityTypes;

@Repository
public interface ResponsabilityRepository extends JpaRepository<Responsability, Long> {

	public List<Responsability> findByCompanyId(@Param("id") Long id);
	
	public List<Responsability> findByCompanyIdAndResponsabilityType(@Param("id") Long id, @Param("ResponsabilityTypes") ResponsabilityTypes responsabilityTypes);
	
	public Optional<Responsability> findByResFunctions(ResFunction resFunction);
	
}

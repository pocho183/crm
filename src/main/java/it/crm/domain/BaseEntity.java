package it.crm.domain;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = true)
public abstract class BaseEntity extends LogicalRemovableEntity implements Serializable {

	private static final long serialVersionUID = 5458933851159037180L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "created_at", updatable = false, nullable = false)
    private Date createdAt;
    @Column(name = "updated_at")
    private Date updatedAt;
    
    @PrePersist
	public void createdAt() {
    	createdAt = new Date();
	}
	
	@PreUpdate
	public void updatedAt() {
		updatedAt = new Date();
	}
}

package it.crm.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

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

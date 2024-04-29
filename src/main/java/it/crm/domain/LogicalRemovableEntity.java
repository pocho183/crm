package it.crm.domain;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import org.eclipse.persistence.annotations.AdditionalCriteria;

import lombok.EqualsAndHashCode;
import lombok.Getter;


@MappedSuperclass
@AdditionalCriteria("this.deleted is null")
@Getter
@EqualsAndHashCode(of = "deleted")
public abstract class LogicalRemovableEntity implements Serializable {

	private static final long serialVersionUID = -8524828048504103501L;

	@Temporal(TemporalType.TIMESTAMP)
	protected Date deleted;

	public void setDeleteDate(Date deleted) {
		this.deleted = deleted;
		softRemove(this.deleted);
	}

	protected abstract void softRemove(Date deleted);
}

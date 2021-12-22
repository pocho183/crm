package it.crm.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidateInputException extends RuntimeException {

	private static final long serialVersionUID = 3965853634174615219L;

	private String errorCode;
	private String errorMessage;

	public ValidateInputException(String errorCode, String errorMessage) {
		super();
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}
}

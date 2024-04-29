package it.crm.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmptyInputException extends RuntimeException {

	private static final long serialVersionUID = 5535893807794194995L;
	
	private String errorCode;
	private String errorMessage;

	public EmptyInputException(String errorCode, String errorMessage) {
		super();
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}
}

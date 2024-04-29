package it.crm.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidateInputException extends RuntimeException {

	private static final long serialVersionUID = 3965853634174615219L;

	private ExceptionContext context;
	private String message;

	public ValidateInputException(ExceptionContext context, String message) {
		super();
		this.context = context;
		this.message = message;
	}
	
	/* Avoid to log the stacktrace to the client */
	@Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }	

}

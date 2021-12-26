package it.crm.exception;

import java.util.ArrayList;
import java.util.List;

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
	
	public List<String> customStackTrace() {
	    StackTraceElement[] trace = super.getStackTrace();
	    List<String> stack = new ArrayList<>();
	    for (int i = 0; i < trace.length; i++) {
	    	stack.add(trace[i].toString());
	    }
	    return stack;
	}

}

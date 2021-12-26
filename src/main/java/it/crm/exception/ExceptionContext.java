package it.crm.exception;

import lombok.Getter;

@Getter
public enum ExceptionContext {

	ACCOUNT("100"),
	COMPANY("200");
	
	private final String code;
	
	private ExceptionContext(String code) {
		this.code = code;
	}
}

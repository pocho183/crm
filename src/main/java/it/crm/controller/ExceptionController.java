package it.crm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import it.crm.exception.EmptyInputException;
import it.crm.exception.ValidateInputException;

@ControllerAdvice
public class ExceptionController {

	private static final Logger logger = LoggerFactory.getLogger(ExceptionController.class);
	
	@ExceptionHandler(ValidateInputException.class)
	public ResponseEntity<ValidateInputException> handleValidate(ValidateInputException validate) {
		return new ResponseEntity<ValidateInputException>(validate, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(EmptyInputException.class)
	public ResponseEntity<String> handleEmpty(EmptyInputException empty) {
		return new ResponseEntity<String>(empty.getErrorMessage(), HttpStatus.BAD_REQUEST);
	}
}

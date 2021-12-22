package it.crm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import it.crm.exception.EmptyInputException;
import it.crm.exception.ValidateInputException;

@ControllerAdvice
public class ExceptionController {

	@ExceptionHandler(ValidateInputException.class)
	public ResponseEntity<String> handleValidate(ValidateInputException validate) {
		return new ResponseEntity<String>("Invalid input field, please check data", HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(EmptyInputException.class)
	public ResponseEntity<String> handleEmpty(EmptyInputException empty) {
		return new ResponseEntity<String>("Input field is empty, please check into it", HttpStatus.BAD_REQUEST);
	}
}

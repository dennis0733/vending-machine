package com.dennis.Vending.Machine.API.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

public class InsufficientMoneyAdvice {

    @ExceptionHandler(InsufficientMoneyException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> exceptionHandler(InsufficientMoneyException exception){
        Map<String,String> errorMap= new HashMap<>();
        errorMap.put("errorMessage",exception.getMessage());

        return errorMap;
    }
}

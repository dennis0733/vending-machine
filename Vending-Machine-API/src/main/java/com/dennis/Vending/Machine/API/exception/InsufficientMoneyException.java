package com.dennis.Vending.Machine.API.exception;

public class InsufficientMoneyException extends RuntimeException {

    public InsufficientMoneyException(){
        super("Insufficient Balance");
    }
}

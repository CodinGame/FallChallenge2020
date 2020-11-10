package com.codingame.game;

@SuppressWarnings("serial")
public class InvalidInputException extends Exception {
    private final String expected;
    private final String got;

    public InvalidInputException(String expected, String got) {
        super("Invalid Input: Expected " + expected + " but got '" + got + "'");
        this.expected = expected;
        this.got = got;
    }

    public String getExpected() {
        return expected;
    }

    public String getGot() {
        return got;
    }

}

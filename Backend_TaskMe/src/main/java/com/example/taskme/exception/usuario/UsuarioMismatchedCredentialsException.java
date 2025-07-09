package com.example.taskme.exception.usuario;

public class UsuarioMismatchedCredentialsException extends RuntimeException {
    public UsuarioMismatchedCredentialsException(String message) {
        super(message);
    }
}

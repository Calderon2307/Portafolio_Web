package com.example.taskme.exception.usuario;

public class UsuarioAlredyExitsException extends RuntimeException {
    public UsuarioAlredyExitsException(String message) {
        super(message);
    }
}

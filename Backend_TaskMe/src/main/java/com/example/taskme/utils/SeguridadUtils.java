package com.example.taskme.utils;

import com.example.taskme.config.UserPrincipal;
import com.example.taskme.exception.usuario.UsuarioNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SeguridadUtils {

    public static UserPrincipal getUsuarioActual() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !(auth.getPrincipal() instanceof UserPrincipal)) {
            throw new UsuarioNotFoundException("No se pudo obtener el usuario autenticado.");
        }
        return (UserPrincipal) auth.getPrincipal();
    }

    public static boolean esTasker() {
        return getUsuarioActual().esTasker();
    }

    public static boolean esCliente() {
        return !getUsuarioActual().esTasker();
    }

    public static Long getIdUsuario() {
        return getUsuarioActual().getId();
    }

    public static String getCorreoUsuario() {
        return getUsuarioActual().getUsername();
    }
}

package com.example.taskme.exception;

import com.example.taskme.dto.response.ApiErrorResponse;
import com.example.taskme.exception.categoria.CategoriaNotFoundException;
import com.example.taskme.exception.categoria.DuplicateCategoriaException;
import com.example.taskme.exception.resena.ResenaInvalidQualificationException;
import com.example.taskme.exception.resena.ResenaNotFoundException;
import com.example.taskme.exception.taskerCategoria.TaskerCategoriaAssignmentException;
import com.example.taskme.exception.taskerCategoria.TaskerCategoriaLimitCategoriasReachedException;
import com.example.taskme.exception.taskerCategoria.TaskerCategoriaNotFoundException;
import com.example.taskme.exception.trabajo.TrabajoEstadoNotValidException;
import com.example.taskme.exception.trabajo.TrabajoNotFoundException;
import com.example.taskme.exception.trabajoPrevio.TrabajoPrevioNotFoundException;
import com.example.taskme.exception.ubicacion.UbicacionDuplicateException;
import com.example.taskme.exception.ubicacion.UbicacionNotFoundException;
import com.example.taskme.exception.usuario.UsuarioAlredyExitsException;
import com.example.taskme.exception.usuario.UsuarioMismatchedCredentialsException;
import com.example.taskme.exception.usuario.UsuarioNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDate;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
    // Excepciones de Categoria
    @ExceptionHandler(DuplicateCategoriaException.class)
    public ResponseEntity<ApiErrorResponse> handleDuplicateCategoriaException(DuplicateCategoriaException e) {
        return buildErrorResponse(e, HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(CategoriaNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleCategoriaNotFoundException(CategoriaNotFoundException e) {
        return buildErrorResponse(e, HttpStatus.NOT_FOUND, e.getMessage());
    }

    //Excepciones de Ubicacion
    @ExceptionHandler(UbicacionDuplicateException.class)
    public ResponseEntity<ApiErrorResponse> handleUbicacionDuplicateException(UbicacionDuplicateException e) {
        return buildErrorResponse(e, HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(UbicacionNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleUbicacionNotFoundException(UbicacionNotFoundException e) {
        return buildErrorResponse(e, HttpStatus.NOT_FOUND, e.getMessage());
    }

    //Excepciones de Usuario
    @ExceptionHandler(UsuarioAlredyExitsException.class)
    public ResponseEntity<ApiErrorResponse> handleUsuarioAlreadyExitsException(UsuarioAlredyExitsException e) {
        return buildErrorResponse(e, HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(UsuarioNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleUsuarioNotFoundException(UsuarioNotFoundException e) {
        return buildErrorResponse(e, HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(UsuarioMismatchedCredentialsException.class)
    public ResponseEntity<ApiErrorResponse> handleUsuarioMismatchedCredentialsException(UsuarioMismatchedCredentialsException e) {
        return buildErrorResponse(e, HttpStatus.BAD_REQUEST, e.getMessage());
    }

    //Excepciones de Trabajo Previo
    @ExceptionHandler(TrabajoPrevioNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleTrabajoPrevioNotFoundException(TrabajoPrevioNotFoundException e) {
        return buildErrorResponse(e, HttpStatus.NOT_FOUND, e.getMessage());
    }

    //Exepciones de Reseña
    @ExceptionHandler(ResenaInvalidQualificationException.class)
    public ResponseEntity<ApiErrorResponse> handleResenaInvalidQualificationException(ResenaInvalidQualificationException e) {
        return buildErrorResponse(e, HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(ResenaNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleResenaNotFoundException(ResenaNotFoundException e) {
        return buildErrorResponse(e, HttpStatus.NOT_FOUND, e.getMessage());
    }

    //Excepciones de Tasker_X_Categoria
    @ExceptionHandler(TaskerCategoriaAssignmentException.class)
    public ResponseEntity<ApiErrorResponse> handleTaskerCategoriaAssignmentException(TaskerCategoriaAssignmentException e) {
        return buildErrorResponse(e, HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(TaskerCategoriaNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleTaskerCategoriaNotFoundException(TaskerCategoriaNotFoundException e) {
        return buildErrorResponse(e, HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(TaskerCategoriaLimitCategoriasReachedException.class)
    public ResponseEntity<ApiErrorResponse> handleTaskerCategoriaLimitCategoriasReachedException(TaskerCategoriaLimitCategoriasReachedException e) {
        return buildErrorResponse(e, HttpStatus.CONFLICT, e.getMessage());
    }

    //Excepcion de Trabajo
    @ExceptionHandler(TrabajoNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleTrabajoNotFoundException(TrabajoNotFoundException e) {
        return buildErrorResponse(e, HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(TrabajoEstadoNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleTrabajoEstadoNotValidException(TrabajoEstadoNotValidException e) {
        return buildErrorResponse(e, HttpStatus.BAD_REQUEST, e.getMessage());
    }

    //Excepcion de Valores
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValueOfEntity(MethodArgumentNotValidException e) {
        List<String> errors = e.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();
        return buildErrorResponse(e, HttpStatus.BAD_REQUEST, errors);
    }

    public ResponseEntity<ApiErrorResponse> buildErrorResponse(Exception e, HttpStatus status, Object data) {
        String uri = ServletUriComponentsBuilder.fromCurrentRequestUri().build().getPath();
        return ResponseEntity.status(status).body(ApiErrorResponse.builder()
                .message(data)
                .status(status.value())
                .time(LocalDate.now())
                .uri(uri)
                .build());
    }
}

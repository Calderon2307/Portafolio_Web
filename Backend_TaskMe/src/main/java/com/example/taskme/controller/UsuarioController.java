package com.example.taskme.controller;

import com.example.taskme.dto.request.usuario.UsuarioRequest;
import com.example.taskme.dto.request.usuario.UsuarioUpdateRequest;
import com.example.taskme.dto.response.GeneralResponse;
import com.example.taskme.dto.response.usuario.UsuarioResponse;
import com.example.taskme.service.impl.UsuarioServiceImpl;
import com.example.taskme.utils.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taskme/api/usuarios")
public class UsuarioController {

    private final UsuarioServiceImpl usuarioService;

    @Autowired
    public UsuarioController(UsuarioServiceImpl usuarioService) {
        this.usuarioService = usuarioService;
    }

    //CREATE en Sign Up

    //READ
    @GetMapping()
    public ResponseEntity<GeneralResponse> findAllUsuarios() {
        List<UsuarioResponse> usuarios = usuarioService.findAllUsuarios();

        return ResponseBuilder.buildResponse(
          "Usuarios encontrados.",
                HttpStatus.OK,
                usuarios
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> findById(@PathVariable Long id) {
        return ResponseBuilder.buildResponse(
                "Usuario encontrado.",
                HttpStatus.OK,
                usuarioService.findUsuarioById(id)
        );
    }

    @GetMapping("/correo/{correo}")
    public ResponseEntity<GeneralResponse> findByCorreo(@PathVariable String correo) {
        return ResponseBuilder.buildResponse(
                "Usuario encontrado.",
                HttpStatus.OK,
                usuarioService.findUsuarioByCorreo(correo)
        );
    }

    @GetMapping("/taskers")
    public ResponseEntity<GeneralResponse> findAllTaskers() {
        List<UsuarioResponse> taskers = usuarioService.findAllTaskers();

        return ResponseBuilder.buildResponse(
                "Taskers encontrados.",
                HttpStatus.OK,
                taskers
        );
    }

    @GetMapping("/taskers/nombre")
    public ResponseEntity<GeneralResponse> findAllTaskerByNombre(@RequestParam String nombre) {
        List<UsuarioResponse> taskers = usuarioService.findTaskerByNombre(nombre);

        return ResponseBuilder.buildResponse(
                "Taskers encontrados.",
                HttpStatus.OK,
                taskers
        );
    }

    @GetMapping("/taskers/ubicacion")
    public ResponseEntity<GeneralResponse> findAllTaskerByUbicacion(
            @RequestParam Long ubicacion
    ) {
        List<UsuarioResponse> taskers = usuarioService.findTaskersByUbicacionID(ubicacion);

        return ResponseBuilder.buildResponse(
                "Taskers encontrados.",
                HttpStatus.OK,
                taskers
        );
    }

    //UPDATE
    @PatchMapping()
    public ResponseEntity<GeneralResponse> updateTasker(
            @Valid @RequestBody UsuarioUpdateRequest newUser
    ) {
        UsuarioResponse response = usuarioService.updateUsuario(newUser);

        return ResponseBuilder.buildResponse(
                "Usuario actualizado.",
                HttpStatus.OK,
                response
        );
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<GeneralResponse> deleteUsuario(@PathVariable Long id) {
        return ResponseBuilder.buildResponse(
                "Usuario eliminado.",
                HttpStatus.OK,
                usuarioService.deleteUsuario(id)
        );
    }
}

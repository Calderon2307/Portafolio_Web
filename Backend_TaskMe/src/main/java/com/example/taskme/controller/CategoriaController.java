package com.example.taskme.controller;

import com.example.taskme.dto.request.categoria.CategoriaRequest;
import com.example.taskme.dto.request.categoria.CategoriaUpdateRequest;
import com.example.taskme.dto.response.GeneralResponse;
import com.example.taskme.dto.response.categoria.CategoriaResponse;
import com.example.taskme.service.CategoriaService;

import com.example.taskme.utils.Constants;
import com.example.taskme.utils.ResponseBuilder;
import com.example.taskme.utils.SeguridadUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taskme/api/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    @Autowired
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    //CREATE
    @PostMapping()
    public ResponseEntity<GeneralResponse> create(
            @Valid @RequestBody CategoriaRequest request
    ) {
        if (!SeguridadUtils.getCorreoUsuario().equals(Constants.USER_ADMIN_EMAIL)) {
            return ResponseBuilder.buildResponse(
                    "Acceso denegado. Solo administradores pueden realizar esta acción.",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        CategoriaResponse response = categoriaService.create(request);
        return ResponseBuilder.buildResponse(
                "Categoria creada",
                HttpStatus.CREATED,
                response
        );
    }

    //READ
    @GetMapping()
    public ResponseEntity<GeneralResponse> getAll() {
        List<CategoriaResponse> list = categoriaService.findAll();
        return ResponseBuilder.buildResponse(
                "Categorias encontradas",
                HttpStatus.OK,
                list
        );
    }

    @GetMapping("/nombre")
    public ResponseEntity<GeneralResponse> getCategoriaByNombre(@RequestParam String nombre) {
        CategoriaResponse response = categoriaService.findByNombre(nombre);
        return ResponseBuilder.buildResponse(
                "Categoria encontrada",
                HttpStatus.OK,
                response
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> getById(@PathVariable Long id) {
        CategoriaResponse response = categoriaService.findById(id);
        return ResponseBuilder.buildResponse(
                "Categoria encontrada",
                HttpStatus.OK,
                response
        );
    }

    //UPDATE
    @PatchMapping()
    public ResponseEntity<GeneralResponse> update(
            @Valid @RequestBody CategoriaUpdateRequest request
    ) {
        if (!SeguridadUtils.getCorreoUsuario().equals(Constants.USER_ADMIN_EMAIL)) {
            return ResponseBuilder.buildResponse(
                    "Acceso denegado. Solo administradores pueden realizar esta acción.",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        CategoriaResponse response = categoriaService.update(request);
        return ResponseBuilder.buildResponse(
                "Categoria modificada",
                HttpStatus.OK,
                response
        );
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<GeneralResponse> delete(@PathVariable Long id) {
        if (!SeguridadUtils.getCorreoUsuario().equals(Constants.USER_ADMIN_EMAIL)) {
            return ResponseBuilder.buildResponse(
                    "Acceso denegado. Solo administradores pueden realizar esta acción.",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        CategoriaResponse response = categoriaService.delete(id);
        return ResponseBuilder.buildResponse(
                "Categoria eliminada",
                HttpStatus.OK,
                response
        );
    }
}

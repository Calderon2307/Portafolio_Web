package com.example.taskme.controller;

import com.example.taskme.dto.request.trabajoPrevio.TrabajoPrevioRequest;
import com.example.taskme.dto.request.trabajoPrevio.TrabajoPrevioUpdateRequest;
import com.example.taskme.dto.response.GeneralResponse;
import com.example.taskme.dto.response.trabajoPrevio.TrabajoPrevioResponse;
import com.example.taskme.service.TrabajoPrevioService;
import com.example.taskme.utils.ResponseBuilder;
import com.example.taskme.utils.SeguridadUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taskme/api/trabajos-previos")
public class TrabajoPrevioController {

    private final TrabajoPrevioService trabajoPrevioService;

    @Autowired
    public TrabajoPrevioController(TrabajoPrevioService trabajoPrevioService) {
        this.trabajoPrevioService = trabajoPrevioService;
    }

    //CREATE
    @PostMapping()
    public ResponseEntity<GeneralResponse> createTP(
            @Valid @RequestBody TrabajoPrevioRequest request
    ) {
        if (!SeguridadUtils.esTasker()){
            return ResponseBuilder.buildResponse(
                    "Solo un tasker ver crear trabajos previos!\nCrea tu perfil de tasker para poder hacerlo!",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        TrabajoPrevioResponse response = trabajoPrevioService.crearTP(request);
        return ResponseBuilder.buildResponse(
                "Trabajo previo creado.",
                HttpStatus.CREATED,
                response
        );
    }

    //READ
    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> obtenerPorId(@PathVariable Long id) {
        TrabajoPrevioResponse resp = trabajoPrevioService.getById(id);
        return ResponseBuilder.buildResponse(
                "Trabajo previo encontrado.",
                HttpStatus.OK,
                resp
        );
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<GeneralResponse> listarPorUsuario(
            @PathVariable Long idUsuario
    ) {
        List<TrabajoPrevioResponse> trabajosPrevios = trabajoPrevioService.getByUsuarioId(idUsuario);
        return ResponseBuilder.buildResponse(
                "Trabajos previos encontrados.",
                HttpStatus.OK,
                trabajosPrevios
        );
    }

    //UPDATE
    @PatchMapping()
    public ResponseEntity<GeneralResponse> patchById(
            @Valid @RequestBody TrabajoPrevioUpdateRequest request
    ) {
        TrabajoPrevioResponse actualizado = trabajoPrevioService.updateTP(request);
        return ResponseBuilder.buildResponse(
                "Trabajo previo actualizado.",
                HttpStatus.OK,
                actualizado
        );
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<GeneralResponse> eliminar(@PathVariable Long id) {
        return ResponseBuilder.buildResponse(
                "Trabajo previo eliminado.",
                HttpStatus.OK,
                trabajoPrevioService.deleteById(id)
        );
    }
}

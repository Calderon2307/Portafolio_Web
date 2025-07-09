package com.example.taskme.controller;

import com.example.taskme.dto.request.resena.ResenaRequest;
import com.example.taskme.dto.response.GeneralResponse;
import com.example.taskme.dto.response.resena.ResenaResponse;
import com.example.taskme.service.ResenaService;
import com.example.taskme.utils.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taskme/api/resenas")
public class ResenaController {

    private final ResenaService resenaService;

    @Autowired
    public ResenaController(ResenaService resenaService) {
        this.resenaService = resenaService;
    }

    //CREATE
    @PostMapping()
    public ResponseEntity<GeneralResponse> crear(@Valid @RequestBody ResenaRequest request) {
        ResenaResponse response = resenaService.crearResena(request);
        return ResponseBuilder.buildResponse(
                "Reseña creada.",
                HttpStatus.CREATED,
                response
        );
    }

    //READ
    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> obtenerXId(@PathVariable Long id) {
        return ResponseBuilder.buildResponse(
                "Reseña encontrada.",
                HttpStatus.OK,
                resenaService.obtenerXId(id)
        );
    }

    @GetMapping("/tasker/{taskerId}")
    public ResponseEntity<GeneralResponse> obtenerPorTasker(@PathVariable Long taskerId) {
        List<ResenaResponse> response = resenaService.obtenerResenasXTasker(taskerId);
        return ResponseBuilder.buildResponse(
                "Reseñas encontradas.",
                HttpStatus.OK,
                response
        );
    }

    @GetMapping("/tasker")
    public ResponseEntity<GeneralResponse> obtenerXTaskerYCalificacion(
            @RequestParam Long tasker,
            @RequestParam Integer calificacion
    ) {
        List<ResenaResponse> response = resenaService.obtenerResenasXTaskerYCalficacion(tasker, calificacion);
        return ResponseBuilder.buildResponse(
                "Reseñas encontradas.",
                HttpStatus.OK,
                response
        );
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<GeneralResponse> obtenerPorCliente(@PathVariable Long clienteId) {
        List<ResenaResponse> response = resenaService.obtenerResenasXCliente(clienteId);
        return ResponseBuilder.buildResponse(
                "Reseñas encontradas.",
                HttpStatus.OK,
                response
        );
    }

    @GetMapping("/calificacion")
    public ResponseEntity<GeneralResponse> obtenerXCalficacion(
            @RequestParam Integer calificacion
    ) {
        List<ResenaResponse> response = resenaService.obtenerPorCalificacion(calificacion);
        return ResponseBuilder.buildResponse(
                "Reseñas encontradas.",
                HttpStatus.OK,
                response
        );
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<GeneralResponse> eliminar(@PathVariable Long id) {
        ResenaResponse response = resenaService.eliminarResena(id);
        return ResponseBuilder.buildResponse(
                "Reseña eliminada.",
                HttpStatus.OK,
                response
        );
    }
}


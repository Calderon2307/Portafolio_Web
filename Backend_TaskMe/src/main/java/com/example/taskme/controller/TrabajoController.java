package com.example.taskme.controller;

import com.example.taskme.dto.request.trabajo.TrabajoRequest;
import com.example.taskme.dto.request.trabajo.TrabajoUpdateRequest;
import com.example.taskme.dto.response.GeneralResponse;
import com.example.taskme.dto.response.trabajo.TrabajoResponse;
import com.example.taskme.entities.enums.EstadoTrabajo;
import com.example.taskme.service.TrabajoService;
import com.example.taskme.utils.Constants;
import com.example.taskme.utils.ResponseBuilder;
import com.example.taskme.utils.SeguridadUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDate;

@RestController
@RequestMapping("/taskme/api/tasks")
public class TrabajoController {

    private final TrabajoService trabajoService;

    @Autowired
    public TrabajoController(TrabajoService trabajoService){
        this.trabajoService = trabajoService;
    }

    //CREATE
    @PostMapping()
    public ResponseEntity<GeneralResponse> createTrabajo(@RequestBody @Valid TrabajoRequest trabajo){
        return ResponseBuilder.buildResponse(
                "Trabajo creado",
                HttpStatus.CREATED,
                trabajoService.createTrabajo(trabajo)
        );
    }

    //READ
    //Generales
    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> getTrabajoById(@PathVariable Long id){
        return ResponseBuilder.buildResponse(
                "Trababjo encontrado",
                HttpStatus.OK,
                trabajoService.getTrabajoById(id)
        );
    }

    @GetMapping()
    public ResponseEntity<GeneralResponse> getAllTrabajos() {
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAll()
        );
    }

    @GetMapping("/categoria/{idCategoria}")
    public ResponseEntity<GeneralResponse> getAllTrabajosXCategoria(@PathVariable Long idCategoria){
        return ResponseBuilder.buildResponse(
                "Trabajos Encontrados",
                HttpStatus.OK,
                trabajoService.findAllXCategoria(idCategoria)
        );
    }

    @GetMapping("/estado")
    public ResponseEntity<GeneralResponse> getAllTrabajosXEstado(@RequestParam EstadoTrabajo estado){
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXEstadoTrabajo(estado)
        );
    }

    @GetMapping("/ubicacion/{idUbicacion}")
    public ResponseEntity<GeneralResponse> getAllTrabajosXUbicacion(@PathVariable Long idUbicacion){
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXUbicacion(idUbicacion)
        );
    }

    //Especificos
    @GetMapping("/user/{idUser}")
    public ResponseEntity<GeneralResponse> getTrabajosXCliente(@PathVariable Long idUser){
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXCliente(idUser)
        );
    }

    @GetMapping("/tasker/{idTasker}")
    public ResponseEntity<GeneralResponse> getTrabajosXTasker(@PathVariable Long idTasker){
        if (!SeguridadUtils.esTasker()){
            return ResponseBuilder.buildResponse(
                    "Solo un tasker ver sus trabajos!\nCrea tu perfil de tasker para poder hacerlo!",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXTasker(idTasker)
        );
    }

    @GetMapping("/cliente/categoria")
    public ResponseEntity<GeneralResponse> getTrabajosXCategoriaXCliente(
            @RequestParam Long user,
            @RequestParam Long categoria
    ){
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXCategoriaXCliente(categoria, user)
        );
    }

    @GetMapping("/tasker/categoria")
    public ResponseEntity<GeneralResponse> getTrabajosXCategoriaXTasker(
            @RequestParam Long tasker,
            @RequestParam Long categoria
    ){
        if (!SeguridadUtils.esTasker()){
            return ResponseBuilder.buildResponse(
                    "Solo un tasker ver sus trabajos!\nCrea tu perfil de tasker para poder hacerlo!",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXCategoriaXTasker(categoria, tasker)
        );
    }

    @GetMapping("/cliente/ubicacion")
    public ResponseEntity<GeneralResponse> getTrabajosXUbicacionXCliente(
            @RequestParam Long user,
            @RequestParam Long ubicacion
    ){
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXUbicacionXCliente(ubicacion, user)
        );
    }

    @GetMapping("/tasker/ubicacion")
    public ResponseEntity<GeneralResponse> getTrabajosXUbicacionXTasker(
            @RequestParam Long tasker,
            @RequestParam Long ubicacion
    ){
        if (!SeguridadUtils.esTasker()){
            return ResponseBuilder.buildResponse(
                    "Solo un tasker ver sus trabajos!\nCrea tu perfil de tasker para poder hacerlo!",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXUbicacionXTasker(ubicacion, tasker)
        );
    }

    @GetMapping("/cliente/estado")
    public ResponseEntity<GeneralResponse> getTrabajosXEstadoXCliente(
            @RequestParam Long user,
            @RequestParam EstadoTrabajo estado
    ){
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXEstadoTrabajoXCliente(estado, user)
        );
    }

    @GetMapping("/tasker/estado")
    public ResponseEntity<GeneralResponse> getTrabajosXEstadoXTasker(
            @RequestParam Long tasker,
            @RequestParam EstadoTrabajo estado
    ){
        if (!SeguridadUtils.esTasker()){
            return ResponseBuilder.buildResponse(
                    "Solo un tasker ver sus trabajos!\nCrea tu perfil de tasker para poder hacerlo!",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        return ResponseBuilder.buildResponse(
                "Trabajos encontrados",
                HttpStatus.OK,
                trabajoService.findAllXEstadoTrabajoXTasker(estado, tasker)
        );
    }

    //UPDATE
    @PatchMapping()
    public ResponseEntity<GeneralResponse> updateTrabajo(@RequestBody @Valid TrabajoUpdateRequest trabajo) {
        TrabajoResponse response = trabajoService.updateTrabajo(trabajo);
        return ResponseBuilder.buildResponse(
                "Trabajo actualizado",
                HttpStatus.OK,
                response
        );
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<GeneralResponse> deleteTrabajo(@PathVariable Long id) {
        if (!SeguridadUtils.getCorreoUsuario().equals(Constants.USER_ADMIN_EMAIL)) {
            return ResponseBuilder.buildResponse(
                    "Acceso denegado. Solo administradores pueden realizar esta acción.",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        return ResponseBuilder.buildResponse(
                "Trabajo eliminado",
                HttpStatus.OK,
                trabajoService.deletTrabajo(id)
        );
    }
}

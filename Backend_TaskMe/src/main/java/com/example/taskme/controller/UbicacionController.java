package com.example.taskme.controller;

import com.example.taskme.dto.request.ubicacion.UbicacionRequest;
import com.example.taskme.dto.request.ubicacion.UbicacionUpdateRequest;
import com.example.taskme.dto.response.GeneralResponse;
import com.example.taskme.dto.response.ubicacion.UbicacionResponse;
import com.example.taskme.service.UbicacionService;
import com.example.taskme.utils.Constants;
import com.example.taskme.utils.ResponseBuilder;
import com.example.taskme.utils.SeguridadUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taskme/api/ubicaciones")
@RequiredArgsConstructor
public class UbicacionController {

    private final UbicacionService ubicacionService;

    //CREATE
    @PostMapping()
    public ResponseEntity<GeneralResponse> crear(@Valid @RequestBody UbicacionRequest request) {
        if (!SeguridadUtils.getCorreoUsuario().equals(Constants.USER_ADMIN_EMAIL)) {
            return ResponseBuilder.buildResponse(
                    "Acceso denegado. Solo administradores pueden realizar esta acción.",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        UbicacionResponse response = ubicacionService.crearUbicacion(request);

        return ResponseBuilder.buildResponse(
                "Ubicacion creada.",
                HttpStatus.CREATED,
                response
        );
    }

    //READ
    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseBuilder.buildResponse(
                "Ubicacion encontrada.",
                HttpStatus.OK,
                ubicacionService.obtenerPorId(id)
        );
    }

    @GetMapping("/ubicacion")
    public ResponseEntity<GeneralResponse> obtenerXPaisYEstado(
            @RequestParam String pais,
            @RequestParam String estado
    ) {
        UbicacionResponse ubicacion = ubicacionService.obtenerPorPaisYEstado(pais, estado);
        return ResponseBuilder.buildResponse(
                "Ubicacion encontrada.",
                HttpStatus.OK,
                ubicacion
        );
    }

    @GetMapping("/pais")
    public ResponseEntity<GeneralResponse> obtenerTodoXPais(@RequestParam String pais){
        List<UbicacionResponse> ubicaciones = ubicacionService.obtenerTodosPorPais(pais);
        return ResponseBuilder.buildResponse(
                "Ubicaciones encontradas.",
                HttpStatus.OK,
                ubicaciones
        );
    }

    @GetMapping()
    public ResponseEntity<GeneralResponse> listarTodas() {
        return ResponseBuilder.buildResponse(
                "Ubicaciones encontradas",
                HttpStatus.OK,
                ubicacionService.listarUbicaciones()
        );
    }

    //UPDATE
    @PatchMapping()
    public ResponseEntity<GeneralResponse> actualizar(@Valid @RequestBody UbicacionUpdateRequest request) {
        if (!SeguridadUtils.getCorreoUsuario().equals(Constants.USER_ADMIN_EMAIL)) {
            return ResponseBuilder.buildResponse(
                    "Acceso denegado. Solo administradores pueden realizar esta acción.",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        UbicacionResponse response = ubicacionService.actualizarUbicacion(request);

        return ResponseBuilder.buildResponse(
                "Ubicacion actualizada.",
                HttpStatus.OK,
                response
        );
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<GeneralResponse> eliminar(@PathVariable Long id) {
        if (!SeguridadUtils.getCorreoUsuario().equals(Constants.USER_ADMIN_EMAIL)) {
            return ResponseBuilder.buildResponse(
                    "Acceso denegado. Solo administradores pueden realizar esta acción.",
                    HttpStatus.FORBIDDEN,
                    null
            );
        }
        UbicacionResponse response = ubicacionService.eliminarUbicacion(id);
        return ResponseBuilder.buildResponse(
                "Ubicacion eliminada.",
                HttpStatus.OK,
                response
        );
    }
}

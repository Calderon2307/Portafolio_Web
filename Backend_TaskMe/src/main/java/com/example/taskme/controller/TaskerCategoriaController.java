package com.example.taskme.controller;

import com.example.taskme.dto.request.taskercategoria.TaskerCategoriaRequest;
import com.example.taskme.dto.response.GeneralResponse;
import com.example.taskme.dto.response.taskercategoria.CategoryUsersResponse;
import com.example.taskme.dto.response.taskercategoria.TaskerCategoriaResponse;
import com.example.taskme.dto.response.taskercategoria.UserCategoriesResponse;
import com.example.taskme.service.TaskerCategoriaService;
import com.example.taskme.utils.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taskme/api/tasker-categorias")
public class TaskerCategoriaController {

    private final TaskerCategoriaService taskerCategoriaService;

    @Autowired
    public TaskerCategoriaController(TaskerCategoriaService service) {
        this.taskerCategoriaService = service;
    }

    //CREATE
    @PostMapping()
    public ResponseEntity<GeneralResponse> assignCategory(
            @Valid @RequestBody TaskerCategoriaRequest request
    ) {
        TaskerCategoriaResponse response = taskerCategoriaService.createRelation(request);
        return ResponseBuilder.buildResponse(
                "Relacion creada",
                HttpStatus.CREATED,
                response
        );
    }

    //READ
    @GetMapping()
    public ResponseEntity<GeneralResponse> getAll() {
        return ResponseBuilder.buildResponse(
                "Relaciones obtenidas",
                HttpStatus.OK,
                taskerCategoriaService.findAll()
        );
    }

    @GetMapping("/tasker/{id}")
    public ResponseEntity<GeneralResponse> getCategoriesByTasker(
            @PathVariable Long id
    ) {
        return ResponseBuilder.buildResponse(
                "Tasker encontrado.",
                HttpStatus.OK,
                taskerCategoriaService.findAllUserCategories(id)
        );
    }

    @GetMapping("/categoria/{id}/taskers")
    public ResponseEntity<GeneralResponse> getTaskersByCategory(
            @PathVariable Long id,
            @RequestParam int page,
            @RequestParam int size
    ) {
        CategoryUsersResponse response = taskerCategoriaService.findAllCategoryUsers(id, page, size);
        return ResponseBuilder.buildResponse(
                "Taskers encontrados",
                HttpStatus.OK,
                response
        );
    }

    //UPDATE
    @PatchMapping("/update")
    public ResponseEntity<GeneralResponse> updateRelation(
            @RequestParam Long oldTasker,
            @RequestParam Long oldCategory,
            @RequestBody TaskerCategoriaRequest dto
    ) {
        TaskerCategoriaResponse response = taskerCategoriaService.update(oldTasker, oldCategory, dto);
        return ResponseBuilder.buildResponse(
                "Relacion actualizada.",
                HttpStatus.OK,
                response
        );
    }

    //DELETE
    @DeleteMapping()
    public ResponseEntity<GeneralResponse> removeAssignment(
            @Valid @RequestBody TaskerCategoriaRequest request
    ) {
        TaskerCategoriaResponse response = taskerCategoriaService.remove(request.getUsuarioId(), request.getCategoriaId());
        return ResponseBuilder.buildResponse(
                "Relacion eliminada.",
                HttpStatus.OK,
                response
        );
    }
}

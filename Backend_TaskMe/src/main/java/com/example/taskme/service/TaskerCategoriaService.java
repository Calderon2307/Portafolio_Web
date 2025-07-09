package com.example.taskme.service;

import com.example.taskme.dto.request.taskercategoria.TaskerCategoriaRequest;
import com.example.taskme.dto.response.taskercategoria.CategoryUsersResponse;
import com.example.taskme.dto.response.taskercategoria.TaskerCategoriaResponse;
import com.example.taskme.dto.response.taskercategoria.UserCategoriesResponse;

import java.util.List;

public interface TaskerCategoriaService {
    //CREATE
    TaskerCategoriaResponse createRelation(TaskerCategoriaRequest request);

    //READ
    List<TaskerCategoriaResponse> findAll();
    UserCategoriesResponse findAllUserCategories(Long usuarioId);
    CategoryUsersResponse findAllCategoryUsers(Long categoriaId, int page, int pageSize);

    //UPDATE
    TaskerCategoriaResponse update(Long taskerId, Long categoriaId, TaskerCategoriaRequest dto);

    //DELETE
    TaskerCategoriaResponse remove(Long taskerId, Long categoriaId);
}

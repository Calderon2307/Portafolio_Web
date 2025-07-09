package com.example.taskme.service.impl;

import com.example.taskme.dto.request.taskercategoria.TaskerCategoriaRequest;
import com.example.taskme.dto.response.taskercategoria.CategoryUsersResponse;
import com.example.taskme.dto.response.taskercategoria.TaskerCategoriaResponse;
import com.example.taskme.dto.response.taskercategoria.UserCategoriesResponse;
import com.example.taskme.dto.response.usuario.UsuarioResponse;
import com.example.taskme.entities.Categoria;
import com.example.taskme.entities.TaskerCategoria;
import com.example.taskme.entities.TaskerCategoriaId;
import com.example.taskme.entities.Usuario;
import com.example.taskme.exception.taskerCategoria.TaskerCategoriaAssignmentException;
import com.example.taskme.exception.taskerCategoria.TaskerCategoriaLimitCategoriasReachedException;
import com.example.taskme.exception.taskerCategoria.TaskerCategoriaNotFoundException;
import com.example.taskme.mapper.CategoriaMapper;
import com.example.taskme.mapper.TaskerCategoriaMapper;
import com.example.taskme.mapper.UsuarioMapper;
import com.example.taskme.repository.TaskerCategoriaRepository;
import com.example.taskme.service.CategoriaService;
import com.example.taskme.service.TaskerCategoriaService;
import com.example.taskme.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskerCategoriaServiceImpl implements TaskerCategoriaService {

    private final TaskerCategoriaRepository taskerCategoriaRepository;
    private final UsuarioService usuarioService;
    private final CategoriaService categoriaService;

    @Autowired
    public TaskerCategoriaServiceImpl(
            TaskerCategoriaRepository taskerCategoriaRepository,
            UsuarioService usuarioService,
            CategoriaService categoriaService
    ) {
        this.taskerCategoriaRepository = taskerCategoriaRepository;
        this.usuarioService = usuarioService;
        this.categoriaService = categoriaService;
    }

    //CREATE
    @Override
    @Transactional
    public TaskerCategoriaResponse createRelation(TaskerCategoriaRequest dto) {
        Usuario usuario = UsuarioMapper.fromResponse(usuarioService.findUsuarioById(dto.getUsuarioId()));
        Categoria categoria = CategoriaMapper.toEntityFromDTO(categoriaService.findById(dto.getCategoriaId()));

        long numberOfCategories = taskerCategoriaRepository.countByUsuarioId(dto.getUsuarioId());
        if(numberOfCategories >= 5) {
            throw new TaskerCategoriaLimitCategoriasReachedException("Limite de categorias alcanzado.");
        }

        TaskerCategoriaId id = new TaskerCategoriaId(dto.getUsuarioId(), dto.getCategoriaId());

        boolean existsRelation = taskerCategoriaRepository.existsById(id);

        if (existsRelation) throw new TaskerCategoriaAssignmentException("El usurio ya posee esa categoria.");

        return TaskerCategoriaMapper.toDTO(
                taskerCategoriaRepository.save(TaskerCategoriaMapper.toEntityCreate(dto, usuario, categoria))
        );
    }

    //READ
    @Override
    public List<TaskerCategoriaResponse> findAll() {
        return TaskerCategoriaMapper.toDTOList(taskerCategoriaRepository.findAll());
    }

    @Override
    public UserCategoriesResponse findAllUserCategories(Long usuarioId) {
        Usuario usuario = UsuarioMapper.fromResponse(usuarioService.findUsuarioById(usuarioId));
        List<Categoria> categorias = taskerCategoriaRepository.findCategoriasByUsuarioId(usuarioId);

        return TaskerCategoriaMapper.toUserCategoriesDTO(usuario, categorias);
    }

    @Override
    public CategoryUsersResponse findAllCategoryUsers(Long categoriaId, int page, int pageSize) {
        Categoria categoria = CategoriaMapper.toEntityFromDTO(categoriaService.findById(categoriaId));

        Pageable pageable = PageRequest.of(page, pageSize);

        Page<Usuario> usuarios = taskerCategoriaRepository.findTaskersByCategoriaId(categoriaId, pageable);

        List<UsuarioResponse> taskers = usuarios.getContent()
                .stream()
                .map(UsuarioMapper::toDTOCard)
                .toList();

        return CategoryUsersResponse
                .builder()
                .id(categoriaId)
                .nombreCategoria(categoria.getNombre())
                .taskers(taskers)
                .paginaActual(usuarios.getNumber())
                .totalPaginas(usuarios.getTotalPages())
                .totalTaskers(usuarios.getTotalElements())
                .build();
    }

    //UPDATE
    @Override
    @Transactional
    public TaskerCategoriaResponse update(Long oldTaskerId, Long oldCategoriaId, TaskerCategoriaRequest dto) {
        TaskerCategoriaId id = new TaskerCategoriaId(oldTaskerId, oldCategoriaId);
        TaskerCategoria existente = taskerCategoriaRepository.findById(id)
            .orElseThrow(() -> new TaskerCategoriaNotFoundException("El tasker no posee esa categoria."));

        TaskerCategoriaId newId = new TaskerCategoriaId(dto.getUsuarioId(), dto.getCategoriaId());
        boolean existsRelation = taskerCategoriaRepository.existsById(newId);
        if (existsRelation) throw new TaskerCategoriaAssignmentException("El usurio ya posee esa categoria.");

        Usuario usuario = UsuarioMapper.fromResponse(usuarioService.findUsuarioById(dto.getUsuarioId()));
        Categoria categoria = CategoriaMapper.toEntityFromDTO(categoriaService.findById(dto.getCategoriaId()));

        taskerCategoriaRepository.deleteById(id);

        return TaskerCategoriaMapper.toDTO(taskerCategoriaRepository.save(TaskerCategoriaMapper.toEntityCreate(dto, usuario, categoria)));
    }

    //DELETE
    @Override
    public TaskerCategoriaResponse remove(Long taskerId, Long categoriaId) {
        TaskerCategoriaId id = new TaskerCategoriaId(taskerId, categoriaId);
        TaskerCategoriaResponse response = TaskerCategoriaMapper.toDTO(taskerCategoriaRepository.findById(id)
                .orElseThrow(() -> new TaskerCategoriaNotFoundException("El tasker no posee esa categoria.")));

        taskerCategoriaRepository.deleteById(id);

        return response;
    }
}

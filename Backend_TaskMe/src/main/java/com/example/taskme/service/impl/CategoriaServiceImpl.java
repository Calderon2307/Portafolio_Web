package com.example.taskme.service.impl;

import com.example.taskme.dto.request.categoria.CategoriaRequest;
import com.example.taskme.dto.request.categoria.CategoriaUpdateRequest;
import com.example.taskme.dto.response.categoria.CategoriaResponse;
import com.example.taskme.entities.Categoria;
import com.example.taskme.exception.categoria.CategoriaNotFoundException;
import com.example.taskme.exception.categoria.DuplicateCategoriaException;
import com.example.taskme.mapper.CategoriaMapper;
import com.example.taskme.repository.CategoriaRepository;
import com.example.taskme.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaServiceImpl(CategoriaRepository repository) {
        this.categoriaRepository = repository;
    }

    //CREATE
    @Override
    @Transactional
    public CategoriaResponse create(CategoriaRequest dto) {
        boolean exists = categoriaRepository.existsByNombre(dto.getNombre().toLowerCase());

        if (exists) throw new DuplicateCategoriaException("La categoria " + dto.getNombre().toUpperCase() + " ya existe.");

        CategoriaRequest castDTO = CategoriaRequest.builder()
                .nombre(dto.getNombre().toLowerCase())
                .imagen(dto.getImagen())
                .build();

        return CategoriaMapper.toDTO(categoriaRepository.save(CategoriaMapper.toEntityCreate(castDTO)));
    }

    //READ
    @Override
    public CategoriaResponse findByNombre(String nombre) {
        String newNombre = nombre.toLowerCase();

        return CategoriaMapper.toDTO(categoriaRepository.findByNombre(newNombre).orElseThrow(() -> new CategoriaNotFoundException("La categoria " + nombre.toUpperCase() + " no existe.")));
    }

    @Override
    public CategoriaResponse findById(Long id) {
        return CategoriaMapper.toDTO(categoriaRepository.findById(id)
                .orElseThrow(() -> new CategoriaNotFoundException("La categoria solicitada no existe.")));
    }

    @Override
    public List<CategoriaResponse> findAll() { return CategoriaMapper.toDTOList(categoriaRepository.findAll()); }

    //UPDATE
    @Override
    @Transactional
    public CategoriaResponse update(CategoriaUpdateRequest dto) {
        Categoria existente = categoriaRepository.findById(dto.getId())
            .orElseThrow(() -> new CategoriaNotFoundException("La categoria no existe."));

        CategoriaUpdateRequest castDTO = CategoriaUpdateRequest.builder()
                .id(dto.getId())
                .nombre(dto.getNombre().toLowerCase())
                .imagen(dto.getImagen())
                .build();

        CategoriaMapper.toEntityUpdate(existente, castDTO);

        return CategoriaMapper.toDTO(categoriaRepository.save(existente));
    }

    //DELETE
    @Override
    public CategoriaResponse delete(Long id) {
        Categoria exists = categoriaRepository.findById(id).orElseThrow(() -> new CategoriaNotFoundException("La categoria solicitada no existe."));

        categoriaRepository.deleteById(id);

        return CategoriaMapper.toDTO(exists);
    }
}

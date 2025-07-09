package com.example.taskme.service.impl;

import com.example.taskme.dto.request.trabajoPrevio.TrabajoPrevioRequest;
import com.example.taskme.dto.request.trabajoPrevio.TrabajoPrevioUpdateRequest;
import com.example.taskme.dto.response.trabajoPrevio.TrabajoPrevioResponse;
import com.example.taskme.entities.TrabajoPrevio;
import com.example.taskme.entities.Usuario;
import com.example.taskme.exception.trabajoPrevio.TrabajoPrevioNotFoundException;
import com.example.taskme.exception.usuario.UsuarioNotFoundException;
import com.example.taskme.mapper.TrabajoPrevioMapper;
import com.example.taskme.repository.TrabajoPrevioRepository;
import com.example.taskme.repository.UsuarioRepository;
import com.example.taskme.service.TrabajoPrevioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrabajoPrevioServiceImpl implements TrabajoPrevioService {

    private final TrabajoPrevioRepository trabajoPrevioRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public TrabajoPrevioServiceImpl(
            TrabajoPrevioRepository trabajoPrevioRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.trabajoPrevioRepository = trabajoPrevioRepository;
        this.usuarioRepository = usuarioRepository;
    }

    //CREATE
    @Override
    @Transactional
    public TrabajoPrevioResponse crearTP(TrabajoPrevioRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado."));

        return TrabajoPrevioMapper.toDTO(
                trabajoPrevioRepository.save(TrabajoPrevioMapper.toEntityCreate(request, usuario))
        );
    }

    //READ
    @Override
    public TrabajoPrevioResponse getById(Long id) {
        return TrabajoPrevioMapper.toDTO(
                trabajoPrevioRepository.findById(id)
                        .orElseThrow(() -> new TrabajoPrevioNotFoundException("TrabajoPrevio no encontrado."))
        );
    }

    @Override
    public List<TrabajoPrevioResponse> getByUsuarioId(Long usuarioId) {
        boolean exists = trabajoPrevioRepository.existsById(usuarioId);

        if (!exists) throw new UsuarioNotFoundException("Usuario no encontrado.");

        return TrabajoPrevioMapper.toSummaryDTOList(
                trabajoPrevioRepository.findAllByUsuario_Id(usuarioId)
        );
    }

    //UPDATE
    @Override
    @Transactional
    public TrabajoPrevioResponse updateTP(TrabajoPrevioUpdateRequest request) {
        TrabajoPrevio existente = trabajoPrevioRepository.findById(request.getId())
                .orElseThrow(() -> new TrabajoPrevioNotFoundException("TrabajoPrevio no encontrado."));

        TrabajoPrevioMapper.toEntityUpdate(existente, request);
        TrabajoPrevio actualizado = trabajoPrevioRepository.save(existente);

        return TrabajoPrevioMapper.toDTO(actualizado);
    }

    //DELETE
    @Override
    public TrabajoPrevioResponse deleteById(Long id) {
        TrabajoPrevio existente = trabajoPrevioRepository.findById(id)
                .orElseThrow(() -> new TrabajoPrevioNotFoundException("Trabajo previo no encontrado."));

        trabajoPrevioRepository.deleteById(id);

        return TrabajoPrevioMapper.toDTO(existente);
    }
}

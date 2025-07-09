package com.example.taskme.service.impl;

import com.example.taskme.dto.request.resena.ResenaRequest;
import com.example.taskme.dto.response.resena.ResenaResponse;
import com.example.taskme.entities.Resena;
import com.example.taskme.entities.Usuario;
import com.example.taskme.exception.resena.ResenaInvalidQualificationException;
import com.example.taskme.exception.resena.ResenaNotFoundException;
import com.example.taskme.exception.usuario.UsuarioNotFoundException;
import com.example.taskme.mapper.ResenaMapper;
import com.example.taskme.repository.ResenaRepository;
import com.example.taskme.repository.UsuarioRepository;
import com.example.taskme.service.ResenaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResenaServiceImpl implements ResenaService {

    private final ResenaRepository resenaRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public ResenaServiceImpl(ResenaRepository resenaRepository, UsuarioRepository usuarioRepository) {
        this.resenaRepository = resenaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    //CREATE
    @Override
    @Transactional
    public ResenaResponse crearResena(ResenaRequest request) {
        Usuario cliente = usuarioRepository.findById(request.getIdCliente())
                .orElseThrow(() -> new UsuarioNotFoundException("Cliente no encontrado."));

        Usuario tasker = usuarioRepository.findById(request.getIdTasker())
                .orElseThrow(() -> new UsuarioNotFoundException("Tasker no encontrado."));

        return ResenaMapper.toDTO(
                resenaRepository.save(ResenaMapper.toEntityCreate(request, cliente, tasker))
        );
    }

    @Override
    public ResenaResponse obtenerXId(Long id) {
        return ResenaMapper.toDTO(
                resenaRepository.findById(id)
                        .orElseThrow(() -> new ResenaNotFoundException("Reseña no encontrada."))
        );
    }

    //READ
    @Override
    public List<ResenaResponse> obtenerResenasXTasker(Long taskerId) {
        boolean usuarioExists = usuarioRepository.existsById(taskerId);
        if (!usuarioExists) throw new UsuarioNotFoundException("Usuario no encontrado.");

        return ResenaMapper.toDTOList(
                resenaRepository.findAllByTasker_Id(taskerId)
        );
    }

    @Override
    public List<ResenaResponse> obtenerResenasXTaskerYCalficacion(Long taskerId, Integer calificacion) {
        boolean usuarioExists = usuarioRepository.existsById(taskerId);
        if (!usuarioExists) throw new UsuarioNotFoundException("Usuario no encontrado.");
        if (calificacion <= 0) throw new ResenaInvalidQualificationException("La callificacio solicitada no es valida.");

        return ResenaMapper.toDTOList(
                resenaRepository.findAllByTasker_IdAndCalificacionLessThanEqual(taskerId, calificacion)
        );
    }

    @Override
    public List<ResenaResponse> obtenerResenasXCliente(Long clienteId) {
        boolean usuarioExists = usuarioRepository.existsById(clienteId);
        if (!usuarioExists) throw new UsuarioNotFoundException("Usuario no encontrado.");

        return ResenaMapper.toDTOList(
                resenaRepository.findAllByCliente_Id(clienteId)
        );
    }

    @Override
    public List<ResenaResponse> obtenerPorCalificacion(Integer calificacion) {
        if(calificacion <= 0) throw new ResenaInvalidQualificationException("La calificacion solicitada no es valida");
        return ResenaMapper.toDTOList(
                resenaRepository.findAllByCalificacionLessThanEqual(calificacion)
        );
    }

    //DELETE
    @Override
    public ResenaResponse eliminarResena(Long id) {
        Resena resenaExists = resenaRepository.findById(id)
                .orElseThrow(() -> new ResenaNotFoundException("Reseña no encontrada."));

        resenaRepository.deleteById(id);

        return ResenaMapper.toDTO(resenaExists);
    }
}

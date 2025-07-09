package com.example.taskme.service.impl;

import com.example.taskme.dto.request.usuario.*;
import com.example.taskme.dto.response.ubicacion.UbicacionResponse;
import com.example.taskme.dto.response.usuario.*;
import com.example.taskme.entities.Ubicacion;
import com.example.taskme.entities.Usuario;
import com.example.taskme.exception.usuario.UsuarioAlredyExitsException;
import com.example.taskme.exception.usuario.UsuarioNotFoundException;
import com.example.taskme.mapper.UbicacionMapper;
import com.example.taskme.mapper.UsuarioMapper;
import com.example.taskme.repository.UsuarioRepository;
import com.example.taskme.service.UbicacionService;
import com.example.taskme.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UbicacionService ubicacionService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UbicacionService ubicacionService, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.ubicacionService = ubicacionService;
        this.passwordEncoder = passwordEncoder;
    }

    //CREATE
    @Override
    @Transactional
    public UsuarioResponse createUsuario(UsuarioRequest request) {
        boolean exists = usuarioRepository.existsByCorreo(request.getCorreo());
        if (exists) throw new UsuarioAlredyExitsException("El correo ya está registrado");
        UbicacionResponse ubicacionExists = ubicacionService.obtenerPorId(request.getUbicacionId());

        String paswwordEncrypted = passwordEncoder.encode(request.getContrasena());

        UsuarioRequest castUser = UsuarioRequest
                .builder()
                .ubicacionId(request.getUbicacionId())
                .fotoPerfil(request.getFotoPerfil())
                .nombre(request.getNombre().toLowerCase().trim())
                .correo(request.getCorreo().trim())
                .contrasena(paswwordEncrypted)
                .direccionCompleta(request.getDireccionCompleta().trim())
                .esTasker(request.getEsTasker())
                .telefono(request.getTelefono().trim())
                .biografia(request.getBiografia().trim())
                .build();

        return UsuarioMapper.toDTO(
                usuarioRepository.save(UsuarioMapper.toEntityCreate(
                        castUser,
                        UbicacionMapper.toEntityFromDTO(ubicacionExists)
                ))
        );
    }

    //READ
    @Override
    public List<UsuarioResponse> findAllUsuarios() {
        return UsuarioMapper.toDTOList(usuarioRepository.findAllByEsAdminFalse());
    }

    @Override
    public UsuarioResponse findUsuarioById(Long id) {
        return UsuarioMapper.toDTO(usuarioRepository.findById(id)
                        .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado")));
    }

    @Override
    public UsuarioResponse findUsuarioByCorreo(String correo) {
        return UsuarioMapper.toDTO(
                usuarioRepository.findByCorreo(correo)
                        .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado"))
        );
    }

    @Override
    public List<UsuarioResponse> findAllTaskers() {
        return UsuarioMapper.toDTOCardList(
                usuarioRepository.findAllByEsTaskerTrueAndEsAdminFalse()
        );
    }

    @Override
    public List<UsuarioResponse> findTaskerByNombre(String nombre) {
        return UsuarioMapper.toDTOCardList(
                usuarioRepository.findAllByNombreAndEsTaskerTrueAndEsAdminFalse(nombre)
        );
    }

    @Override
    public List<UsuarioResponse> findTaskersByUbicacionID(Long ubicacionId) {
        return UsuarioMapper.toDTOCardList(
                usuarioRepository.findAllByUbicacion_IdAndEsTaskerTrueAndEsAdminFalse(ubicacionId)
        );
    }

    //UPDATE
    @Override
    @Transactional
    public UsuarioResponse updateUsuario(UsuarioUpdateRequest dto) {
        Usuario existingUser = usuarioRepository.findById(dto.getId())
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado"));

        UsuarioUpdateRequest castUser = UsuarioUpdateRequest.builder()
                .id(dto.getId())
                .ubicacionId(dto.getUbicacionId())
                .fotoPerfil(dto.getFotoPerfil())
                .nombre(dto.getNombre().toLowerCase())
                .direccionCompleta(dto.getDireccionCompleta())
                .esTasker(dto.getEsTasker())
                .telefono(dto.getTelefono())
                .biografia(dto.getBiografia())
                .build();

        Ubicacion ubicacion = dto.getUbicacionId() == null ? null : UbicacionMapper.toEntityFromDTO(ubicacionService.obtenerPorId(dto.getUbicacionId()));

        UsuarioMapper.toEntityUpdate(
                existingUser,
                castUser,
                ubicacion
        );

        return UsuarioMapper.toDTO(usuarioRepository.save(existingUser));
    }

    //FALTA EL UPDATE DE LA CONTRASEÑA

    //DELETE
    @Override
    public UsuarioResponse deleteUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado"));

        usuarioRepository.deleteById(id);

        return UsuarioMapper.toDTO(usuario);
    }
}

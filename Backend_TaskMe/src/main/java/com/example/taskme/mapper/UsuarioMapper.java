package com.example.taskme.mapper;

import com.example.taskme.dto.request.usuario.UsuarioRequest;
import com.example.taskme.dto.request.usuario.UsuarioUpdateRequest;
import com.example.taskme.dto.response.usuario.UsuarioResponse;
import com.example.taskme.entities.Ubicacion;
import com.example.taskme.entities.Usuario;
import com.example.taskme.utils.Constants;

import java.util.List;


public class UsuarioMapper {

    private UsuarioMapper() {}

    public static Usuario toEntityCreate(UsuarioRequest req, Ubicacion ubicacion) {
        boolean esAdmin = req.getCorreo().equalsIgnoreCase(Constants.USER_ADMIN_EMAIL);
        return Usuario.builder()
                .ubicacion(ubicacion)
                .fotoPerfil(req.getFotoPerfil())
                .nombre(req.getNombre())
                .correo(req.getCorreo())
                .contrasena(req.getContrasena())
                .direccionCompleta(req.getDireccionCompleta())
                .esTasker(req.getEsTasker())
                .esAdmin(esAdmin)
                .telefono(req.getTelefono())
                .biografia(req.getBiografia())
                .build();
    }

    public static void toEntityUpdate(Usuario usuario, UsuarioUpdateRequest req, Ubicacion ubicacion) {

        if(ubicacion != null) usuario.setUbicacion(ubicacion);
        if(req.getFotoPerfil() != null) usuario.setFotoPerfil(req.getFotoPerfil());
        if(req.getNombre() != null) usuario.setNombre(req.getNombre());
        if(req.getDireccionCompleta() != null) usuario.setDireccionCompleta(req.getDireccionCompleta());
        if(req.getEsTasker()) usuario.setEsTasker(true);
        if(req.getTelefono() != null) usuario.setTelefono(req.getTelefono());
        if(req.getBiografia() != null) usuario.setBiografia(req.getBiografia());

    }

    public static Usuario fromResponse(UsuarioResponse resp) {
        return Usuario.builder()
                .id(resp.getId())
                .nombre(resp.getNombre())
                .fotoPerfil(resp.getFotoPerfil())
                .build();
    }

    public static UsuarioResponse toDTO(Usuario res) {
        return UsuarioResponse.builder()
                .id(res.getId())
                .ubicacionId(res.getUbicacion().getId())
                .fotoPerfil(res.getFotoPerfil())
                .nombre(res.getNombre())
                .correo(res.getCorreo())
                .direccionCompleta(res.getDireccionCompleta())
                .esTasker(res.getEsTasker())
                .telefono(res.getTelefono())
                .biografia(res.getBiografia())
                .fechaCreacionTasker(res.getFechaCreacionTasker())
                .build();
    }

    public static List<UsuarioResponse> toDTOList(List<Usuario> usuarios) {
        return usuarios.stream().map(UsuarioMapper::toDTO).toList();
    }

    public static UsuarioResponse toDTOCard(Usuario res) {
        return UsuarioResponse.builder()
                .id(res.getId())
                .nombre(res.getNombre())
                .fotoPerfil(res.getFotoPerfil())
                .biografia(res.getBiografia())
                .fechaCreacionTasker(res.getFechaCreacionTasker())
                .build();
    }

    public static List<UsuarioResponse> toDTOCardList(List<Usuario> usuarios) {
        return usuarios.stream().map(UsuarioMapper::toDTOCard).toList();
    }

}

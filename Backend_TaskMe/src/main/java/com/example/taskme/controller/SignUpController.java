package com.example.taskme.controller;

import com.example.taskme.config.UserPrincipal;
import com.example.taskme.dto.request.usuario.UsuarioRequest;
import com.example.taskme.dto.response.GeneralResponse;
import com.example.taskme.dto.response.usuario.UsuarioResponse;
import com.example.taskme.service.UsuarioService;
import com.example.taskme.utils.JwtService;
import com.example.taskme.utils.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/taskme/api/registro")
public class SignUpController {

    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public SignUpController(UsuarioService usuarioService,
                            AuthenticationManager authenticationManager,
                            JwtService jwtService) {
        this.usuarioService = usuarioService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping()
    public ResponseEntity<GeneralResponse> createUsuario(@Valid @RequestBody UsuarioRequest req) {
        UsuarioResponse response = usuarioService.createUsuario(req);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getCorreo(),
                        req.getContrasena()
                )
        );

        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        Map<String, Object> claims = Map.of(
                "id", user.getId(),
                "correo", user.getUsername(),
                "esTasker", user.esTasker()
        );

        String token = jwtService.generateToken(claims, user.getUsername());


        Map<String, Object> data = new HashMap<>();
        data.put("id", response.getId());
        data.put("id_ubicacion", response.getUbicacionId());
        data.put("foto_perfil", response.getFotoPerfil());
        data.put("nombre_usuario", response.getNombre());
        data.put("correo_electronico", response.getCorreo());
        data.put("direccion_completa", response.getDireccionCompleta());
        data.put("es_tasker", response.getEsTasker());
        data.put("numero_telefono", response.getTelefono());
        data.put("tasker_biografia", response.getBiografia());
        data.put("fecha_creacion_tasker", response.getFechaCreacionTasker());
        data.put("token", token);

        return ResponseBuilder.buildResponse(
                "Usuario registrado exitosamente.",
                HttpStatus.CREATED,
                data
        );
    }
}
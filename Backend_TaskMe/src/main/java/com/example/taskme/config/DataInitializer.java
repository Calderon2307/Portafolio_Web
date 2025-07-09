package com.example.taskme.config;

import com.example.taskme.entities.Ubicacion;
import com.example.taskme.entities.Usuario;
import com.example.taskme.repository.UbicacionRepository;
import com.example.taskme.repository.UsuarioRepository;
import com.example.taskme.utils.Constants;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UsuarioRepository usuarioRepository;
    private final UbicacionRepository ubicacionRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        if (usuarioRepository.existsByCorreo(Constants.USER_ADMIN_EMAIL)) return;

        Ubicacion ubicacion = ubicacionRepository.findByNombrePaisAndNombreEstado(
                Constants.ADMIN_UBICACION, Constants.ADMIN_UBICACION
                ).orElseGet(() -> {
                    Ubicacion nueva = Ubicacion
                            .builder()
                            .nombrePais(Constants.ADMIN_UBICACION)
                            .nombreEstado(Constants.ADMIN_UBICACION)
                            .esSistema(true)
                            .build();
                    return ubicacionRepository.save(nueva);
        });

        Usuario admin = Usuario
                .builder()
                .ubicacion(ubicacion)
                .fotoPerfil("N/A")
                .nombre("Admin General")
                .correo(Constants.USER_ADMIN_EMAIL)
                .contrasena(passwordEncoder.encode("admin123"))
                .direccionCompleta("N/A")
                .esTasker(false)
                .esAdmin(true)
                .telefono("000000000")
                .biografia("Usuario Administrativo")
                .build();

        usuarioRepository.save(admin);
    }
}

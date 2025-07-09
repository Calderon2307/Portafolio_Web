package com.example.taskme.controller;

import com.example.taskme.config.UserPrincipal;
import com.example.taskme.dto.request.AuthRequest;
import com.example.taskme.dto.response.GeneralResponse;
import com.example.taskme.utils.JwtService;
import com.example.taskme.utils.ResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/taskme/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<GeneralResponse> login(@RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        String token = jwtService.generateToken(
                Map.of(
                        "id", user.getId(),
                        "esTasker", user.esTasker()
                ),
                user.getUsername()
        );

        return ResponseBuilder.buildResponse(
                "Autenticacion exitosa.",
                HttpStatus.OK,
                Map.of(
                        "token", token,
                        "id", user.getId(),
                        "correo", user.getUsername(),
                        "esTasker", user.esTasker()
                )
        );
    }
}

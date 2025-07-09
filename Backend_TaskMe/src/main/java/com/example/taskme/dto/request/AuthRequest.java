package com.example.taskme.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    @JsonProperty(value = "email")
    private String email;

    @JsonProperty(value = "password")
    private String password;
}

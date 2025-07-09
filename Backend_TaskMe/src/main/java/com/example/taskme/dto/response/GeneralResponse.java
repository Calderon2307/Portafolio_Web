package com.example.taskme.dto.response;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GeneralResponse {
    private String uri;
    private String message;
    private int status;
    private LocalDate time = LocalDate.now();
    private Object data;
}


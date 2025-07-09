package com.example.taskme.dto.response;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiErrorResponse {
    private Object message;
    private int status;
    private LocalDate time;
    private String uri;
}

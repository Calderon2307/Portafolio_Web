package com.example.taskme.utils;

import com.example.taskme.entities.enums.EstadoTrabajo;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class EstadoTrabajoConverter implements AttributeConverter<EstadoTrabajo, String> {
    @Override
    public String convertToDatabaseColumn(EstadoTrabajo estado) {
        return estado == null ? null : estado.name().toLowerCase();
    }

    @Override
    public EstadoTrabajo convertToEntityAttribute(String dbEstdo) {
        return dbEstdo == null ? null : EstadoTrabajo.valueOf(dbEstdo.toUpperCase());
    }
}

package com.example.taskme.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskerCategoriaId implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long usuarioId;
    private Long categoriaId;

    @Override
    public boolean equals(Object obj) {
        if ( this == obj ) return true;
        if( !(obj instanceof TaskerCategoriaId) ) return false;

        TaskerCategoriaId that = (TaskerCategoriaId) obj;

        return usuarioId.equals(that.usuarioId) && categoriaId.equals(that.categoriaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuarioId, categoriaId);
    }
}

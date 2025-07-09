package com.example.taskme.service.impl;

import com.example.taskme.dto.request.trabajo.TrabajoRequest;
import com.example.taskme.dto.request.trabajo.TrabajoUpdateRequest;
import com.example.taskme.dto.response.categoria.CategoriaResponse;
import com.example.taskme.dto.response.trabajo.TrabajoResponse;
import com.example.taskme.dto.response.ubicacion.UbicacionResponse;
import com.example.taskme.dto.response.usuario.UsuarioResponse;
import com.example.taskme.entities.Categoria;
import com.example.taskme.entities.Trabajo;
import com.example.taskme.entities.Ubicacion;
import com.example.taskme.entities.Usuario;
import com.example.taskme.entities.enums.EstadoTrabajo;
import com.example.taskme.exception.trabajo.TrabajoEstadoNotValidException;
import com.example.taskme.exception.trabajo.TrabajoNotFoundException;
import com.example.taskme.mapper.CategoriaMapper;
import com.example.taskme.mapper.TrabajoMapper;
import com.example.taskme.mapper.UbicacionMapper;
import com.example.taskme.mapper.UsuarioMapper;
import com.example.taskme.repository.TrabajoRepository;
import com.example.taskme.service.CategoriaService;
import com.example.taskme.service.TrabajoService;
import com.example.taskme.service.UbicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;

@Service
public class TrabajoServiceImpl implements TrabajoService {

    private final TrabajoRepository trabajoRepository;
    private final UsuarioServiceImpl usuarioService;
    private final CategoriaService categoriaService;
    private final UbicacionService ubicacionService;

    @Autowired
    public TrabajoServiceImpl(
            TrabajoRepository repository,
            UsuarioServiceImpl usuarioService,
            CategoriaService categoriaService,
            UbicacionService ubicacionService
    ) {
        this.trabajoRepository = repository;
        this.usuarioService = usuarioService;
        this.categoriaService = categoriaService;
        this.ubicacionService = ubicacionService;
    }

    //CREATE
    @Override
    @Transactional
    public TrabajoResponse createTrabajo(TrabajoRequest trabajo) {
        Usuario cliente = UsuarioMapper.fromResponse(usuarioService.findUsuarioById(trabajo.getCliente()));
        Usuario tasker = UsuarioMapper.fromResponse(usuarioService.findUsuarioById(trabajo.getTasker()));
        Categoria categoria = CategoriaMapper.toEntityFromDTO(categoriaService.findById(trabajo.getCategoria()));
        Ubicacion ubicacion = UbicacionMapper.toEntityFromDTO(ubicacionService.obtenerPorId(trabajo.getUbicacion()));

        return TrabajoMapper.toDTOResponse(
                trabajoRepository.save(
                        TrabajoMapper.toEntityCreate(
                                trabajo,
                                cliente,
                                tasker,
                                categoria,
                                ubicacion,
                                EstadoTrabajo.PENDIENTE
                        )
                ),
                LocalDateTime.now()
        );
    }

    //READ
    //Generales
    @Override
    public TrabajoResponse getTrabajoById(Long id) {
        return TrabajoMapper.toDTOResponse(
                trabajoRepository.findById(id).orElseThrow(() -> new TrabajoNotFoundException("Trabajo no encontrado")),
                LocalDateTime.now()
        );
    }

    @Override
    public List<TrabajoResponse> findAll() {
        return TrabajoMapper.toDTOResumeListResponse(trabajoRepository.findAll());
    }

    @Override
    public List<TrabajoResponse> findAllXCategoria(Long id) {
        CategoriaResponse categoriaExists = categoriaService.findById(id);
        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByCategoria_Id(id)
        );
    }

    @Override
    public List<TrabajoResponse> findAllXEstadoTrabajo(EstadoTrabajo estado) {
        switch (estado) {
            case PENDIENTE:
            case ACEPTADO:
            case FINALIZADO:
            case CANCELADO:
                break;
            default: throw new TrabajoEstadoNotValidException("El estado del trabajo no es valido");
        }
        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByEstadoTrabajo(estado)
        );
    }

    @Override
    public List<TrabajoResponse> findAllXUbicacion(Long idUbicacion) {
        UbicacionResponse ubicacionExists = ubicacionService.obtenerPorId(idUbicacion);
        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByUbicacion_Id(idUbicacion)
        );
    }

    //Especificos
    @Override
    public List<TrabajoResponse> findAllXCliente(Long idCliente) {
        UsuarioResponse clienteExists = usuarioService.findUsuarioById(idCliente);
        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByCliente_IdOrderByFechaInicioAsc(idCliente)
        );
    }

    @Override
    public List<TrabajoResponse> findAllXTasker(Long idTasker) {
        UsuarioResponse taskerExists = usuarioService.findUsuarioById(idTasker);
        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByTasker_IdOrderByFechaInicioAsc(idTasker)
        );
    }

    @Override
    public List<TrabajoResponse> findAllXCategoriaXCliente(Long idCategoria, Long idCliente) {
        UsuarioResponse clienteExists = usuarioService.findUsuarioById(idCliente);
        CategoriaResponse categoriaExists = categoriaService.findById(idCategoria);
        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByCategoria_IdAndCliente_IdOrderByFechaInicioAsc(
                        idCategoria,
                        idCliente
                )
        );
    }

    @Override
    public List<TrabajoResponse> findAllXCategoriaXTasker(Long idCategoria, Long idTasker) {
        UsuarioResponse taskerExists = usuarioService.findUsuarioById(idTasker);
        CategoriaResponse categoriaExists = categoriaService.findById(idCategoria);
        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByCategoria_IdAndTasker_IdOrderByFechaInicioAsc(
                        idCategoria,
                        idTasker
                )
        );
    }

    @Override
    public List<TrabajoResponse> findAllXUbicacionXCliente(Long idUbicacion, Long idCliente) {
        UsuarioResponse clienteExists = usuarioService.findUsuarioById(idCliente);
        UbicacionResponse ubicacionExists = ubicacionService.obtenerPorId(idUbicacion);
        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByUbicacion_IdAndCliente_IdOrderByFechaInicioAsc(
                        idUbicacion,
                        idCliente
                )
        );
    }

    @Override
    public List<TrabajoResponse> findAllXUbicacionXTasker(Long idUbicacion, Long idTasker) {
        UsuarioResponse taskerExists = usuarioService.findUsuarioById(idTasker);
        UbicacionResponse ubicacionExists = ubicacionService.obtenerPorId(idUbicacion);
        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByUbicacion_IdAndTasker_IdOrderByFechaInicioAsc(
                        idUbicacion,
                        idTasker
                )
        );
    }

    @Override
    public List<TrabajoResponse> findAllXEstadoTrabajoXCliente(EstadoTrabajo estado, Long idCliente) {
        switch (estado) {
            case PENDIENTE:
            case ACEPTADO:
            case FINALIZADO:
            case CANCELADO:
                break;
            default: throw new TrabajoEstadoNotValidException("El estado del trabajo no es valido");
        }
        UsuarioResponse clienteExists = usuarioService.findUsuarioById(idCliente);

        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByEstadoTrabajoAndCliente_IdOrderByFechaInicioAsc(
                        estado,
                        idCliente
                )
        );
    }

    @Override
    public List<TrabajoResponse> findAllXEstadoTrabajoXTasker(EstadoTrabajo estado, Long idTasker) {
        UsuarioResponse taskerExists = usuarioService.findUsuarioById(idTasker);

        EnumSet<EstadoTrabajo> estadosValidos = EnumSet.of(EstadoTrabajo.PENDIENTE, EstadoTrabajo.ACEPTADO, EstadoTrabajo.FINALIZADO, EstadoTrabajo.CANCELADO);
        if(!estadosValidos.contains(estado)) {
            throw new TrabajoEstadoNotValidException("El estado de trabajo no es valido.");
        }

        return TrabajoMapper.toDTOResumeListResponse(
                trabajoRepository.findAllByEstadoTrabajoAndTasker_IdOrderByFechaInicioAsc(
                        estado,
                        idTasker
                )
        );
    }

    //UPDATE
    @Override
    @Transactional
    public TrabajoResponse updateTrabajo(TrabajoUpdateRequest trabajo) {
        Categoria categoria = null;
        Ubicacion ubicacion = null;

        Trabajo trabajoExist = trabajoRepository.findById(trabajo.getId())
                .orElseThrow(() -> new TrabajoNotFoundException("Trabajo no encontrado"));

        if(trabajo.getCategoria() != null) categoria = CategoriaMapper.toEntityFromDTO(categoriaService.findById(trabajo.getCategoria()));
        if(trabajo.getUbicacion() != null) ubicacion = UbicacionMapper.toEntityFromDTO(ubicacionService.obtenerPorId(trabajo.getUbicacion()));

        TrabajoMapper.toEntityUpdate(
                trabajoExist,
                trabajo,
                categoria,
                ubicacion,
                EstadoTrabajo.valueOf(trabajo.getEstadoTrabajo())
        );

        return TrabajoMapper.toDTOResponse(
                trabajoRepository.save(trabajoExist),
                LocalDateTime.now()
        );
    }

    //DELETE
    @Override
    public TrabajoResponse deletTrabajo(Long id) {
        Trabajo trabajo = trabajoRepository.findById(id)
                .orElseThrow(() -> new TrabajoNotFoundException("Trabajo no encontrado"));
        trabajoRepository.deleteById(id);
        return TrabajoMapper.toDTOResponse(trabajo, LocalDateTime.now());
    }
}

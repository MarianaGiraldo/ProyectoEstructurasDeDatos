package com.graduacionunal.backend.services;

import java.util.List;

import com.graduacionunal.backend.models.Prerequisito;

public interface PrerequisitoService {
    Prerequisito crear(Integer idMateria, Integer idPrerequisito);
    void eliminar(Integer idMateria, Integer idPrerequisito);
    List<Prerequisito> listarPorPlan(Integer idPlan);
}

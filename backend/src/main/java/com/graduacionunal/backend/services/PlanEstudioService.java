package com.graduacionunal.backend.services;

import java.util.List;
import com.graduacionunal.backend.dto.PlanCreditosDTO;
import com.graduacionunal.backend.models.PlanEstudio;


public interface PlanEstudioService {
    List<PlanEstudio> obtenerTodos();
    PlanEstudio guardar(PlanEstudio planEstudio);
    List<PlanCreditosDTO> obtenerCreditosTotalesPorPlan();
    PlanEstudio obtenerPorId(Integer idPlanEstudio);
}

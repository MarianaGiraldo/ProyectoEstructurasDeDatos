package com.graduacionunal.backend.services;

import com.graduacionunal.backend.datastructures.KahnSemesterCalculator;
import com.graduacionunal.backend.dto.MateriaDTO;
import com.graduacionunal.backend.dto.PlanCreditosDTO;
import com.graduacionunal.backend.models.Materia;
import com.graduacionunal.backend.models.PlanEstudio;
import com.graduacionunal.backend.models.Prerequisito;
import com.graduacionunal.backend.repositories.MateriaRepository;
import com.graduacionunal.backend.repositories.PlanEstudioRepository;
import com.graduacionunal.backend.repositories.PrerequisitoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
// Implementacion para la interfaz PlanEstudioService

@Service
public class PlanEstudioServiceImpl implements PlanEstudioService {

    private final PlanEstudioRepository planEstudioRepository;
    private final MateriaRepository materiaRepository;
    private final PrerequisitoRepository prerequisitoRepository;
    private final KahnSemesterCalculator semesterCalculator = new KahnSemesterCalculator();

    public PlanEstudioServiceImpl(PlanEstudioRepository planEstudioRepository,
                                  MateriaRepository materiaRepository,
                                  PrerequisitoRepository prerequisitoRepository) {
        this.planEstudioRepository = planEstudioRepository;
        this.materiaRepository = materiaRepository;
        this.prerequisitoRepository = prerequisitoRepository;
    }

    @Override
    public List<PlanEstudio> obtenerTodos() {
        return planEstudioRepository.findAll();
    }

    @Override
    public PlanEstudio guardar(PlanEstudio planEstudio) {
        return planEstudioRepository.save(planEstudio);
    }

    @Override
    public List<PlanCreditosDTO> obtenerCreditosTotalesPorPlan() {
        return planEstudioRepository.obtenerCreditosTotalesPorPlan();
    }

    @Override
    public PlanEstudio obtenerPorId(Integer idPlanEstudio){
        return planEstudioRepository.findById(idPlanEstudio).orElse(null);
    }

    @Override
    public PlanEstudio eliminarPorId(Integer idPlanEstudio) {
        PlanEstudio planEstudio = planEstudioRepository.findById(idPlanEstudio).orElse(null);
        if (planEstudio != null) {
            planEstudioRepository.delete(planEstudio);
        }
        return planEstudio;
    }

    @Override
    public List<MateriaDTO> obtenerMateriasDePlanEstudio(Integer idPlanEstudio) {
        return planEstudioRepository.obtenerMateriasDePlanEstudio(idPlanEstudio);
    }

    @Override
    @Transactional(readOnly = true)
    public KahnSemesterCalculator.SemesterPlan calcularSemestres(Integer idPlanEstudio, int maxMateriasPorSemestre) {
        List<Materia> materias = materiaRepository.findByPlan(idPlanEstudio);
        List<Prerequisito> prerequisitos = prerequisitoRepository.findWithinPlan(idPlanEstudio);
        return semesterCalculator.calcularSemestresMinimos(materias, prerequisitos, maxMateriasPorSemestre);
    }
}

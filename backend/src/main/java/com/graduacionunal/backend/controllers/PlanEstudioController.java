package com.graduacionunal.backend.controllers;

import com.graduacionunal.backend.models.PlanEstudio;
import com.graduacionunal.backend.services.PlanEstudioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/planes")
public class PlanEstudioController {

    private final PlanEstudioService planEstudioService;

    public PlanEstudioController(PlanEstudioService planEstudioService) {
        this.planEstudioService = planEstudioService;
    }

    @GetMapping
    public List<PlanEstudio> obtenerTodosLosPlanes() {
        return planEstudioService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public PlanEstudio obtenerPlanPorId(@PathVariable Integer id) {
        return planEstudioService.obtenerPorId(id);
    }
    
    @PostMapping
    public PlanEstudio crearPlanEstudio(@RequestBody PlanEstudio planEstudio) {
        return planEstudioService.guardar(planEstudio);
    }
    
    @DeleteMapping("/{id}")
    public PlanEstudio eliminarPlanEstudio(@PathVariable Integer id) {
        return planEstudioService.eliminarPorId(id);
    }
}

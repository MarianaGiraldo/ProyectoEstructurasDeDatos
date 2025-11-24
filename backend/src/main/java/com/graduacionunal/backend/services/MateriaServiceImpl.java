package com.graduacionunal.backend.services;

import java.util.List;
import com.graduacionunal.backend.models.Materia;
import com.graduacionunal.backend.repositories.MateriaRepository;

//Clase que implementa la interfaz MateriaService
public class MateriaServiceImpl implements MateriaService {

    private final MateriaRepository materiaRepository;


    public MateriaServiceImpl(MateriaRepository materiaRepository){
        this.materiaRepository = materiaRepository;
    }

    @Override
    public List<Materia> obtenerTodos() { 
        return materiaRepository.findAll();
    }

    @Override
    public Materia guardar(Materia materia) {
        return materiaRepository.save(materia);
    }

}

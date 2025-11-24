package com.graduacionunal.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.graduacionunal.backend.models.Materia;

public interface MateriaRepository extends JpaRepository<Materia, Integer> {

}

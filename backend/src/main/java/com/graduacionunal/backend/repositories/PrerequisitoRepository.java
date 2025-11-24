package com.graduacionunal.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.graduacionunal.backend.models.Prerequisito;  
import com.graduacionunal.backend.models.PrerequisitoId;


public interface PrerequisitoRepository extends JpaRepository<Prerequisito, PrerequisitoId> {

}

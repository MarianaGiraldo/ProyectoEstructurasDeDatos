package com.graduacionunal.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.graduacionunal.backend.models.MateriaPorPlan;
import com.graduacionunal.backend.models.MateriaPorPlanId;

public interface MateriaPorPlanRepository extends JpaRepository<MateriaPorPlan, MateriaPorPlanId> {

}

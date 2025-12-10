START TRANSACTION;

-- (Opcional pero recomendado) aumenta el límite de recursión para el CTE
SET SESSION cte_max_recursion_depth = 2000;

-- 1) Crear el plan
INSERT INTO PlanEstudio (idPlan, nomPlan)
VALUES (6, 'Plan Mega (1000 materias)');

-- 2) Crear 1000 materias (158..1157)
WITH RECURSIVE seq AS (
  SELECT 158 AS id
  UNION ALL
  SELECT id + 1 FROM seq WHERE id < 1157
)
INSERT INTO Materia (idMateria, nomMateria, numCreditos)
SELECT
  id,
  CONCAT('Materia ', id, ' (Plan Mega)') AS nomMateria,
  (id % 4) + 1 AS numCreditos
FROM seq;

-- 3) Asignarlas al plan
WITH RECURSIVE seq AS (
  SELECT 158 AS id
  UNION ALL
  SELECT id + 1 FROM seq WHERE id < 1157
)
INSERT INTO MateriaPorPlan (idPlan, idMateria)
SELECT 6, id
FROM seq;

COMMIT;
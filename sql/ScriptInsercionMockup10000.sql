-- MySQL 5.7+ / 8+ : Otro plan con 10.000 materias (sin WITH RECURSIVE)

START TRANSACTION;

SET @plan_id  := 7;
SET @base_id  := 1158;   -- primera materia del nuevo plan
SET @cantidad := 10000;  -- 10.000 materias

-- 1) Crear el plan
INSERT INTO PlanEstudio (idPlan, nomPlan)
VALUES (@plan_id, 'Plan Giga (10000 materias)');

-- 2) Crear tabla temporal con números 0..9999
CREATE TEMPORARY TABLE tmp_nums (
  n INT NOT NULL PRIMARY KEY
);

INSERT INTO tmp_nums (n)
SELECT
  ones.i + tens.i * 10 + hundreds.i * 100 + thousands.i * 1000 AS n
FROM
  (SELECT 0 i UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
   UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) ones
CROSS JOIN
  (SELECT 0 i UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
   UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) tens
CROSS JOIN
  (SELECT 0 i UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
   UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) hundreds
CROSS JOIN
  (SELECT 0 i UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
   UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) thousands;

-- 3) Insertar 10.000 materias (ids @base_id .. @base_id+9999)
INSERT INTO Materia (idMateria, nomMateria, numCreditos)
SELECT
  @base_id + n AS idMateria,
  CONCAT('Materia ', @base_id + n, ' (Plan Giga)') AS nomMateria,
  ((@base_id + n) % 4) + 1 AS numCreditos
FROM tmp_nums
WHERE n < @cantidad;

-- 4) Asignarlas al plan
INSERT INTO MateriaPorPlan (idPlan, idMateria)
SELECT
  @plan_id,
  @base_id + n
FROM tmp_nums
WHERE n < @cantidad;

DROP TEMPORARY TABLE tmp_nums;

COMMIT;

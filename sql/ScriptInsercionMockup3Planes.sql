-- Script de inserción de datos MOCKUP para 3 planes (>=30 materias c/u)
-- Nota: este script asume que ya existen las tablas: PlanEstudio, Materia, MateriaPorPlan, Prerequisito.
-- Usa IDs nuevos (idPlan 3-5 e idMateria 68-157) para evitar colisiones con el script previo.

BEGIN;

-- =========================================================
-- 1) Insertar planes de estudio (3 planes)
-- =========================================================
INSERT INTO PlanEstudio (idPlan, nomPlan) VALUES
(3, 'Ingeniería Industrial'),
(4, 'Ingeniería Mecánica'),
(5, 'Ingeniería Biomédica');

-- =========================================================
-- 2) Insertar materias (90 materias: 30 por plan)
--    Rango: 68 - 157
-- =========================================================
INSERT INTO Materia (idMateria, nomMateria, numCreditos) VALUES
-- -------------------------
-- Plan 3: Ingeniería Industrial (68-97)
-- -------------------------
(68, 'Cálculo I (Industrial)', 4),
(69, 'Cálculo II (Industrial)', 4),
(70, 'Álgebra lineal (Industrial)', 4),
(71, 'Física I (Industrial)', 4),
(72, 'Física II (Industrial)', 4),
(73, 'Química general (Industrial)', 3),
(74, 'Programación para ingeniería (Industrial)', 3),
(75, 'Estadística I', 3),
(76, 'Estadística II', 3),
(77, 'Economía I', 3),
(78, 'Economía II', 3),
(79, 'Contabilidad y costos', 3),
(80, 'Procesos y operaciones', 3),
(81, 'Gestión de operaciones', 3),
(82, 'Ingeniería de métodos', 3),
(83, 'Ergonomía y seguridad industrial', 3),
(84, 'Investigación de operaciones I', 3),
(85, 'Investigación de operaciones II', 3),
(86, 'Simulación de sistemas', 3),
(87, 'Gestión de calidad', 3),
(88, 'Lean Manufacturing', 3),
(89, 'Logística y cadena de suministro', 3),
(90, 'Planeación y control de producción', 3),
(91, 'Gestión de proyectos (Industrial)', 3),
(92, 'Analítica de datos para decisiones', 3),
(93, 'Sistemas de información (Industrial)', 3),
(94, 'Emprendimiento e innovación', 2),
(95, 'Formulación y evaluación de proyectos', 3),
(96, 'Ética y responsabilidad social', 2),
(97, 'Trabajo de grado (Industrial)', 4),

-- -------------------------
-- Plan 4: Ingeniería Mecánica (98-127)
-- -------------------------
(98,  'Cálculo I (Mecánica)', 4),
(99,  'Cálculo II (Mecánica)', 4),
(100, 'Álgebra lineal (Mecánica)', 4),
(101, 'Física I (Mecánica)', 4),
(102, 'Física II (Mecánica)', 4),
(103, 'Dibujo y CAD', 3),
(104, 'Materiales de ingeniería', 3),
(105, 'Estática', 3),
(106, 'Dinámica', 3),
(107, 'Mecánica de sólidos I', 3),
(108, 'Mecánica de sólidos II', 3),
(109, 'Termodinámica I', 3),
(110, 'Termodinámica II', 3),
(111, 'Mecánica de fluidos I', 3),
(112, 'Mecánica de fluidos II', 3),
(113, 'Transferencia de calor', 3),
(114, 'Diseño de elementos de máquinas', 3),
(115, 'Manufactura y procesos', 3),
(116, 'Metrología', 2),
(117, 'Control y automatización', 3),
(118, 'Vibraciones mecánicas', 3),
(119, 'Máquinas térmicas', 3),
(120, 'Diseño mecánico asistido por computador', 3),
(121, 'Sistemas hidráulicos y neumáticos', 3),
(122, 'Mantenimiento industrial', 3),
(123, 'Energías renovables (Mecánica)', 3),
(124, 'Gestión de proyectos (Mecánica)', 3),
(125, 'Diseño de plantas', 3),
(126, 'Ética profesional', 2),
(127, 'Trabajo de grado (Mecánica)', 4),

-- -------------------------
-- Plan 5: Ingeniería Biomédica (128-157)
-- -------------------------
(128, 'Cálculo I (Biomédica)', 4),
(129, 'Cálculo II (Biomédica)', 4),
(130, 'Álgebra lineal (Biomédica)', 4),
(131, 'Física I (Biomédica)', 4),
(132, 'Física II (Biomédica)', 4),
(133, 'Biología celular', 3),
(134, 'Química orgánica', 3),
(135, 'Anatomía y fisiología I', 3),
(136, 'Anatomía y fisiología II', 3),
(137, 'Bioquímica', 3),
(138, 'Programación para bioingeniería', 3),
(139, 'Señales y sistemas (Biomédica)', 3),
(140, 'Electrónica I (Biomédica)', 3),
(141, 'Electrónica II (Biomédica)', 3),
(142, 'Instrumentación biomédica I', 3),
(143, 'Instrumentación biomédica II', 3),
(144, 'Biomecánica', 3),
(145, 'Biomateriales', 3),
(146, 'Procesamiento de señales biomédicas I', 3),
(147, 'Procesamiento de señales biomédicas II', 3),
(148, 'Imágenes médicas I', 3),
(149, 'Imágenes médicas II', 3),
(150, 'Sistemas embebidos para salud', 3),
(151, 'Telemedicina y salud digital', 3),
(152, 'Regulación y gestión de tecnología médica', 3),
(153, 'Gestión de proyectos (Biomédica)', 3),
(154, 'Bioestadística', 3),
(155, 'Ética en salud y bioética', 2),
(156, 'Diseño centrado en el usuario (Dispositivos médicos)', 2),
(157, 'Trabajo de grado (Biomédica)', 4);

-- =========================================================
-- 3) Asignar materias a cada plan (30 materias por plan)
-- =========================================================

-- Plan 3: Ingeniería Industrial (30 materias)
INSERT INTO MateriaPorPlan (idPlan, idMateria) VALUES
(3, 68), (3, 69), (3, 70), (3, 71), (3, 72), (3, 73),
(3, 74), (3, 75), (3, 76), (3, 77), (3, 78), (3, 79),
(3, 80), (3, 81), (3, 82), (3, 83), (3, 84), (3, 85),
(3, 86), (3, 87), (3, 88), (3, 89), (3, 90), (3, 91),
(3, 92), (3, 93), (3, 94), (3, 95), (3, 96), (3, 97);

-- Plan 4: Ingeniería Mecánica (30 materias)
INSERT INTO MateriaPorPlan (idPlan, idMateria) VALUES
(4, 98), (4, 99), (4, 100), (4, 101), (4, 102), (4, 103),
(4, 104), (4, 105), (4, 106), (4, 107), (4, 108), (4, 109),
(4, 110), (4, 111), (4, 112), (4, 113), (4, 114), (4, 115),
(4, 116), (4, 117), (4, 118), (4, 119), (4, 120), (4, 121),
(4, 122), (4, 123), (4, 124), (4, 125), (4, 126), (4, 127);

-- Plan 5: Ingeniería Biomédica (30 materias)
INSERT INTO MateriaPorPlan (idPlan, idMateria) VALUES
(5, 128), (5, 129), (5, 130), (5, 131), (5, 132), (5, 133),
(5, 134), (5, 135), (5, 136), (5, 137), (5, 138), (5, 139),
(5, 140), (5, 141), (5, 142), (5, 143), (5, 144), (5, 145),
(5, 146), (5, 147), (5, 148), (5, 149), (5, 150), (5, 151),
(5, 152), (5, 153), (5, 154), (5, 155), (5, 156), (5, 157);

-- =========================================================
-- 4) Prerrequisitos (mockup, algunos ejemplos)
-- =========================================================
INSERT INTO Prerequisito (idMateria, idPrerequisito) VALUES
-- Industrial
(69, 68),  -- Cálculo II -> Cálculo I
(76, 75),  -- Estadística II -> Estadística I
(78, 77),  -- Economía II -> Economía I
(85, 84),  -- IO II -> IO I
(90, 81),  -- Planeación y control -> Gestión de operaciones
(95, 91),  -- Evaluación de proyectos -> Gestión de proyectos

-- Mecánica
(99, 98),    -- Cálculo II -> Cálculo I
(102, 101),  -- Física II -> Física I
(106, 105),  -- Dinámica -> Estática
(108, 107),  -- Mec. sólidos II -> Mec. sólidos I
(110, 109),  -- Termodinámica II -> Termodinámica I
(112, 111),  -- Fluidos II -> Fluidos I
(119, 110),  -- Máquinas térmicas -> Termodinámica II

-- Biomédica
(129, 128),  -- Cálculo II -> Cálculo I
(136, 135),  -- Anatomía II -> Anatomía I
(141, 140),  -- Electrónica II -> Electrónica I
(143, 142),  -- Instrumentación II -> Instrumentación I
(147, 146),  -- Proc. señales II -> Proc. señales I
(149, 148);  -- Imágenes II -> Imágenes I

COMMIT;

-- =========================================================
-- 5) Validaciones rápidas (opcional)
-- =========================================================
-- Cantidad de materias por plan (debe ser >= 30)
-- SELECT idPlan, COUNT(*) AS totalMaterias
-- FROM MateriaPorPlan
-- WHERE idPlan IN (3,4,5)
-- GROUP BY idPlan;

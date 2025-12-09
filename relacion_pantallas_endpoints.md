# Relacion entre pantallas del frontend y endpoints (API)

Este documento mapea las pantallas/mockups del frontend con los endpoints implementados en el backend.

## Endpoints implementados en el backend

### Planes de estudio (`/api/planes`)
- `GET /api/planes` -> Listar planes.
- `GET /api/planes/{id}` -> Detalle del plan (incluye materias en la respuesta).
- `POST /api/planes` -> Crear plan.
- `DELETE /api/planes/{id}` -> Eliminar plan.
- `GET /api/planes/{id}/materias` -> Materias del plan.
- `POST /api/planes/{id}/materias/{idMateria}` -> Asignar una materia existente a un plan.
- `DELETE /api/planes/{id}/materias/{idMateria}` -> Desasignar materia de un plan.
- `GET /api/planes/creditos` -> Creditos totales por plan.
- `GET /api/planes/{id}/semestres?max={L}` -> Calcular plan de semestres (devuelve **409** si detecta ciclo).

### Materias (`/api/materias`)
- `GET /api/materias` -> Listar materias.
- `GET /api/materias/{id}` -> Consultar materia por id.
- `POST /api/materias` -> Crear materia.
- `DELETE /api/materias/{id}` -> Eliminar materia.

### Prerrequisitos (`/api/prerequisitos`)
- `POST /api/prerequisitos` -> Crear relacion prerrequisito (body: `{ idMateria, idPrerequisito }`).
- `GET /api/prerequisitos/plan/{planId}` -> Listar prerrequisitos del plan.
- `GET /api/prerequisitos/materia/{idMateria}/entrantes` -> Prerrequisitos que requiere una materia (edges entrantes).
- `GET /api/prerequisitos/materia/{idMateria}/salientes` -> Materias que dependen de la materia dada (edges salientes).
- `DELETE /api/prerequisitos/{idMateria}/{idPrerequisito}` -> Eliminar relacion.

---

## Relacion Pantallas -> Endpoints

### 1) Home / "Planes de estudio" (mockup pmv1)
Objetivo UI: mostrar lista de planes, buscarlos, y crear un nuevo plan.

- Cargar lista de planes: `GET /api/planes`
- Mostrar creditos por plan en la tarjeta/lista: `GET /api/planes/creditos`
- Crear plan ("+ Crear nuevo plan de estudios"): `POST /api/planes`
- (Opcional) Eliminar plan desde listado: `DELETE /api/planes/{id}`

### 2) Detalle plan / Tab "Resumen" (mockup pmv2_1)
Objetivo UI: mostrar nombre/codigo/creditos totales/materias totales del plan.

- Cargar datos del plan: `GET /api/planes/{id}`
- (Si se calcula "materias totales" desde endpoint dedicado): `GET /api/planes/{id}/materias`
- (Si el resumen muestra resultado de simulacion): `GET /api/planes/{id}/semestres?max={L}`

### 3) Detalle plan / Tab "Materias" (mockup pmv2_2)
Objetivo UI: listar materias del plan, buscar, agregar y eliminar.

- Listar materias del plan: `GET /api/planes/{id}/materias`
- Crear materia nueva (si no existe): `POST /api/materias`
- Asignar materia existente al plan: `POST /api/planes/{id}/materias/{idMateria}`
- Desasignar materia del plan: `DELETE /api/planes/{id}/materias/{idMateria}`
- Ver detalle de una materia (si aplica): `GET /api/materias/{idMateria}`

### 4) Detalle plan / Tab "Prerrequisitos" (mockup pmv2_3)
Objetivo UI: visualizar dependencias (entrantes/salientes) de una materia, y agregar/eliminar relaciones.

- Poblacion del selector "Seleccionar materia": `GET /api/planes/{id}/materias`
- Traer todas las relaciones del plan: `GET /api/prerequisitos/plan/{planId}`
- Consultar dependencias de una materia especifica (sin filtrar en frontend):
  - Entrantes: `GET /api/prerequisitos/materia/{idMateria}/entrantes`
  - Salientes: `GET /api/prerequisitos/materia/{idMateria}/salientes`
- Agregar relacion ("+ Agregar"): `POST /api/prerequisitos`
- Eliminar relacion ("- Eliminar"): `DELETE /api/prerequisitos/{idMateria}/{idPrerequisito}`

### 5) Detalle plan / Tab "Configuracion" (mockup pmv2_4)
Objetivo UI: guardar reglas como "materias por semestre", "creditos por semestre" y "restricciones adicionales".

- Hoy, el backend solo usa el parametro **L** (maximo de materias por semestre) al calcular semestres:
  - `GET /api/planes/{id}/semestres?max={L}`
- No hay endpoint para persistir configuracion por plan; se espera usar valor del frontend.

### 6) Detalle plan / Tab "Simulacion" (mockup pmv2_5)
Objetivo UI: calcular el plan por semestres, mostrar semestres y permitir descargar.

- Calcular plan: `GET /api/planes/{id}/semestres?max={L}`
  - Si hay ciclo / plan invalido: la API responde `409 CONFLICT`.
- Datos auxiliares del plan (codigo/creditos): `GET /api/planes/{id}`

---

## Checklist de "que falta" para que los mockups sean 100% funcionales

1. Persistencia de configuracion por plan (materias/creditos por semestre y restricciones).
2. Soporte de reglas adicionales en el motor de calculo (creditos por semestre / restricciones).

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Materias.css";

const API_BASE_URL = "http://localhost:8080/api";

export default function Materias({ planId }) {
  const params = useParams();
  const actualPlanId = planId || params.id || null;
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMateria, setNewMateria] = useState({ nombre: "", codigo: "", creditos: 0 });
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!actualPlanId) return;
    if (actualPlanId === "demo") {
      setMaterias([
        { id: "m1", nombre: "Introducción a la Ingeniería", codigo: "ING101", creditos: 3 },
        { id: "m2", nombre: "Matemáticas I", codigo: "MAT101", creditos: 4 },
        { id: "m3", nombre: "Programación", codigo: "PROG101", creditos: 4 },
      ]);
      return;
    }
    fetchMaterias();
  }, [actualPlanId]);

  const fetchMaterias = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/planes/${actualPlanId}/materias`);
      if (!res.ok) throw new Error("Error al obtener materias");
      const data = await res.json();
      setMaterias(data || []);
    } catch (e) {
      console.error(e);
      setNote("No se pudieron cargar materias.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMateria = async () => {
    if (!newMateria.nombre || !newMateria.codigo) {
      setNote("Complete nombre y código.");
      return;
    }
    try {
      if (actualPlanId === "demo") {
        // simulate creation locally
        const id = `dm_${Date.now()}`;
        const created = { id, ...newMateria };
        setMaterias(prev => [...prev, created]);
        setNote("Materia creada (demo)");
        setNewMateria({ nombre: "", codigo: "", creditos: 0 });
        return;
      }
      const res = await fetch(`${API_BASE_URL}/materias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMateria),
      });
      if (!res.ok) throw new Error("Error creando materia");
      const created = await res.json();
      setNote("Materia creada.");
      // If planId exists, assign it to the plan
      if (actualPlanId) {
        const asRes = await fetch(`${API_BASE_URL}/planes/${actualPlanId}/materias/${created.id}`, { method: "POST" });
        if (!asRes.ok) throw new Error("Error asignando materia al plan");
        setNote("Materia creada y asignada al plan.");
        fetchMaterias();
      }
      setNewMateria({ nombre: "", codigo: "", creditos: 0 });
    } catch (e) {
      console.error(e);
      setNote("Error al crear/ asignar materia.");
    }
  };

  const handleRemoveMateriaFromPlan = async (idMateria) => {
    if (!confirm("Desasignar materia del plan?")) return;
    try {
      if (actualPlanId === "demo") {
        setMaterias(prev => prev.filter(m => m.id !== idMateria));
        setNote("Materia desasignada (demo)");
        return;
      }
      const res = await fetch(`${API_BASE_URL}/planes/${actualPlanId}/materias/${idMateria}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error desasignando materia");
      setNote("Materia desasignada");
      fetchMaterias();
    } catch (e) {
      console.error(e);
      setNote("Error al desasignar materia");
    }
  };

  if (!planId) {
    return (
      <div className="Materias page-placeholder">
        <h3>Materias</h3>
        <p>Introduce un `planId` para ver materias o usa la navegación demo desde Home.</p>
      </div>
    );
  }

  return (
    <div className="Materias">
      <h3>Materias del plan</h3>
      {note && <div className="note">{note}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="materias-list">
          {materias.length === 0 && <div>No hay materias asignadas</div>}
          {materias.map(m => (
            <div key={m.id} className="materia-card">
              <div className="materia-left">
                <div className="materia-name">{m.nombre}</div>
                <div className="materia-code">{m.codigo}</div>
              </div>
              <div className="materia-right">
                <div className="materia-credits">{m.creditos || m.creditosAsignados || 0} cr</div>
                <button className="btn-remove" onClick={() => handleRemoveMateriaFromPlan(m.id)}>Desasignar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="create-materia">
        <h4>Crear nueva materia</h4>
        <input placeholder="Nombre" value={newMateria.nombre} onChange={e => setNewMateria({ ...newMateria, nombre: e.target.value })} />
        <input placeholder="Código" value={newMateria.codigo} onChange={e => setNewMateria({ ...newMateria, codigo: e.target.value })} />
        <input type="number" placeholder="Créditos" value={newMateria.creditos} onChange={e => setNewMateria({ ...newMateria, creditos: Number(e.target.value) })} />
        <div className="create-actions">
          <button className="btn-create" onClick={handleCreateMateria}>Crear</button>
        </div>
      </div>
    </div>
  );
}

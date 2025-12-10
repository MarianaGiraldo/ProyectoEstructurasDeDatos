import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Prerrequisitos.css";

const API_BASE_URL = "http://localhost:8088/api";

export default function Prerrequisitos({ planId }) {
  const params = useParams();
  const actualPlanId = planId || params.id || null;
  const [relations, setRelations] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ idMateria: "", idPrerequisito: "" });
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!actualPlanId) return;
    if (actualPlanId === "demo") {
      const mockMaterias = [
        { id: "m1", nombre: "Introducción a la Ingeniería", codigo: "ING101" },
        { id: "m2", nombre: "Matemáticas I", codigo: "MAT101" },
        { id: "m3", nombre: "Programación", codigo: "PROG101" },
      ];
      setMaterias(mockMaterias);
      setRelations([
        { idMateria: "m3", idPrerequisito: "m1" },
        { idMateria: "m3", idPrerequisito: "m2" },
      ]);
      return;
    }
    fetchAll();
  }, [actualPlanId]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [rRes, mRes] = await Promise.all([
        fetch(`${API_BASE_URL}/prerequisitos/plan/${planId}`),
        fetch(`${API_BASE_URL}/planes/${planId}/materias`),
      ]);
      if (!rRes.ok) throw new Error("Error cargando prerrequisitos");
      if (!mRes.ok) throw new Error("Error cargando materias");
      const rData = await rRes.json();
      const mData = await mRes.json();
      setRelations(rData || []);
      setMaterias(mData || []);
    } catch (e) {
      console.error(e);
      setNote("No se pudieron cargar datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.idMateria || !form.idPrerequisito) {
      setNote("Selecciona ambas materias.");
      return;
    }
    try {
      if (actualPlanId === "demo") {
        setRelations(prev => [...prev, { idMateria: form.idMateria, idPrerequisito: form.idPrerequisito }]);
        setNote("Relación creada (demo)");
        setForm({ idMateria: "", idPrerequisito: "" });
        return;
      }
      const res = await fetch(`${API_BASE_URL}/prerequisitos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idMateria: form.idMateria, idPrerequisito: form.idPrerequisito }),
      });
      if (!res.ok) throw new Error("Error creando relación");
      setNote("Relación creada");
      setForm({ idMateria: "", idPrerequisito: "" });
      fetchAll();
    } catch (e) {
      console.error(e);
      setNote("Error al crear relación");
    }
  };

  const handleDelete = async (idM, idP) => {
    if (!confirm("Eliminar relación?")) return;
    try {
      if (actualPlanId === "demo") {
        setRelations(prev => prev.filter(r => !(r.idMateria === idM && r.idPrerequisito === idP)));
        setNote("Relación eliminada (demo)");
        return;
      }
      const res = await fetch(`${API_BASE_URL}/prerequisitos/${idM}/${idP}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando relación");
      setNote("Relación eliminada");
      fetchAll();
    } catch (e) {
      console.error(e);
      setNote("Error al eliminar relación");
    }
  };

  if (!planId) {
    return (
      <div className="Prerrequisitos page-placeholder">
        <h3>Prerrequisitos</h3>
        <p>Introduce un `planId` para ver relaciones o usa la navegación demo desde Home.</p>
      </div>
    );
  }

  // build lookup map and group relations by target materia
  const materiasMap = Object.fromEntries(materias.map(m => [m.id, m]));
  const grouped = {};
  relations.forEach(r => {
    if (!grouped[r.idMateria]) grouped[r.idMateria] = [];
    grouped[r.idMateria].push(r.idPrerequisito);
  });

  return (
    <div className="Prerrequisitos">
      <h3>Prerrequisitos del plan</h3>
      {note && <div className="note">{note}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="relations-list">
          {Object.keys(grouped).length === 0 && <div>No hay relaciones registradas</div>}
          {Object.entries(grouped).map(([idMateria, prereqIds]) => {
            const target = materiasMap[idMateria] || { nombre: idMateria, codigo: idMateria };
            return (
              <div key={idMateria} className="relation-card">
                <div className="relation-materia">
                  <div className="name">{target.nombre}</div>
                  <div className="code">{target.codigo}</div>
                </div>

                <div className="relation-prereqs">
                  {prereqIds.map(pid => {
                    const p = materiasMap[pid] || { nombre: pid, codigo: pid };
                    return (
                      <span className="prereq-badge" key={`${idMateria}-${pid}`}>
                        {p.nombre} <span className="badge-code">({p.codigo})</span>
                        <button className="btn-del-small" onClick={() => handleDelete(idMateria, pid)} title="Eliminar relación">×</button>
                      </span>
                    );
                  })}
                </div>

                <div className="relation-actions">
                  {/* reserved for future actions per target */}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="add-relation">
        <h4>Agregar relación</h4>
        <select value={form.idMateria} onChange={e => setForm({ ...form, idMateria: e.target.value })}>
          <option value="">Seleccionar materia</option>
          {materias.map(m => <option key={m.id} value={m.id}>{m.nombre} ({m.codigo})</option>)}
        </select>
        <select value={form.idPrerequisito} onChange={e => setForm({ ...form, idPrerequisito: e.target.value })}>
          <option value="">Seleccionar prerrequisito</option>
          {materias.map(m => <option key={m.id} value={m.id}>{m.nombre} ({m.codigo})</option>)}
        </select>
        <div className="add-actions">
          <button className="btn-add" onClick={handleAdd}>Agregar</button>
        </div>
      </div>
    </div>
  );
}

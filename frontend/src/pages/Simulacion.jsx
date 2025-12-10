import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Simulacion.css";

const API_BASE_URL = "http://localhost:8080/api";

export default function Simulacion({ planId }) {
  const params = useParams();
  const actualPlanId = planId || params.id || null;
  const [L, setL] = useState(5);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [materiasMap, setMateriasMap] = useState({});

  useEffect(() => {
    if (!actualPlanId) return;
    try {
      const raw = localStorage.getItem(`config_plan_${actualPlanId}`);
      if (raw) {
        const cfg = JSON.parse(raw);
        if (cfg.L) setL(cfg.L);
      }
    } catch {
      // silent
    }
  }, [actualPlanId]);

  // Fetch materias to build codigo->nombre map
  useEffect(() => {
    if (!actualPlanId) return;
    if (actualPlanId === "demo") {
      const mockMap = {
        "ING101": "Introducción a la Ingeniería",
        "MAT101": "Matemáticas I",
        "PROG101": "Programación"
      };
      setMateriasMap(mockMap);
      return;
    }

    const fetchMaterias = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/planes/${actualPlanId}/materias`);
        if (res.ok) {
          const data = await res.json();
          const map = {};
          if (Array.isArray(data)) {
            data.forEach(m => {
              if (m.codigo) {
                map[m.codigo] = m.nombre || m.codigo;
              } else if (m.id) {
                map[m.id] = m.nombre || m.id;
              }
            });
          }
          setMateriasMap(map);
        }
      } catch (e) {
        console.error("Error fetching materias:", e);
      }
    };

    fetchMaterias();
  }, [actualPlanId]);

  const handleCalcular = async () => {
    if (!actualPlanId) {
      setNote("Selecciona un plan o usa la navegación demo desde Home.");
      return;
    }
    try {
      setLoading(true);
      setResult(null);
      setNote("");
      if (actualPlanId === "demo") {
        const mock = [["ING101", "MAT101"], ["PROG101"]];
        setResult(mock);
        return;
      }
      const res = await fetch(`${API_BASE_URL}/planes/${actualPlanId}/semestres?max=${L}`);
      if (res.status === 409) {
        setNote("Error: el plan tiene dependencias cíclicas (409)");
        return;
      }
      if (!res.ok) throw new Error("Error en simulación");
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setNote("Error al calcular semestres");
    } finally {
      setLoading(false);
    }
  };

  if (!planId) {
    return (
      <div className="Simulacion page-placeholder">
        <h3>Simulación</h3>
        <p>Introduce un `planId` para calcular semestres o usa la navegación demo desde Home.</p>
      </div>
    );
  }

  return (
    <div className="Simulacion">
      <h2>Simulación de semestres</h2>
      <div className="sim-controls">
        <label>
          Máx materias por semestre (L):
          <input
            type="number"
            min={1}
            value={L}
            onChange={(e) => setL(Number(e.target.value) || 1)}
          />
        </label>
        <button className="btn-calc" onClick={handleCalcular} disabled={loading}>
          {loading ? "Calculando..." : "Calcular"}
        </button>
      </div>

      {note && <div className="error-note">{note}</div>}

      {result && (
        <div className="semestres-container">
          <h3 className="result-title">Resultado de semestres</h3>
          <div className="semestres-grid">
            {Array.isArray(result)
              ? result.map((sem, idx) => (
                  <div key={idx} className="semestre-card">
                    <div className="semestre-header">
                      <h4>Semestre {idx + 1}</h4>
                      <span className="materias-count">{sem.length || 0} materias</span>
                    </div>
                    <div className="semestre-materias">
                      {Array.isArray(sem) && sem.length > 0
                        ? sem.map((m, i) => {
                            const code = typeof m === "string" || typeof m === "number" ? m : m.codigo || m.id || JSON.stringify(m);
                            const nombre = materiasMap[code] || (typeof m === "object" && m.nombre) || code;
                            return (
                              <div key={i} className="materia-item">
                                <span className="materia-code">{nombre}</span>
                              </div>
                            );
                          })
                        : <div className="empty-msg">Sin materias en este semestre</div>}
                    </div>
                  </div>
                ))
              : <pre>{JSON.stringify(result, null, 2)}</pre>}
          </div>
        </div>
      )}
    </div>
  );
}

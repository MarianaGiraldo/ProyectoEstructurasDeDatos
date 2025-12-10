import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Resumen.css";

const API_BASE_URL = "http://localhost:8088/api";

export default function Resumen({ planId }) {
  const params = useParams();
  const actualPlanId = planId || params.id || null;
  const [plan, setPlan] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [semestresResult, setSemestresResult] = useState(null);
  const [L, setL] = useState(5);

  useEffect(() => {
    if (!actualPlanId) return;
    if (actualPlanId === "demo") {
      // mock data for demo
      setPlan({ id: "demo", nombre: "Plan Demo - Ingeniería", codigo: "DEMO-01", creditos: 160 });
      setMaterias([
        { id: "m1", nombre: "Introducción a la Ingeniería", codigo: "ING101", creditos: 3 },
        { id: "m2", nombre: "Matemáticas I", codigo: "MAT101", creditos: 4 },
        { id: "m3", nombre: "Programación", codigo: "PROG101", creditos: 4 },
      ]);
      return;
    }

    const fetchPlanLocal = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/planes/${planId}`);
        if (!res.ok) throw new Error("Error al obtener plan");
        const data = await res.json();
        setPlan(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const fetchMateriasLocal = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/planes/${planId}/materias`);
        if (!res.ok) throw new Error("Error al obtener materias");
        const data = await res.json();
        setMaterias(data || []);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPlanLocal();
    fetchMateriasLocal();
  }, [actualPlanId, planId]);

  const handleCalcularSemestres = async () => {
    try {
      setSemestresResult(null);
      if (actualPlanId === "demo") {
        // provide mock semestres
        const mock = [["ING101", "MAT101"], ["PROG101"]];
        setSemestresResult({ data: mock });
        return;
      }
      const res = await fetch(`${API_BASE_URL}/planes/${actualPlanId}/semestres?max=${L}`);
      if (res.status === 409) {
        setSemestresResult({ error: "El plan tiene dependencias cíclicas (409 CONFLICT)" });
        return;
      }
      if (!res.ok) throw new Error("Error al calcular semestres");
      const data = await res.json();
      setSemestresResult({ data });
    } catch (e) {
      console.error(e);
      setSemestresResult({ error: "Error al calcular semestres" });
    }
  };

  if (!planId) {
    return (
      <div className="Resumen">
        <div className="placeholder">Selecciona un plan para ver el resumen.</div>
      </div>
    );
  }

  return (
    <div className="Resumen">
      <div className="resumen-header">
        <h2>Resumen del plan</h2>
        <div className="plan-ident">
          <div className="plan-name">{plan ? plan.nombre : "-"}</div>
          <div className="plan-code">{plan ? plan.codigo : "-"}</div>
        </div>
      </div>

      <div className="resumen-body">
        <div className="stats">
          <div className="stat-card">
            <div className="stat-label">Créditos totales</div>
            <div className="stat-value">{plan?.creditos || plan?.creditosTotales || "-"}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Materias totales</div>
            <div className="stat-value">{materias.length}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Código</div>
            <div className="stat-value">{plan?.codigo || "-"}</div>
          </div>
        </div>

        <div className="simulacion-box">
          <h3>Calcular semestres</h3>
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
            <button className="btn-calc" onClick={handleCalcularSemestres}>Calcular</button>
          </div>

          {semestresResult ? (
            semestresResult.error ? (
              <div className="error">{semestresResult.error}</div>
            ) : (
              <div className="semestres-result">
                <h4>Resultado</h4>
                <pre>{JSON.stringify(semestresResult.data, null, 2)}</pre>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

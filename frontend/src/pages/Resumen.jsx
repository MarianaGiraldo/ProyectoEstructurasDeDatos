import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./Resumen.css";

const API_BASE_URL = "http://localhost:8088/api";

export default function Resumen({ planId }) {
  const params = useParams();
  const location = useLocation();
  const actualPlanId = planId ?? params.id ?? location.state?.planId ?? null;
  const [plan, setPlan] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!actualPlanId) return;

    const fetchPlan = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/planes/${actualPlanId}`);
        if (!res.ok) throw new Error("Error al obtener plan");
        const data = await res.json();
        setPlan({
          id: data.idPlan ?? data.id,
          nombre: data.nomPlan ?? data.nombre ?? "-",
          codigo: data.codigo ?? data.idPlan ?? data.id ?? "-",
          creditos: data.creditos ?? data.creditosTotales,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const fetchMaterias = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/planes/${actualPlanId}/materias`);
        if (!res.ok) throw new Error("Error al obtener materias");
        const data = await res.json();
        const mapped = Array.isArray(data)
          ? data.map((m, idx) => ({
              id: m.idMateria ?? idx,
              nombre: m.nomMateria ?? m.nombre ?? "-",
              creditos: m.numCreditos ?? m.creditos ?? 0,
            }))
          : [];
        setMaterias(mapped);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPlan();
    fetchMaterias();
  }, [actualPlanId]);

  if (!actualPlanId) {
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
            <div className="stat-value">
              {plan?.creditos ?? "-"}
            </div>
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

        <div className="materias-list">
          <h3>Materias del plan</h3>
          {materias.length === 0 ? (
            <div className="empty-msg">No se encontraron materias</div>
          ) : (
            <ul>
              {materias.map((m) => (
                <li key={m.id}>
                  <span className="mat-nombre">{m.nombre}</span>
                  <span className="mat-creditos">{m.creditos} cr</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

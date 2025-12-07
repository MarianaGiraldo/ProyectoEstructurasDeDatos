import { useState } from "react";

export default function DetallePlan() {
  const [tab, setTab] = useState("Resumen");

  return (
    <div>
      <button onClick={() => setTab("Resumen")}>
        Resumen
      </button>

      <button onClick={() => setTab("Materias")}>
        Materias
      </button>

      <button onClick={() => setTab("Prerrequisitos")}>
        Prerrequisitos
      </button>

      <button onClick={() => setTab("Configuracion")}>
        Configuración
      </button>

      <button onClick={() => setTab("Simulacion")}>
        Simulación
      </button>

      <div style={{ marginTop: "20px" }}>
        {tab === "Resumen" && <div>Resumen</div>}
        {tab === "Materias" && <div>Materias</div>}
        {tab === "Prerrequisitos" && <div>Prerrequisitos</div>}
        {tab === "Configuracion" && <div>Configuración</div>}
        {tab === "Simulacion" && <div>Simulación</div>}
      </div>
    </div>
  );
}

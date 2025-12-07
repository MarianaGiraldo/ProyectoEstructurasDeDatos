import { useState } from "react";
import Resumen from "./Resumen";
import Materias from "./Materias";
import Prerrequisitos from "./Prerrequisitos";
import Configuracion from "./Configuracion";
import Simulacion from "./Simulacion";

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
        {tab === "Resumen" && <Resumen />}
        {tab === "Materias" && <Materias />}
        {tab === "Prerrequisitos" && <Prerrequisitos />}
        {tab === "Configuracion" && <Configuracion />}
        {tab === "Simulacion" && <Simulacion />}
      </div>
    </div>
  );
}
import { useState } from "react";
import "./DetallePlan.css"
import Resumen from "./Resumen";
import Materias from "./Materias";
import Prerrequisitos from "./Prerrequisitos";
import Configuracion from "./Configuracion";
import Simulacion from "./Simulacion";

function DetallePlan() {
  const [tab, setTab] = useState("Resumen");

  return (
    <div className="DetallePlan">
      <div className="tabs">

        <button
        className={`tab-button ${tab === "Resumen" ? "active" : ""}`}
        onClick={() => setTab("Resumen")}>
          Resumen
        </button>

        <button
        className={`tab-button ${tab === "Materias" ? "active" : ""}`}
        onClick={() => setTab("Materias")}>
          Materias
        </button>

        <button
        className={`tab-button ${tab === "Prerrequisitos" ? "active" : ""}`}
        onClick={() => setTab("Prerrequisitos")}>
          Prerrequisitos
        </button>

        <button
        className={`tab-button ${tab === "Configuracion" ? "active" : ""}`}
        onClick={() => setTab("Configuracion")}>
          Configuración
        </button>

        <button
        className={`tab-button ${tab === "Simulacion" ? "active" : ""}`}
        onClick={() => setTab("Simulacion")}>
          Simulación
        </button>
      </div>

      <div className="tab-content">
        {tab === "Resumen" && <Resumen />}
        {tab === "Materias" && <Materias />}
        {tab === "Prerrequisitos" && <Prerrequisitos />}
        {tab === "Configuracion" && <Configuracion />}
        {tab === "Simulacion" && <Simulacion />}
      </div>
    </div>
  );
}

export default DetallePlan;
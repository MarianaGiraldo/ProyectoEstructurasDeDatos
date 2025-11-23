import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DetallePlan from "../pages/DetallePlan";
import ResumenPlan from "../pages/ResumenPlan";
import GestionMaterias from "../pages/GestionMaterias";
import GestionPrerrequisitos from "../pages/GestionPrerrequisitos";
import ConfiguracionAcademica from "../pages/ConfiguracionAcademica";
import Simulacion from "../pages/Simulacion";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Detalle del plan */}
        <Route path="/plan" element={<DetallePlan />} />

        {/* Secciones internas */}
        <Route path="/plan/resumen" element={<ResumenPlan />} />
        <Route path="/plan/materias" element={<GestionMaterias />} />
        <Route path="/plan/prerrequisitos" element={<GestionPrerrequisitos />} />
        <Route path="/plan/configuracion" element={<ConfiguracionAcademica />} />
        <Route path="/plan/simulacion" element={<Simulacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


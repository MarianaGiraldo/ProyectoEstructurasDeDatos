import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DetallePlan from "../pages/DetallePlan";
import Resumen from "../pages/Resumen";
import Materias from "../pages/Materias";
import Prerrequisitos from "../pages/Prerrequisitos";
import Configuracion from "../pages/Configuracion";
import Simulacion from "../pages/Simulacion";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Detalle del plan */}
        <Route path="/plan" element={<DetallePlan />} />

        {/* Secciones internas */}
        <Route path="/plan/resumen" element={<Resumen />} />
        <Route path="/plan/materias" element={<Materias />} />
        <Route path="/plan/prerrequisitos" element={<Prerrequisitos />} />
        <Route path="/plan/configuracion" element={<Configuracion />} />
        <Route path="/plan/simulacion" element={<Simulacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

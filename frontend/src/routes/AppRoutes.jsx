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
      <Route path="/plan" element={<DetallePlan />}>
        <Route path="resumen" element={<Resumen />} />
        <Route path="materias" element={<Materias />} />
        <Route path="prerrequisitos" element={<Prerrequisitos />} />
        <Route path="configuracion" element={<Configuracion />} />
        <Route path="simulacion" element={<Simulacion />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

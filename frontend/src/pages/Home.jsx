import { useState, useEffect } from "react";
import "./Home.css";
import { SearchBar } from "../components/SearchBar";
import { TbBackground, TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080/api";

function Home() {
  const [planes, setPlanes] = useState([]);
  const [creditosPorPlan, setCreditosPorPlan] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlanData, setNewPlanData] = useState({ nombre: "", codigo: "" });
  const navigate = useNavigate();

  // Cargar lista de planes
  useEffect(() => {
    fetchPlanes();
    fetchCreditosPorPlan();
  }, []);

  const fetchPlanes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/planes`);
      if (!response.ok) throw new Error("Error al cargar planes");
      const data = await response.json();
      setPlanes(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCreditosPorPlan = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/planes/creditos`);
      if (!response.ok) throw new Error("Error al cargar créditos");
      const data = await response.json();
      setCreditosPorPlan(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults(planes);
      setShowSearchResults(false);
    } else {
      const filtered = planes.filter(plan =>
        plan.nombre.toLowerCase().includes(query.toLowerCase()) ||
        plan.codigo.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    }
  };

  const handleCreatePlan = async () => {
    if (!newPlanData.nombre.trim() || !newPlanData.codigo.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/planes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlanData),
      });

      if (!response.ok) throw new Error("Error al crear plan");
      
      const createdPlan = await response.json();
      setNewPlanData({ nombre: "", codigo: "" });
      setShowCreateForm(false);
      
      // Recargar planes
      fetchPlanes();
      fetchCreditosPorPlan();
      
      // Navegar al detalle del plan creado
      navigate(`/detalle-plan/${createdPlan.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el plan");
    }
  };

  const handleSelectPlan = (planId) => {
    navigate(`/detalle-plan/${planId}`);
  };

  return (
    <div className="Home">

      <div className="hori_cont">
        <div className="title_cont">
          <div>PLANES DE ESTUDIO</div>
        </div>

        <div className="search_bar_cont">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="vert_cont">

        <div className="vert_cont left">
          <div className="plans_header">
            <h2>Planes de estudio disponibles</h2>
            <button 
              className="btn-crear-plan"
              onClick={() => setShowCreateForm(!showCreateForm)}
              title="Crear nuevo plan de estudios"
            >
              <TbPlus size={20} /> Crear nuevo plan de estudios
            </button>
          </div>

          {showCreateForm && (
            <div className="create-plan-form">
              <h3>Crear Nuevo Plan</h3>
              <input
                type="text"
                placeholder="Nombre del plan"
                value={newPlanData.nombre}
                onChange={(e) => setNewPlanData({ ...newPlanData, nombre: e.target.value })}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Código del plan"
                value={newPlanData.codigo}
                onChange={(e) => setNewPlanData({ ...newPlanData, codigo: e.target.value })}
                className="input-field"
              />
              <div className="form-buttons">
                <button className="btn-confirm" onClick={handleCreatePlan}>
                  Crear
                </button>
                <button 
                  className="btn-cancel" 
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewPlanData({ nombre: "", codigo: "" });
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="plans-container">Cargando planes...</div>
          ) : (
            <div className="plans-container">
              {searchResults.length > 0 ? (
                searchResults.map(plan => (
                  <div
                    key={plan.id}
                    className="plan-card"
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    <div className="plan-header">
                      <h3>{plan.nombre}</h3>
                      <span className="plan-code">{plan.codigo}</span>
                    </div>
                    <div className="plan-credits">
                      <strong>Créditos:</strong> {creditosPorPlan[plan.id] || 0}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">No se encontraron planes</div>
              )}
            </div>
          )}
        </div>

        <div className="vert_cont right">
          <div className="unlogo"></div>
          <p className="text">
          Bienvenido, en esta pagina podrás saber cual es la mínima 
          cantidad de semestres que te puedes demorar en completar tu 
          carrera profesional en UNAL, para comenzar selecciona tu 
          plan de estudios, si no lo encuentras lo puedes ingresar 
          manualmente.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Home;

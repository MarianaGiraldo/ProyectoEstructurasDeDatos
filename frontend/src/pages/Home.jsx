import { useState } from "react";
import "../App.css";
import { SearchBar } from "../components/SearchBar";

function Home() {
  return (
    <div className="Home">
      <div className="title_cont">
        <div>PLANES DE ESTUDIO</div>
      </div>
      <div className="search_bar_cont">
        <div>Buscar plan de estudios...</div>
        <SearchBar />
        <div>SearchResults</div>
      </div>
      <div>Bienvenido, en esta pagina 
      podrás saber cual es la mínima 
      cantidad de semestres que te 
      puedes demorar en completar tu 
      carrera profesional en UNAL, 
      para comenzar selecciona tu 
      plan de estudios, si no lo 
      encuentras lo puedes ingresar 
      manualmente.</div>
    </div>
  );
}

export default Home;

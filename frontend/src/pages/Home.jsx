import { useState } from "react";
import "./Home.css";
import { SearchBar } from "../components/SearchBar";
import unlogo from "../img/unlogo.png"
import { TbBackground } from "react-icons/tb";

function Home() {
  return (
    <div className="Home">

      <div className="hori_cont">
        <div className="title_cont">
          <div>PLANES DE ESTUDIO</div>
        </div>

        <div className="search_bar_cont">
          <SearchBar />
          <div>SearchResults</div>
        </div>
      </div>

      <div className="vert_cont">

        <div className="vert_cont left">
          Planes de estudio disponibles
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

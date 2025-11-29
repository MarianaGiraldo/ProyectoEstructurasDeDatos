import React from "react";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = () => {
    return (
        <div className="input_cont">
            <FaSearch id="search_icon" />
            <input placeholder="Buscar plan de estudios" />
        </div>
    );
}
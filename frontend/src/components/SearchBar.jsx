import React from "react";

import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
    return (
        <div className="input_cont">
            <FaSearch className="search_icon" />
            <input placeholder="Buscar plan de estudios"/>
        </div>
    );
}
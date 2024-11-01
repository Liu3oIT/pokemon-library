import React from "react";
import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";
import SearchPokemom from "./SearchPokemon";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPokemom />} />
      <Route path="/pokemon/:name" element={<PokemonDetails />} />
    </Routes>
  );
};

export default App;

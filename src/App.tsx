
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";
import SearchPokemom from "./SearchPokemon";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPokemom />} />
        {/* <Route path="/pokemon" element={<PokemonList />} /> */}

        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

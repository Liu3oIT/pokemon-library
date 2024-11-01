import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

const SearchPokemom: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  const fetchPokemons = async (page: number) => {
    try {
      const offset = (page - 1) * limit;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const pokemonData = await Promise.all(
        response.data.results.map(
          async (pokemon: { name: string; url: string }) => {
            const pokemonDetail = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              url: pokemon.url,
              image: pokemonDetail.data.sprites.front_default, 
            };
          }
        )
      );
      setPokemonList((prevList) => {
        const uniquePokemons = pokemonData.filter(
          (pokemon) =>
            !prevList.some(
              (existingPokemon) => existingPokemon.name === pokemon.name
            )
        );
        return [...prevList, ...uniquePokemons];
      });
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">
        Pokemon Library
      </h1>
      <div className="flex justify-center items-center space-x-4">
        <label htmlFor="name" className="text-lg text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={inputValue}
          onChange={handleChange}
          className="w-60 p-2 border-2 border-blue-500 rounded-md text-lg text-gray-800 bg-gray-100 focus:outline-none focus:border-blue-700 focus:bg-white focus:shadow-md transition-all duration-300"
          placeholder="Enter Pokémon name..."
        />
        <Link to={`/pokemon/${inputValue}`}>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Search
          </button>
        </Link>
      </div>

      <div className="pokemon-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
        {pokemonList.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <div className="pokemon-item bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:scale-105">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-24 h-24 mx-auto"
              />
              <p className="text-center text-gray-700 font-semibold mt-2 capitalize">
                {pokemon.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center m-6">
        <button
          type="button"
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200"
        >
          More Pokémon
        </button>
      </div>
    </>
  );
};

export default SearchPokemom;

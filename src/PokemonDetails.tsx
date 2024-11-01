// PokemonDetails.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Ability {
  ability: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  abilities: Ability[];
}

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        console.log(response.data);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    }

    fetchData();
  }, [name]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to={`/`}>
        <button className="p-2 m-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-300">
          {" "}
          back
        </button>
      </Link>
      {pokemon?.name ? (
        <>
          <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <h1 className="text-xl font-bold text-center text-gray-800 mt-4">
              {pokemon?.name}
            </h1>
            <img
              className="w-32 h-32 object-cover object-center mx-auto mt-2" 
              src={pokemon?.sprites.front_default}
              alt={pokemon?.name}
            />
            <div className="p-3">
              <p className="text-gray-600">
                <span className="font-semibold">Height:</span> {pokemon?.height}{" "}
                decimeters
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Weight:</span> {pokemon?.weight}{" "}
                hectograms
              </p>
              <p className="text-gray-600 font-semibold mt-2">Abilities:</p>
              <ul className="list-disc pl-5 mt-1">
                {pokemon?.abilities.map((ability) => (
                  <li key={ability.ability.name} className="text-gray-600">
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p> такого покемона немає в нашій бібліотеці</p>
      )}
    </div>
  );
};

export default PokemonDetails;

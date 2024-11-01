// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// interface Prokemon {
//   name: string;
//   url: string;
// }

// const PokemonList: React.FC = () => {
//   const [pokemonList, setPokemonList] = useState<Prokemon[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [erro, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function featchData() {
//       try {
//         const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
//         console.log(response.data.results);
//         setPokemonList(response.data.results);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching data");
//         setLoading(false);
//       }
//     }
//     featchData();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Pokemon List</h1>
//       <ul>
//         {pokemonList.map((pokemon) => (
//           <li key={pokemon.name} className="md-2">
//             <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PokemonList;

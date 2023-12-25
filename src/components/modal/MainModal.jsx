"use client";
import Image from "next/image";
// ... (other imports)

import { useEffect, useState } from "react";

const MainModal = ({ closeModal, pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      setPokemonData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [pokemonId]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-black flex items-center justify-center">
      <div className="bg-white p-4 rounded-md md:min-w-[500px] min-w-64 w-fit transition-all transform translate-y-full sm:translate-y-0">
        {pokemonData ? (
          <div className="max-w-xl mx-auto flex flex-wrap items-center py-2 px-3 bg-white rounded-md overflow-hidden">
            {/* Image on the left */}
            <div className="flex-shrink-0 p-2 relative">
              <Image
                width={250}
                height={200}
                className="object-contain h-52"
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                alt="Profile"
              />
            </div>

            {/* Data on the right */}
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{pokemonData.name}</h2>
              {pokemonData.stats.map((stat, index) => (
                <p key={index}>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button
          onClick={closeModal}
          className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MainModal;

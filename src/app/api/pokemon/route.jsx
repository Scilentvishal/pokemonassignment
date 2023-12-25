import { NextResponse } from "next/server";

// pages/api/pokemon.js
export async function GET() {
    const page  = 1;
    const limit = 10; // Number of Pokémon per page
  
    try {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * limit}&limit=${limit}`;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
      }
      const data = await response.json();
      const pokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();
  
          return {
            id: pokemonDetails.id, // Include ID
            name: pokemon.name,
            image: pokemonDetails.sprites.front_default,
            abilities: pokemonDetails.abilities.map((ability) => ability.ability.name),
          };
        })
      );

      return new Response(JSON.stringify(pokemonList))
    //   res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return new Response({error: 'Internal Server Error' }, {status: 500})
    //   res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
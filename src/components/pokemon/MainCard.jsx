"use client";
import InfiniteScroll from "react-infinite-scroll-component";
// import useSWR from 'swr';
import ProductCard from "./Card";
import { useEffect, useState } from "react";
import MainModal from "../modal/MainModal";

const MainCard = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonId, setPokemonId] = useState();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  const fetchMoreData = async () => {
    try {
      const response = await fetch(nextUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();

      // Enhance the data by fetching additional details for each Pokemon
      const enhancedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();

          return {
            id: pokemonDetails.id,
            name: pokemon.name,
            abilities: pokemonDetails.abilities.map(
              (ability) => ability.ability.name
            ),
          };
        })
      );
      console.log(`nextUrl: ${nextUrl}`);
      setNextUrl(data.next);
      setPokemonData((prevData) => [...prevData, ...enhancedData]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMoreData(); 
    
  }, []);

  const pokemonClick = (id) => {
    setPokemonId(id);
    setisModalOpen(true);
  };
  
  
  const closeModal = () => {
    setisModalOpen(false);
  }

  return (
    <div>
      {isModalOpen && <MainModal pokemonId={pokemonId} closeModal={closeModal} />}
      <InfiniteScroll
        dataLength={pokemonData.length}
        next={fetchMoreData}
        hasMore={!!nextUrl}
        loader={<h4>Loading...</h4>}
        className="flex flex-wrap justify-center sm:px-0 px-2 md:my-8 my-4 gap-10"
      >
        {pokemonData.map((poke, i) => (
          <>
            {/* {console.log(poke)} */}
            <ProductCard key={i} pokemonClick={pokemonClick} poke={poke} />
          </>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MainCard;

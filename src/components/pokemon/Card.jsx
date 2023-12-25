"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ poke, pokemonClick }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-xl">
      <div className="mx-auto flex justify-center p-4">
        <Image
          width={300}
          height={350}
          className="rounded-t-lg mx-auto"
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${poke.id}.svg`}
          alt={poke.name}
        />
      </div>
      <div className=" pt-5 pb-3 text-black border-t-2">
        <div className="px-5 mb-3">
            <h5 className="text-2xl font-semibold text-primaryOrange tracking-tight capitalize">
              {poke.name}
            </h5>
          {/* <h5 className="text-lg mb-3 font-semibold text-gray-600 tracking-tight capitalize">
          {getSubString(product.subTitle, 50)}
        </h5> */}
        </div>

        <div className="flex items-center gap-3 justify-start rounded-sm px-5 pb-3">
          {poke.abilities.map((ability, i) => (
            <div
              key={i}
              className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
            >
              {ability}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 justify-start rounded-sm px-5 pb-3">
          <button onClick={()=> pokemonClick(poke.id)} className="border rounded-md px-3 py-2 ">
            Get Pokemon
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default ProductCard;

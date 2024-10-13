"use client";
import React, { useContext, useState } from "react";
import About from "./About";
import BaseStat from "./BaseStat";
import Evolution from "./Evolution";
import Moves from "./Moves";
import Forms from "./Forms";

interface InfoProps {}

const Info: React.FC<InfoProps> = () => {
  const [activeCategory, setActiveCategory] = useState("about");

  const handleActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <>
      <div className="flex justify-between mt-8 mb-4">
        <div className="flex flex-col items-center">
          <p
            className="text-sm cursor-pointer"
            onClick={() => handleActiveCategory("about")}
          >
            About
          </p>
          {activeCategory === "about" && (
            <div className="w-full h-[2px] bg-purple-500 mt-1 rounded"></div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <p
            className="text-sm cursor-pointer"
            onClick={() => handleActiveCategory("base stat")}
          >
            Base Stats
          </p>
          {activeCategory === "base stat" && (
            <div className="w-full h-[2px] bg-purple-500 mt-1 rounded"></div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <p
            className="text-sm cursor-pointer"
            onClick={() => handleActiveCategory("evolution")}
          >
            Evolution
          </p>
          {activeCategory === "evolution" && (
            <div className="w-full h-[2px] bg-purple-500 mt-1 rounded"></div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <p
            className="text-sm cursor-pointer"
            onClick={() => handleActiveCategory("forms")}
          >
            Forms
          </p>
          {activeCategory === "forms" && (
            <div className="w-full h-[2px] bg-purple-500 mt-1 rounded"></div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <p
            className="text-sm cursor-pointer"
            onClick={() => handleActiveCategory("moves")}
          >
            Moves
          </p>
          {activeCategory === "moves" && (
            <div className="w-full h-[2px] bg-purple-500 mt-1 rounded"></div>
          )}
        </div>
      </div>
      {activeCategory === "about" && <About />}
      {activeCategory === "base stat" && <BaseStat />}
      {activeCategory === "evolution" && <Evolution />}
      {activeCategory === "forms" && <Forms />}
      {activeCategory === "moves" && <Moves />}
    </>
  );
};

export default Info;

"use client";
import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import ScrollToTop from "./ScrollToTop";
import GenerationNav from "./GenerationNav";
import { PokemonContext } from "@/context/PokemonContext";

interface HeaderProps {
  reverseList: () => void;
}

const Header: React.FC<HeaderProps> = ({ reverseList }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isGenNavOpen, setIsGenNavOpen] = useState<boolean>(false);
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("Header must be used within a PokemonContextProvider");
  }

  const { searchQuery, setSearchQuery } = context; // Destructure from context
  const toggleGenNav = () => {
    setIsGenNavOpen((prevStatus) => !prevStatus);
  };

  // Scroll handler function to scroll to the header
  const goToHeader = () => {
    if (headerRef.current) {
      window.scrollTo({
        top: headerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  return (
    <>
      <div className="md:w-5/12 w-11/12 m-auto py-4 relative">
        {isGenNavOpen && <GenerationNav />}
        <div className="w-full overflow-hidden relative" ref={headerRef}>
          <Image
            src={"/images/pokeball.png"}
            alt=""
            width={300}
            height={300}
            sizes="100vh"
            className="absolute -top-24 -right-20 opacity-20 z-10"
          />

          <div className="flex justify-end mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-4 fill-icongray z-20"
              onClick={toggleGenNav}
            >
              <path d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-icongray z-20"
              onClick={reverseList}
            >
              <path d="M6.227 11h11.547c.862 0 1.32-1.02.747-1.665L12.748 2.84a.998.998 0 0 0-1.494 0L5.479 9.335C4.906 9.98 5.364 11 6.227 11zm5.026 10.159a.998.998 0 0 0 1.494 0l5.773-6.495c.574-.644.116-1.664-.747-1.664H6.227c-.862 0-1.32 1.02-.747 1.665l5.773 6.494z"></path>
            </svg>
          </div>
          <h1 className="font-bold text-2xl mb-2">Pokédex</h1>
          <p className="text-xs text-gray-400">
            Search for Pokémon by name or using the National Pokédex number.
          </p>
          <div className="flex items-center bg-bggray rounded-lg py-2 px-4 my-4 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="mr-2 fill-icongray"
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
            <input
              placeholder="What Pokémon are you looking for?"
              className="text-xs flex-1 bg-transparent h-full focus:outline-none z-30"
              value={searchQuery}
              onChange={handleSearchChange} // Update state on input change
            />
          </div>
        </div>
      </div>

      <ScrollToTop goToHeader={goToHeader} />
    </>
  );
};

export default Header;

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Home from "./Home";

const Search = () => {
  return (
    <div>
      {/* <div className='hidden sticky top-0 text-[#137271] bg-[#0d0d20] gap-1 pl-4 pr-2 h-10 sm:flex items-center rounded-full'>
        <AiOutlineSearch size={22} />
        <input
          className='h-7 bg-[#0d0d20] outline-none w-full placeholder:text-[#137271]'
          type='text'
          placeholder='Search Friend Zone'
        />
      </div> */}
      <Home />
    </div>
  );
};

export default Search;

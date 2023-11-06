import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
    <div className='flex bg-[#232425] w-3/4 sm:w-4/5 rounded-full px-3 py-1 gap-1 items-center'>
      <AiOutlineSearch size={23} />
      <input
        type='text'
        className='w-full outline-none py-1 bg-[#232425]'
        placeholder='Search Message'
      />
    </div>
  );
};

export default Search;

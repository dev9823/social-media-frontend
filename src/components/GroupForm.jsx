import React from "react";
import { useState } from "react";
import { BsArrowLeft, BsImageAlt } from "react-icons/bs";

const GroupForm = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  return (
    <div className='bg-[#1c1e21] pt-4 flex flex-col px-4 gap-y-5 text-slate-200 w-full h-full sm:w-[500px] sm:h-[420px] rounded-md'>
      <div className='flex border-b border-gray-500 items-center pb-2'>
        <BsArrowLeft size={25} onClick={onClose} />
        <h1 className='sm:text-xl mx-auto w-full text-center'>Create Group</h1>
      </div>
      <div className='flex flex-col gap-y-2 sm:flex-row gap-x-2 items-center'>
        <label
          className='text-start pl-4 sm:pl-0 w-full sm:w-fit'
          htmlFor='name'>
          Group Name:
        </label>
        <input
          id='name'
          className='bg-[#17181b] p-2 w-80 rounded-lg outline-none'
          type='text'
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
        />
      </div>
      <div className='flex flex-col sm:flex-row gap-y-2 gap-x-4 items-center'>
        <label
          className='text-start pl-4 sm:pl-0 w-full sm:w-fit'
          htmlFor='description'>
          Description:
        </label>
        <textarea
          id='description'
          className='h-32 bg-[#17181b] w-80 p-2 rounded-lg scrollbar-none outline-none'
        />
      </div>
      <div>
        <label className='flex gap-x-16 items-center text-lg' htmlFor='file'>
          <p>Image: </p>
          <BsImageAlt size={22} />
        </label>
        <input className='hidden' id='file' type='file' />
      </div>
      <button
        disabled={groupName.length === 0}
        className={`mt-auto mb-4 py-1 rounded-lg sm:text-lg ${
          groupName.length === 0 ? "bg-gray-700" : "bg-indigo-800"
        } `}>
        Create
      </button>
    </div>
  );
};

export default GroupForm;

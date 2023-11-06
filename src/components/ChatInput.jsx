import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineAttachFile } from "react-icons/md";

const ChatInput = ({ messageSend }) => {
  const [messageInput, setMessageInput] = useState("");

  function handleChange(event) {
    setMessageInput(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  const messageSubmit = (event) => {
    event.preventDefault();
    if (messageInput.length > 0) {
      messageSend(messageInput);
      setMessageInput("");
    }
  };
  return (
    <form className='flex items-center space-x-1 '>
      <label className='text-sky-800' htmlFor='mediaFile'>
        <MdOutlineAttachFile size={23} />
      </label>
      <input type='file' className='hidden' id='mediaFile' />
      <textarea
        className='w-full max-h-24 px-3 py-1 outline-none placeholder:text-gray-500 rounded-lg bg-[#131517] text-slate-300 scrollbar-none'
        placeholder='Type...'
        value={messageInput}
        onChange={handleChange}
        autoFocus
        rows={1}
      />
      <AiOutlineSend
        onClick={messageSubmit}
        className='text-[#45968e]'
        size={23}
      />
    </form>
  );
};

export default ChatInput;

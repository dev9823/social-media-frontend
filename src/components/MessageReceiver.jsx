import React from "react";
import { FaFile } from "react-icons/fa";

const MessageReceiver = ({ message }) => {
  function getTime(time) {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let period = "AM";
    if (hours >= 12) {
      period = "PM";
    }

    const displayHours = hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes} ${period}`;
  }
  return (
    <div className='max-w-[80%] min-h-fit bg-red-900 flex items-end rounded-xl ml-1 px-3 py-1 break-words mr-auto gap-2'>
      {message.file ? (
        <>
          <div className='flex items-center gap-x-2'>
            <div className='flex items-center justify-center text-sky-900 w-10 h-10 rounded-full bg-gray-300'>
              <FaFile size={23} />
            </div>
            <div>
              <p className=''>{message.file_name}</p>
              <span className='text-xs'>1.72kb</span>
            </div>
          </div>
          <p className='text-xs text-end'>{getTime(message.created_at)}</p>
        </>
      ) : (
        <>
          <p>{message.text}</p>
          <p className='text-xs text-end'>{getTime(message.created_at)}</p>
        </>
      )}
    </div>
  );
};

export default MessageReceiver;

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Chat from "../components/Chat";
import ChatList from "../components/ChatList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getJwt } from "../service/authService";
import { getData } from "../utils/fetchData";

const socket = new WebSocket(`ws://localhost:8000/ws/?token=${getJwt()}`);

// const socket = new WebSocket(
//   `wss://friendnet-fju8.onrender.com/ws/?token=${getJwt()}`
// );

const Message = () => {
  socket.onopen = () => console.log("Connection established...");
  const [selectedChat, setSelectedChat] = useState(null);
  const { id } = useParams();

  const {
    data: contacts,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["contacts"], queryFn: () => getData("chat/") });

  if (!selectedChat && id && !isLoading) {
    const chat = contacts.find((chat) => chat.id === Number(id));
    setSelectedChat(chat.friend);
  }

  return (
    <div className='w-full flex sm:pb-0 pb-8 text-slate-200'>
      {!isLoading && (
        <>
          {selectedChat && id ? (
            <Chat
              friend={selectedChat}
              onBackClick={() => setSelectedChat(null)}
              socket={socket}
            />
          ) : (
            <div className=' hidden w-3/4 h-full sm:flex items-center justify-center'>
              <h1 className='text-2xl'>Select chat or start new conversion</h1>
            </div>
          )}
          <ChatList
            contacts={contacts}
            onChatClick={(friend) => setSelectedChat(friend)}
          />
        </>
      )}
    </div>
  );
};

export default Message;

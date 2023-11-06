import { useEffect, useRef, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import ProfileImage from "./ProfileImage";
import { Link, useParams } from "react-router-dom";
import { getCurrentUserId, getJwt } from "../service/authService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getData } from "../utils/fetchData";
import ChatInput from "./ChatInput";
import MessageSender from "./MessageSender";
import MessageReceiver from "./MessageReceiver";
import Dark from "../assets/message-bg-dark.jpg";

const Chat = ({ friend, onBackClick, socket }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getData(`chat/${id}/messages`),
    enabled: Boolean(id),
  });

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(`Receive message`, data);
    if (id === data.room_id) {
      // queryClient.invalidateQueries(["messages", id]);
      queryClient.setQueryData(["messages", id], (prevData) => {
        return [data, ...prevData];
      });
    }
  };

  const messageSend = (message) => {
    socket.send(
      JSON.stringify({
        text: message,
        room_id: id,
      })
    );
    console.log("message sent");
  };

  return (
    <div className='absolute h-full top-0 sm:static w-full sm:w-3/4 flex flex-col mr-2 py-1 gap-1 bg-[#1c1e21] text-slate-200'>
      {!isLoading && (
        <>
          <div className='pb-1 flex items-center gap-4'>
            <Link to={"/messages"}>
              <HiArrowNarrowLeft
                onClick={onBackClick}
                className='sm:hidden'
                size={25}
              />
            </Link>
            <ProfileImage
              image={friend.profile_image}
              name={friend.username}
              size={10}
            />
            <div>
              <h1>{friend.username}</h1>
              <p className='text-xs'>active 7 hour ago</p>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${Dark})`,
            }}
            className='w-full h-full flex flex-col-reverse overflow-y-scroll scroll-smooth scrollbar-none py-2 gap-4'>
            {messages.map((message) =>
              message.sender_id === getCurrentUserId() ? (
                <MessageSender key={message.id} message={message} />
              ) : (
                <MessageReceiver key={message.id} message={message} />
              )
            )}
          </div>

          <ChatInput messageSend={messageSend} />
        </>
      )}
    </div>
  );
};
export default Chat;

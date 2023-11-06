import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { getData } from "../utils/fetchData";
import Dark from "../assets/message-bg-dark.jpg";
import { getCurrentUserId } from "../service/authService";
import MessageSender from "./MessageSender";
import MessageReceiver from "./MessageReceiver";
import ChatInput from "./ChatInput";
import GroupInfo from "./GroupInfo";
import ProfileImage from "./ProfileImage";

const GroupChat = ({ group, onBackClick, socket }) => {
  const [groupInfo, setGroupInfo] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getData(`group/${id}/messages`),
    enabled: Boolean(id),
  });

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(`Receive message`, data);
    if (id === data.room_id) {
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
    <div className='absolute h-full top-0 sm:static w-full sm:w-3/4 flex flex-col mr-2 py-1 gap-1 bg-[#1c1e21] text-slate-300'>
      {!isLoading && (
        <>
          {groupInfo ? (
            <GroupInfo group={group} onBackClick={() => setGroupInfo(false)} />
          ) : (
            <>
              <div className='pb-1 flex items-center gap-3 pl-1'>
                <Link to={"/Groups"}>
                  <HiArrowNarrowLeft
                    onClick={onBackClick}
                    className='sm:hidden'
                    size={25}
                  />
                </Link>
                <div
                  onClick={() => setGroupInfo(true)}
                  className='flex items-center gap-x-4'>
                  <ProfileImage
                    image={group.image}
                    name={group.name}
                    size={10}
                  />
                  <h1>{group.name}</h1>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url(${Dark})`,
                }}
                className='w-full h-full flex flex-col-reverse overflow-y-scroll scroll-smooth scrollbar-none py-2 gap-4'>
                {messages.map((message) =>
                  message.sender_id === getCurrentUserId() ? (
                    <div key={message.id} className='flex items-center'>
                      <MessageSender message={message} />
                      <ProfileImage
                        image={message.profile_image}
                        name={message.username}
                        size={9}
                      />
                    </div>
                  ) : (
                    <div key={message.id} className='flex items-center'>
                      <ProfileImage
                        image={message.profile_image}
                        name={message.username}
                        size={9}
                      />
                      <MessageReceiver message={message} />
                    </div>
                  )
                )}
              </div>

              <ChatInput messageSend={messageSend} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GroupChat;

import GroupChat from "../components/GroupChat";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/fetchData";
import GroupList from "../components/GroupList";
import { getJwt } from "../service/authService";

const socket = new WebSocket(`ws://localhost:8000/ws/group/?token=${getJwt()}`);
// const socket = new WebSocket(
//   `wss://friendnet-fju8.onrender.com/ws/group/?token=${getJwt()}`
// );

const Groups = () => {
  socket.onopen = () => console.log("connection established");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { id } = useParams();

  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["groups"], queryFn: () => getData("group/") });

  if (!selectedGroup && id && !isLoading) {
    const group = groups.find((group) => group.id === Number(id));
    setSelectedGroup(group);
  }
  return (
    <div className='w-full flex sm:pb-0 pb-8 text-slate-300'>
      {!isLoading && (
        <>
          {selectedGroup && id ? (
            <GroupChat
              group={selectedGroup}
              onBackClick={() => setSelectedGroup(null)}
              socket={socket}
            />
          ) : (
            <div className=' hidden w-3/4 h-full sm:flex items-center justify-center'>
              <h1 className='text-2xl'>Select Group</h1>
            </div>
          )}
          <GroupList
            groups={groups}
            onGroupClick={(group) => setSelectedGroup(group)}
          />
        </>
      )}
    </div>
  );
};

export default Groups;

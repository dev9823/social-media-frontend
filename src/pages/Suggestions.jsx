import React, { useState } from "react";
import Card from "../components/Card";
import { getData, postData } from "../utils/fetchData";
import { useMutation, useQuery } from "@tanstack/react-query";
import MobileCard from "../components/MobileCard";
const Suggestion = () => {
  const [people, setPeople] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["people"],
    queryFn: () => getData(`people/`),
    onSuccess: (data) => setPeople(data),
  });

  const addFriendMutation = useMutation((userId) =>
    postData(`api/friend-request/`, userId)
  );

  const handleAddFriend = (receiver_id) => {
    addFriendMutation.mutate(
      { receiver_id },
      {
        onSuccess: () => {
          setPeople((prevData) =>
            prevData.filter((user) => user.user_id !== receiver_id)
          );
          console.log("successfully friend request sent");
        },
      }
    );
  };

  const handleRemove = (userId) => {
    setPeople((prevData) => prevData.filter((user) => user.user_id !== userId));
  };
  return (
    <div className='w-full pb-12 sm:pb-0 h-full pt-2 bg-[#1c1e21] overflow-scroll scrollbar-none'>
      {!isLoading && (
        <>
          <div>
            <div className='hidden sm:grid xl:grid-cols-4 gap-4 md:grid-cols-3 grid-cols-2 px-1'>
              {people.map((user) => (
                <Card
                  key={user.user_id}
                  user={user}
                  handleAddFriend={handleAddFriend}
                  handleRemove={handleRemove}
                />
              ))}
            </div>
            <div className='sm:hidden w-full flex flex-col items-center'>
              {people.map((user) => (
                <MobileCard
                  key={user.user_id}
                  user={user}
                  handleAddFriend={handleAddFriend}
                  handleRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Suggestion;

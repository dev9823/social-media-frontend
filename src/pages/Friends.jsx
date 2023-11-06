import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getData } from "../utils/fetchData";
import FriendList from "../components/FriendList";
import FriendProfile from "../components/FriendProfile";
import { TailSpin } from "react-loader-spinner";

const Friends = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { data: friends, isLoading } = useQuery({
    queryFn: () => getData(`friends`),
    queryKey: ["friends"],
  });

  return (
    <div className='w-full flex gap-x-1 text-slate-200'>
      {isLoading ? (
        <div className='mx-auto mt-3'>
          <TailSpin
            height='80'
            width='80'
            color='#b0b0b0e4'
            ariaLabel='tail-spin-loading'
            radius='1'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      ) : (
        <>
          {friends.length === 0 ? (
            <div className='w-full flex items-center text-center'>
              <h1 className='w-full text-2xl'>You don't have any friends.</h1>
            </div>
          ) : (
            <>
              {selectedFriend ? (
                <FriendProfile
                  friend={selectedFriend}
                  onBackClick={() => setSelectedFriend(null)}
                />
              ) : (
                <div className=' hidden w-3/4 h-full sm:flex items-center justify-center'>
                  <h1 className='text-2xl'>
                    Select people's to preview their profile
                  </h1>
                </div>
              )}
              <FriendList
                friends={friends}
                onFriendClick={(friend) => setSelectedFriend(friend)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Friends;

import React from "react";
import ProfileImage from "./ProfileImage";
import Search from "./Search";

const FriendList = ({ friends, onFriendClick }) => {
  return (
    <div className='w-full sm:w-1/3 flex flex-col items-center gap-3 h-full rounded-t-lg bg-[#1c1e21] text-slate-300 '>
      <h1 className='border-b border-[#323232]  w-full text-center text-xl pb-5'>
        Friends
      </h1>
      <Search />
      <div className='mt-2 overflow-y-scroll scrollbar-none space-y-3 h-full w-full pl-2'>
        {friends.map((friend) => (
          <div
            key={friend.user_id}
            onClick={() => onFriendClick(friend)}
            className='pl-2 py-1 w-full border-y h-12 border-[#323232] items-center gap-3 flex'>
            <ProfileImage
              image={friend.profile_image}
              name={friend.username}
              size={10}
            />
            <h1 className='text-lg'>{friend.username}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;

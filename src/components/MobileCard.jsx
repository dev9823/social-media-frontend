import React from "react";
import ProfileImage from "./ProfileImage";

const MobileCard = ({ user, handleAddFriend, handleRemove }) => {
  return (
    <div>
      <div className='flex items-center gap-x-5 w-full text-slate-300'>
        <ProfileImage
          image={user.profile_image}
          name={user.username}
          size={16}
        />
        <div className='space-y-2'>
          <p className='pl-1 text-lg'>{user.username}</p>
          <div className='flex gap-x-4'>
            <button
              onClick={() => handleAddFriend(user.user_id)}
              className='w-32 py-1 rounded-md bg-sky-950'>
              Add Friend
            </button>
            <button
              onClick={() => handleRemove(user.user_id)}
              className='w-32 py-1 rounded-md'>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;

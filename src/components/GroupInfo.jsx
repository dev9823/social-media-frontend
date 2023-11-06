import React from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import ProfileImage from "./ProfileImage";

const GroupInfo = ({ group, onBackClick }) => {
  return (
    <div className='w-full h-full text-slate-200 px-2 space-y-2'>
      <div className='pb-1 flex items-center gap-3 w-full'>
        <HiArrowNarrowLeft onClick={onBackClick} className='' size={25} />
        <div className='flex items-center gap-x-4'>
          <ProfileImage image={group.image} name={group.name} size={10} />
          <h1>{group.name}</h1>
        </div>
      </div>
      {/* Info */}
      {group.description && (
        <div className='sm:flex gap-x-3 space-y-2'>
          <p className='text-lg pl-2'>Description: </p>
          <p className='pl-10'>
            {group.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quod, quibusdam neque! Quaerat modi assumenda quia
            possimus labore sapiente. Officiis, amet!
          </p>
        </div>
      )}
      <>
        <h1 className='text-lg px-2 border-b-2 w-fit border-sky-700'>
          Members
        </h1>
        <div className='mt-2 overflow-scroll scrollbar-none'>
          {group.members.map((member) => (
            <div
              key={member.user_id}
              className='flex items-center gap-x-2 pl-2 border-y border-gray-700 py-1'>
              <ProfileImage
                image={member.profile_image}
                name={member.username}
                size={9}
              />
              <h1>{member.username}</h1>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default GroupInfo;

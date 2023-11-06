import React from "react";
import Search from "./Search";
import ProfileImage from "./ProfileImage";
import { useNavigate } from "react-router-dom";

const GroupList = ({ groups, onGroupClick }) => {
  const navigate = useNavigate();
  const handleGroupClick = (group) => {
    onGroupClick(group);
    navigate(`/groups/${group.id}`);
  };
  return (
    <div className='w-full sm:w-1/3 flex flex-col items-center gap-y-3 h-full px-1 rounded-t-lg bg-[#1c1e21] text-slate-300 '>
      <h1 className='border-b border-[#323232]  w-full text-center text-xl pb-5'>
        Groups
      </h1>
      <Search />

      {groups.map((group) => {
        return (
          <div
            key={group.id}
            onClick={() => handleGroupClick(group)}
            className='w-full overflow-y-scroll flex flex-col gap-0 mt-1 sm:mt-0 scrollbar-none'>
            <div className='pl-2 py-1 w-full border-y h-12 border-[#323232] items-center gap-3 flex'>
              <ProfileImage image={group.image} name={group.name} size={10} />
              <div>
                <p>{group.name}</p>
                {!group.message && (
                  <p className='text-xs'>Say hi to your friends</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupList;

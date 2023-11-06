import React, { useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Feed from "./Feed";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/fetchData";
import { TailSpin } from "react-loader-spinner";
import { getCurrentUserId } from "../service/authService";

const FriendProfile = ({ friend, onBackClick }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const handleItemClick = (index) => setSelectedItem(index);

  const { data: post, isLoading } = useQuery({
    queryKey: ["friend-post", friend.user_id],
    queryFn: () => getData(`posts/?user_id=${friend.user_id}`),
  });

  const { data: userFriend, isLoading: loading } = useQuery({
    queryKey: ["userFriend", friend.user_id],
    queryFn: () => getData(`friends/?user_id=${friend.user_id}`),
  });
  return (
    <div className='absolute h-full top-0 sm:static w-full sm:w-4/5 flex flex-col bg-[#1c1e21] text-slate-300 mx-0 md:mx-4 lg:mx-0 xl:mx-4'>
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
          <div className='sm:hidden absolute flex items-center top-0 w-full pl-2 h-12'>
            <BsArrowLeft onClick={onBackClick} size={25} />
          </div>
          <div className='w-full flex flex-col overflow-y-scroll mt-12 sm:mt-0 scrollbar-none'>
            <div className='grid grid-cols-2 md:grid-cols-4 w-full space-y-6 md:space-y-0 mb-4 items-center'>
              {friend.profile_image ? (
                <img
                  className='object-cover rounded-full w-24 h-24 lg:w-36 lg:h-36 ml-2 '
                  src={friend.profile_image}
                  alt=''
                />
              ) : (
                <div className='text-black font-semibold rounded-full w-24 h-24 lg:w-36 lg:h-36 ml-2 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                  <h1 className='text-6xl'>
                    {friend.username.charAt(0).toUpperCase()}
                  </h1>
                </div>
              )}
              <h1 className='lg:text-2xl text-start md:text-center md:text-xl  text-2xl font-bold '>
                {friend.username}
              </h1>
              <button className='border-gray-500 ml-20 w-32 sm:fit px-2 md:ml-4 lg:px-4 mr-1 border rounded-md py-1 font-semibold'>
                Message
              </button>
              <button className='bg-[#131315] ml-14 px-2 w-32 sm:fit lg:px-4 md:ml-6 mr-2 rounded-md py-2 font-semibold'>
                Unfriend
              </button>
            </div>
            <div className='flex justify-evenly items-center mb-2'>
              <p className=' text-xl'>Bio: </p>
              <div className=' break-words w-3/4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                quis culpa delectus sunt totam? Repudiandae accusantium rerum ex
                repellendus ea.
              </div>
            </div>
            <ul className=' inline-flex gap-20 w-full justify-center text-lg border-t border-[#0f0f12] pt-5'>
              <li
                className={`px-2 pb-1 ${
                  selectedItem === 0 ? "border-b-2 border-sky-500" : ""
                }`}
                onClick={() => handleItemClick(0)}>
                Posts
              </li>
              <li
                className={`px-2 pb-1 ${
                  selectedItem === 1 ? "border-b-2 border-sky-500" : ""
                }`}
                onClick={() => handleItemClick(1)}>
                Friends
              </li>
            </ul>
            {selectedItem === 0 ? (
              <div className='w-full md:w-[31rem] 2xl:w-[40rem] mx-auto'>
                {post.length === 0 ? (
                  <h1 className='text-2xl text-center mt-4'>
                    The user doesn't have post
                  </h1>
                ) : (
                  <Feed posts={post} />
                )}
              </div>
            ) : (
              <div className='px-2 mt-4 w-full grid grid-cols-1 xl:grid-cols-2 gap-y-4 items-center'>
                {!loading && (
                  <>
                    {userFriend.length === 1 ? (
                      <h1 className='text-2xl mt-2'>
                        The user doesn't have another friend
                      </h1>
                    ) : (
                      <>
                        {userFriend.map((friend) => {
                          if (friend.user_id !== getCurrentUserId()) {
                            return (
                              <div
                                key={friend.user_id}
                                className='flex items-center gap-x-4 justify-center'>
                                {friend.profile_image ? (
                                  <img
                                    className='object-cover rounded-full w-20 h-20 xl:w-16 xl:h-16'
                                    src={friend.profile_image}
                                  />
                                ) : (
                                  <div className='rounded-full flex items-center text-3xl justify-center w-20 h-20 xl:w-16 xl:h-16 bg-sky-900'>
                                    {friend.username.charAt(0)}
                                  </div>
                                )}
                                <h1 className='text-xl w-24'>
                                  {friend.username}
                                </h1>
                                <button className='px-4 py-2 xl:py-1 bg-[#137271] rounded-lg'>
                                  Add Friend
                                </button>
                              </div>
                            );
                          }
                        })}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FriendProfile;

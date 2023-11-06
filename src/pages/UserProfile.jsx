import React, { useState } from "react";
import Feed from "../components/Feed";
import Widget from "../components/Widget";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getData } from "../utils/fetchData";
import ProfileForm from "../components/ProfileForm";
const UserProfile = () => {
  const [updatePro, setUpdatePro] = useState(false);

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["profile"]);
  const { data: post, isLoading } = useQuery({
    queryKey: ["user-post", data.use_id],
    queryFn: () => getData(`posts/?user_id=${data.user_id}`),
  });

  return (
    <div className='w-full flex sm:pt-2 gap-4 pb-9 sm:pb-0'>
      <div className='lg:w-2/3 w-full mx-auto text-gray-300 flex flex-col gap-5 overflow-y-scroll scrollbar-none'>
        {updatePro ? (
          <ProfileForm data={data} onClose={() => setUpdatePro(false)} />
        ) : (
          <>
            <div className='flex w-full gap-6 items-center pr-2 md:pr-8'>
              {data.profile_image ? (
                <img
                  className='object-cover rounded-full md:w-36 w-24 h-24 md:h-36 ml-2'
                  src={data.profile_image}
                  alt=''
                />
              ) : (
                <div className='rounded-full text-center text-5xl lg:text-6xl flex items-center justify-center md:w-36 w-24 h-24 md:h-36 ml-2 bg-sky-900'>
                  <h1>{data.username.charAt(0)}</h1>
                </div>
              )}
              <h1 className='text-3xl  font-bold'>{data.username}</h1>
              <button
                disabled={isLoading}
                onClick={() => setUpdatePro(true)}
                className='border-gray-400 ml-auto border rounded-lg px-3 py-1 font-semibold'>
                Edit profile
              </button>
            </div>
            <div className='flex justify-evenly items-center'>
              <p className=' text-xl text-gray-50'>Bio</p>
              <div className=' break-words w-3/4'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis quis culpa delectus sunt totam? Repudiandae
                  accusantium rerum ex repellendus ea.
                </p>
              </div>
            </div>
            <div className='max-w-[32rem] w-full 2xl:w-[40rem] mx-auto border-t border-[#3f3f3f] pt-3 space-y-2'>
              <h1 className='text-xl text-gray-200 text-center'>Posts</h1>
              {!isLoading && <Feed posts={post} />}
            </div>
          </>
        )}
      </div>
      <div className='hidden lg:flex'>
        <Widget />
      </div>
    </div>
  );
};

export default UserProfile;

import { useState } from "react";
import ProfileImage from "../components/ProfileImage";
import Widget from "../components/Widget";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/fetchData";
import { getCurrentUserId } from "../service/authService";

const Notifications = () => {
  const [notification, setNotifications] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: () => getData(`friend-receive/`),
    onSuccess: (data) => setNotifications(data),
  });
  return (
    <div className='flex w-full justify-between pb-8 sm:pb-2'>
      <div className='text-gray-300 w-full md:w-2/3  overflow-hidden mx-auto px-2'>
        <p className='text-xl text-slate-400 text-center'>Requests</p>
        <div className='w-full h-full overflow-y-scroll space-y-2 scrollbar-none '>
          {!isLoading && (
            <>
              {notification.map((items) => (
                <div
                  key={items.id}
                  onClick={() => console.log(items.sender)}
                  className='flex items-center pt-1 pb-2 gap-x-6 justify-center sm:gap-x-14 border-b-2 border-gray-800'>
                  <ProfileImage
                    image={items.sender.profile_image}
                    name={items.sender.username}
                    size={14}
                  />
                  <div className='space-y-1'>
                    <h1 className='text-lg pl-2'>{items.sender.username}</h1>
                    <div className='flex gap-x-10'>
                      <button className='w-32 py-1 bg-sky-900 rounded-md'>
                        Accept
                      </button>
                      <button className='w-32 py-1 border rounded-md border-gray-600'>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className='hidden md:flex md:w-[350px] h-full px-3 '>
        <Widget />
      </div>
    </div>
  );
};

export default Notifications;

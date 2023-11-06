import { useMutation, useQuery } from "@tanstack/react-query";
import { getData, postData } from "../utils/fetchData";
import { getCurrentUserId } from "../service/authService";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import { useState } from "react";

const Widget = () => {
  const [people, setPeople] = useState([]);
  const { data: groups, isLoading } = useQuery({
    queryKey: ["join-group"],
    queryFn: () => getData(`group/?not_joined=${getCurrentUserId()}`),
  });

  const { data, isLoading: loading } = useQuery({
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
        },
      }
    );
  };

  const users = !loading && people.slice(0, 4);
  return (
    <div className='min-w-fit w-full text-gray-300 space-y-4  overflow-y-scroll scrollbar-none'>
      {!isLoading &&
        (groups.length > 0 ? (
          <div className='rounded-xl space-y-3 w-full h-fit bg-[#1c1e21] p-2'>
            <h1 className='text-xl ml-2'>Groups</h1>
            {groups.map((group) => (
              <div key={group.id} className='flex items-center px-2 gap-3'>
                <ProfileImage image={group.image} name={group.name} size={10} />
                <p className='font-semibold text-lg'>{group.name}</p>
                <button className='bg-[#137271] px-6 py-1 ml-auto rounded-xl'>
                  Join
                </button>
              </div>
            ))}
            <p className='pl-1 text-blue-800 font-semibold'>Show more</p>
          </div>
        ) : (
          <p>No new groups available.</p>
        ))}
      {/* Limit users when fetching or mapping to 3 users */}
      {!loading && (
        <div className='rounded-xl space-y-3 w-full h-fit bg-[#1c1e21] p-2'>
          <h1 className='text-xl ml-2'>People</h1>
          {users.map((user) => (
            <div key={user.user_id} className='flex items-center px-1 gap-3'>
              <ProfileImage
                image={user.profile_image}
                name={user.username}
                size={10}
              />
              <p className=' font-semibold text-lg'>{user.username}</p>
              <button
                onClick={() => handleAddFriend(user.user_id)}
                className='bg-[#137271] px-3 py-1 ml-auto rounded-lg'>
                Add Friend
              </button>
            </div>
          ))}
          <Link to={"/suggestions"}>
            <p className=' pl-1 text-blue-800 font-semibold'>Show more</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Widget;

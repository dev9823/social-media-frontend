import ProfileImage from "./ProfileImage";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

const ChatList = ({ contacts, onChatClick }) => {
  const navigate = useNavigate();
  const handleChatClick = (chat) => {
    onChatClick(chat.friend);
    navigate(`/messages/${chat.id}`);
  };

  return (
    <div className='w-full sm:w-1/3 flex flex-col items-center gap-3 h-full px-1 rounded-t-lg bg-[#1c1e21] text-slate-300 '>
      <h1 className='border-b border-[#323232]  w-full text-center text-xl pb-5'>
        Messages
      </h1>
      <Search />

      {contacts.map((chat) => {
        return (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat)}
            className='w-full overflow-y-scroll flex flex-col gap-0 mt-1 sm:mt-0 scrollbar-none'>
            <div className='pl-2 py-1 w-full border-y h-12 border-[#323232] items-center gap-3 flex'>
              <ProfileImage
                image={chat.friend.profile_image}
                name={chat.friend.username}
                size={10}
              />
              <div>
                <p>{chat.friend.username}</p>
                {!chat.message && (
                  <p className='text-xs'>Say hi to your friend</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;

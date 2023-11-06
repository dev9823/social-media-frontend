const Card = ({ user, handleAddFriend, handleRemove }) => {
  return (
    <div className='pt-1 pb-4 text-slate-300 flex flex-col gap-y-1 w-56 box-content h-96 items-center shadow-lg shadow-[#303030] rounded-lg'>
      {user.profile_image ? (
        <img
          className='object-cover w-full h-72 rounded-md'
          src={user.profile_image}
        />
      ) : (
        <div className='w-full text-xl h-72 bg-[#27272883] rounded-t-lg flex items-center justify-center'>
          Have no profile image
        </div>
      )}
      <h1 className='text-center text-lg'>{user.username}</h1>
      <div className='flex flex-col items-center gap-y-3 mt-1'>
        <button
          onClick={() => handleAddFriend(user.user_id)}
          className=' bg-[#054471] hover:bg-[#012e4e] py-1 w-36 rounded-sm font-semibold text-slate-300'>
          Add Friend
        </button>
        <button
          onClick={() => handleRemove(user.user_id)}
          className='border border-gray-300 font-semibold py-1 w-36'>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Card;

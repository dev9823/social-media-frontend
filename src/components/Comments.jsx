import ProfileImage from "./ProfileImage";

const Comments = ({ comment }) => {
  return (
    <div className='flex space-x-1'>
      <ProfileImage
        image={comment.profile_image}
        name={comment.username}
        size={10}
      />
      <div className='w-fit bg-[#131517] text-slate-300 px-3 py-1  rounded-2xl'>
        <p className='text-xs font-semibold'>{comment.username}</p>
        <p className=''>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comments;

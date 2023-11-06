import { BiLogOut } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import { TiGroupOutline } from "react-icons/ti";
import PostForm from "./PostForm";
import GroupForm from "./GroupForm";

const CreateDropdown = ({
  createPost,
  setCreatePost,
  createGroup,
  setCreateGroup,
}) => {
  return (
    <ul className='bg-[#212122] absolute right-2 h-40 w-fit sm:w-[330px] top-14 pr-4 sm:pr-0 z-50 flex flex-col rounded-b text-lg text-slate-300'>
      <li
        onClick={() => setCreatePost(!createPost)}
        className='space-x-2 pl-3 py-1 flex w-full items-center hover:bg-[#2a2c31]'>
        <div className='flex items-center justify-center bg-gray-950 rounded-full w-10 h-10'>
          <IoCreateOutline className='mb-1' size={25} />
        </div>
        <p>Create Post</p>
      </li>
      <li
        onClick={() => setCreateGroup(!createGroup)}
        className='space-x-2 pl-3 py-1 flex w-full items-center hover:bg-[#2a2c31]'>
        <div className='flex items-center justify-center bg-gray-950 rounded-full w-10 h-10'>
          <TiGroupOutline size={25} />
        </div>
        <p>Create Group</p>
      </li>
      <li className='space-x-2 pl-3 py-1 flex w-full items-center hover:bg-[#2a2c31]'>
        <div className='flex items-center justify-center bg-gray-950 rounded-full w-10 h-10'>
          <BiLogOut className='mr-2' size={25} />
        </div>
        <p>Logout</p>
      </li>
    </ul>
  );
};

export default CreateDropdown;

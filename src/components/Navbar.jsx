import React, { useEffect, useState } from "react";
import logo2 from "../assets/logo4.png";
import { FaBars, FaTimes, FaPlus } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { mobileNavbar, navbarItems } from "../constant";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";
import GroupForm from "./GroupForm";
import Search from "./Search";
import { useQueryClient } from "@tanstack/react-query";
import CreateDropdown from "./CreateDropDown";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [createPost, setCreatePost] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [profile, setProfile] = useState(false);

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["profile"]);
  const handleSelectedItem = (index) => setSelectedItem(index);

  return (
    <>
      <div className='sticky top-0 bg-[#1c1e21] flex-grow px-4 xl:px-12 text-slate-300 flex items-center justify-between w-full h-16 py-1'>
        <Link to='/home'>
          <img
            className='h-10 w-30 sm:h-12 object-cover mix-blend-screen'
            src={logo2}
            alt=''
          />
        </Link>

        <div className='hidden px-2 sm:flex items-center justify-end space-x-3'>
          <Search />
          <button className='w-11 h-11' onClick={() => setProfile(!profile)}>
            <ProfileImage
              image={data.profile_image}
              name={data.username}
              size={10}
            />
          </button>
          {profile && (
            <CreateDropdown
              createPost={createPost}
              setCreatePost={setCreatePost}
              createGroup={createGroup}
              setCreateGroup={setCreateGroup}
            />
          )}
        </div>

        {/* Mobile Menu */}
        <div className='sm:hidden bg-[#1c1e21] text-slate-300 flex items-center space-x-2 px-2 justify-end'>
          <button onClick={() => setProfile(!profile)}>
            <ProfileImage
              image={data.profile_image}
              name={data.username}
              size={10}
            />
          </button>
          {profile && (
            <CreateDropdown
              createPost={createPost}
              setCreatePost={setCreatePost}
              createGroup={createGroup}
              setCreateGroup={setCreateGroup}
            />
          )}
          <FaBars onClick={() => setNav(!nav)} size={25} />
        </div>

        <div
          className={
            !nav
              ? "hidden"
              : "sm:hidden fixed top-0 left-0 w-full h-screen bg-[#1c1e21] text-slate-300 flex flex-col justify-start pt-1"
          }>
          <div className='h-10 flex justify-between items-center px-5 border-b border-[#262627] mt-1 pb-10'>
            <div className='flex bg-[#222324] text-slate-300 rounded-full px-4 items-center h-8 m-auto'>
              <AiOutlineSearch size={25} />
              <input
                className='bg-[#222324] text-slate-300 px-2 w-full outline-none '
                placeholder='Search friend Net'
                type='text'
              />
            </div>
            <FaTimes onClick={() => setNav(!nav)} className='mt-8' size={22} />
          </div>
          <ul
            onClick={() => setNav(false)}
            className='flex flex-col items-start h-full w-full mt-8 pl-4 space-y-4 overflow-y-scroll scrollbar-none'>
            <Link
              to={`/${data.username}`}
              className='flex items-center space-x-2 '>
              <ProfileImage
                image={data.profile_image}
                name={data.username}
                size={10}
              />
              <p>{data.username}</p>
            </Link>
            {navbarItems.map((items, index) => (
              <Link
                to={`/${items.label}`}
                key={index}
                className='flex space-x-4'>
                {items.icon} <p>{items.label}</p>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={
          nav
            ? "hidden"
            : "sm:hidden h-10 w-full flex px-2 fixed bottom-0 pb-2 left-0 bg-[#1c1e21]"
        }>
        <ul className='flex w-full items-center justify-between mx-4'>
          {mobileNavbar.map((items, index) => (
            <Link
              to={`/${items.label}`}
              onClick={() => handleSelectedItem(index)}
              key={index}
              className={`p-2 ${
                selectedItem === index
                  ? "text-[#3352ff] border-b-4 border-[#3352ff] pb-2"
                  : "text-slate-300"
              }`}>
              {items.icon}
            </Link>
          ))}
        </ul>
      </div>
      {createPost && (
        <div className='absolute h-screen w-screen flex items-center justify-center backdrop-filter backdrop-blur-sm'>
          <PostForm onClose={() => setCreatePost(false)} />
        </div>
      )}
      {createGroup && (
        <div className='absolute h-screen w-screen flex items-center justify-center backdrop-filter backdrop-blur-sm'>
          <GroupForm onClose={() => setCreateGroup(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;

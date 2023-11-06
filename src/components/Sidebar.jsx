import React, { useState } from "react";
import { navbarItems } from "../constant";
import ProfileImage from "./ProfileImage";
import { Link, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["profile"]);
  const location = useLocation();

  const [selectedItem, setSelectedItem] = useState(
    getSelectedItemFromLocation(location)
  );
  const handleItemClick = (index) => setSelectedItem(index);

  function getSelectedItemFromLocation(location) {
    const path = location.pathname;
    const selectedItem = navbarItems.findIndex(
      (item) => `/${item.label}` === path
    );
    return selectedItem >= 0 ? selectedItem : 0;
  }

  return (
    <div className='rounded-lg h-full hidden sm:flex text-slate-300'>
      <ul className='bg-[#1c1e21] rounded-lg w-full h-full overflow-y-scroll scrollbar-none'>
        <Link to={`/${data.username}`}>
          <li
            onClick={() => handleItemClick(9)}
            className={`py-3 flex px-2 items-center space-x-2 text-lg hover:bg-[#131517] ${
              selectedItem === 9
                ? " border-l-8 border-[#137271] text-[#137271]  rounded-t-lg bg-[#131517]"
                : ""
            }`}>
            <ProfileImage
              size={10}
              image={data.profile_image}
              name={data.username}
            />
            <p className=' hidden lg:flex'>{data.username}</p>
          </li>
        </Link>
        {navbarItems.map((items, index) => (
          <Link key={index} to={`/${items.label}`}>
            <li
              onClick={() => handleItemClick(index)}
              className={`flex px-3 items-center space-x-2 py-4 text-lg hover:bg-[#131517] ${
                selectedItem === index
                  ? " border-l-8 border-[#137271] text-[#137271] rounded-t-lg bg-[#131517]"
                  : ""
              }`}>
              {items.icon}
              <p className='hidden lg:flex'>{items.label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

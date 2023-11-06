import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineSearch,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoCreateOutline, IoNotificationsOutline } from "react-icons/io5";
import { TiGroupOutline } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineContactSupport } from "react-icons/md";

export const navbarItems = [
  {
    icon: <AiOutlineHome size={25} />,
    label: "Home",
  },
  // { icon: <AiOutlineSearch size={25} />, label: "Search" },
  {
    icon: <FiUsers size={25} />,
    label: "Friends",
  },
  {
    icon: <TiGroupOutline size={25} />,
    label: "Groups",
  },
  {
    icon: <CiBookmark size={25} />,
    label: "Saved",
  },
  {
    icon: <AiOutlineUserAdd size={28} />,
    label: "Suggestions",
  },
  {
    icon: <AiOutlineMessage size={25} />,
    label: "Messages",
  },
  {
    icon: <IoNotificationsOutline size={25} />,
    label: "Notifications",
  },
  {
    icon: <MdOutlineContactSupport size={25} />,
    label: "Contact",
  },
];

export const mobileNavbar = navbarItems.slice(0, 5);

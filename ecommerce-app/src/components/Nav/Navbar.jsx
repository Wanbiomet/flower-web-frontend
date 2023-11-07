import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
const nav__links = [
  {
    path: "/",
    display: "Trang chủ",
  },
  {
    path: "/occasion",
    display: "Chủ đề",
    submenu: [
      {
        path: "/occasion",
        display: "Sinh nhat",
      },
      {
        path: "/occasion",
        display: "Dam cuoi",
      },
    ],
  },
  {
    path: "/object",
    display: "Đối tượng",
  },
  {
    path: "/flowertype",
    display: "Loài hoa",
  },
  {
    path: "/about",
    display: "giới thiệu",
  },
  {
    path: "/contact",
    display: "liên hệ",
  },
];
const Navbar = ({ active }) => {
  return (
    <nav className="w-full h-full block py-3 items-center justify-center 800px:flex 800px:py-0">
      <ul className="items-center gap-8 uppercase 800px:flex">
        {nav__links.map((i, index) => {
          // <div className="flex" key={index}>
          //   <Link
          //     to={i.path}
          //     className={`${
          //       active === index + 1 ? "text-[#e84393]" : "text-[#363949]"
          //     } font-[500] text-lg px-6 cursor-pointer`}
          //   >
          //     {i.display}
          //   </Link>
          // </div>
          return <NavLinks items={i} index={index} active={active}/>
        })}
      </ul>
    </nav>
  );
};

export default Navbar;

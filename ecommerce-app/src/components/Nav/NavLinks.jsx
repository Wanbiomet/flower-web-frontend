import React, { useState } from "react";
import SubNav from "./SubNav";

const NavLinks = ({ items, index, active }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <li key={index} className="py-3 pl-4">
      <span
        className={`${
          active === index + 1 ? "text-[#e84393]" : "text-[#363949]"
        } font-[500] text-[15px] px-3 cursor-pointer`}
        onClick={toggleSubMenu}
      >
        {items.display}
      </span>
      {isSubMenuOpen && <SubNav items={items.submenu} />}
    </li>
  );
};

export default NavLinks;

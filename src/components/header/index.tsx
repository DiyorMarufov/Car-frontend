import { memo } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="container flex items-center justify-center h-[70px] gap-[50px]">
        <NavLink
          end={true}
          to={"/"}
          className={({ isActive }) =>
            `text-[18px] py-1 px-8 ${
              isActive ? "bg-[dodgerblue] text-[white]" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/car"}
          className={({ isActive }) =>
            `text-[18px] py-1 px-8 ${
              isActive ? "bg-[dodgerblue] text-[white]" : ""
            }`
          }
        >
          Car
        </NavLink>
      </nav>
    </header>
  );
};

export default memo(Header);

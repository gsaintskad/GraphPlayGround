import React from "react";
import { ModeToggle } from "@/components/shadcnUI/ModeToggle.tsx";
import LanguageSelect from "@/components/NavigationBar/LanguageSelect.tsx";
import NavLink from "@/components/NavigationBar/NavLink.tsx";
import { PiGraphBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { Button } from "../shadcnUI/button.tsx";
import { logout } from "@/redux/Auth/actionCreator.ts";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div
      className={
        "flex justify-between items-center bg-zinc-700/10 sticky text-foreground px-[2em] py-[0.5em] m-[1em] rounded-3xl"
      }
    >
      {/*<BreadCrumb/>*/}
      <div className="flex justify-center items-center space-x-2">
        <PiGraphBold className="text-[40px]" />
        <NavLink to="/">Algorithmer</NavLink>
      </div>
      <div className="flex items-center gap-x-5">
        <NavLink to="/GraphBuilder">Graph Builder</NavLink>

        <NavLink to="/BTreeBuilder">BTree Builder</NavLink>
        <NavLink to="/About">About</NavLink>
      </div>

      <div className={"flex gap-x-6 items-center"}>
        <ModeToggle />
        <LanguageSelect />
        {isAuthenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={() => navigate("/auth/login")}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;

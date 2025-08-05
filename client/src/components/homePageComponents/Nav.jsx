import React, { useContext } from "react";
import { DialogOpenContext } from "../../context/DialogContext";
import { useAuthStore } from "../../store/authstore";

const Nav = () => {
  const { setOpen } = useContext(DialogOpenContext);
   const {  user } = useAuthStore();

  const dailogOpen = () => {
    setOpen((pre) => !pre);
  };
  return (
    <div
      className="flex w-full mx-auto min-h-20 justify-between items-center 
    bg-[#e0e0e000] px-10 absolute top-0"
    >
      <h1 className="logo text-[#74f1ff96] text-xl">EK-GAUTHAM_ai</h1>
     {!user && <div className=" text-white flex justify-between items-center gap-10">
        <div
          onClick={dailogOpen}
          className="bg-[#3bd5ff19] px-7 py-1 rounded-4xl border border-[#20cfff38] hover:bg-[#86fde9c3] hover:text-neutral-800 cursor-pointer 
        shadow-[inset_0px_1px_4px_0px_rgba(255,255,255,0.1),inset_0px_-1px_4px_0px_rgba(255,255,255,0.1)]
        "
        >
          Signup
        </div>
      </div> }
      {user && <div className=" text-white flex justify-between items-center gap-10">
        <div
          className="bg-[#3bd5ff19] px-7 py-1 rounded-4xl border border-[#20cfff38] hover:bg-[#86fde9c3] hover:text-neutral-800 cursor-pointer 
        shadow-[inset_0px_1px_4px_0px_rgba(255,255,255,0.1),inset_0px_-1px_4px_0px_rgba(255,255,255,0.1)]
        "
        >
          {user.username}
        </div>
      </div> }
    </div>
  );
};

export default Nav;

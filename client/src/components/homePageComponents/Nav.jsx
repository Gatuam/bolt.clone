import React, { useContext } from "react";
import { DialogOpenContext } from "../../context/DialogContext";



const Nav = () => {
  const {open, setOpen} = useContext(DialogOpenContext);

const dailogOpen = ()=>{
  setOpen((pre)=> !pre)
}
  return (
    <div
      className="flex w-[100%] h-20 justify-between items-center 
    bg-[#0000] px-10 absolute top-0"
    >
      <h1 className="logo text-[#74f1ff96] text-3xl">bolt.clone</h1>
      <div className=" text-white flex justify-between items-center gap-10">
        <div
          className="bg-[#3bd5ff19] px-7 py-1 rounded-4xl border border-[#20cfff38] hover:bg-[#86fde9c3] hover:text-neutral-800 cursor-pointer 
        shadow-[inset_0px_1px_4px_0px_rgba(255,255,255,0.1),inset_0px_-1px_4px_0px_rgba(255,255,255,0.1)]
        "
        >
          Login
        </div>
        <div
        onClick={dailogOpen}
          className="bg-[#3bd5ff19] px-7 py-1 rounded-4xl border border-[#20cfff38] hover:bg-[#86fde9c3] hover:text-neutral-800 cursor-pointer 
        shadow-[inset_0px_1px_4px_0px_rgba(255,255,255,0.1),inset_0px_-1px_4px_0px_rgba(255,255,255,0.1)]
        "
        >
          Signup
        </div>
      </div>
    </div>
  );
};

export default Nav;

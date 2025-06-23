import React, { useContext } from 'react';
import { motion } from "motion/react";
import { DialogOpenContext } from "../../context/DialogContext";
const SinginDailog = () => {

const { open, setOpen } = useContext(DialogOpenContext);

  
  const dialogOpener = ()=>{
    (setOpen((pre)=> !pre));
  } 

  return (
  
  <>
   { open &&  
   <div className='w-full h-screen absolute bg-transparent backdrop-blur-3xl z-1'>
   <div className=' fixed top-60 left-180 z-10 '>
        <div className='w-90 h-100  bg-[#050610] border border-[#1ed2ff2b] rounded-2xl  flex flex-col justify-center items-center relative'>
        <div className='text-center'>
          <h1 className='text-white text-xl'>
            Sign up to get start
          </h1>
          <p className='text-neutral-400 mt-2 mb-5'>
            singup to get 100M token free on ek.ai
          </p>
        </div>
        <div className=''>
          <form className='flex flex-col justify-center items-center' action="">
            <input className='w-76 h-10 outline-0 border border-[#1ed2ff2b] rounded-md mt-5 text-neutral-300 px-3 text-sm' placeholder='john@gmail.com' type="text" />
          <input className='w-76 h-10 outline-0 border border-[#1ed2ff2b] rounded-md mt-2 mb-5 text-neutral-300 px-3 text-sm' placeholder='password' type="password" />
          <button className='mt-3 border border-[#1ed2ff2b] px-4 py-1 bg-[#1ed2ff12] text-white rounded-4xl cursor-pointer hover:bg-[#1eadff3b]
       shadow-[inset_0px_1px_4px_0px_rgba(255,255,255,0.1),inset_0px_-1px_4px_0px_rgba(255,255,255,0.1)]
          
          '>Sign up</button>
          </form> 
        </div>
      <div 
      onClick={dialogOpener}
      className='absolute border p-2 border-[#2176ff3b] rounded-full flex justify-center items-center top-6 right-4 cursor-pointer text-red-200 bg-[#45ddff09]
      ' >
        X
      </div>
      </div> 
    </div>
    </div> }
    </>
  )
}

export default SinginDailog
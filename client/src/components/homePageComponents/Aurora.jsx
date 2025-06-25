import React from "react";
import {
  animate,
  easeInOut,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { colors, svgs } from "../../utils/constants";
import { useEffect } from "react";
import InputBox from "./InputBox";
import Nav from "./Nav";

const Aurora = () => {
  const color = useMotionValue(colors[2]);
  const backgroundImage = useMotionTemplate`radial-gradient(120% 140% at 50% 0%, #020617 50%, ${color})`;
  useEffect(() => {
    animate(color, colors, {
      ease: easeInOut,
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  });
  return (
    <motion.div
      className="w-full h-screen  flex flex-col justify-center items-center bg-gradient-to-b from-[#000000] to-[#151515] text-white relative"
      style={{
        backgroundImage,
      }}
    >
      <Nav />
      <div
        className="absolute top-50 border px-5 py-1 border-[#326bfb4d] bg-[#2f5ce413] rounded-4xl w-70 h-8 flex justify-center items-center  
        shadow-[inset_0px_1px_4px_0px_rgba(255,255,255,0.1),inset_0px_-1px_4px_0px_rgba(255,255,255,0.1)]"
      >
        <h1 className="text-[#ffffff7b] text-sm ">
          Best Ai App for React and Nodejs
        </h1>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-neutral-200 font-bold text-4xl mb-4">
          What do you want to build?
        </h1>
        <p className="text-sm  text-neutral-500 ">
          Create stunning apps & websites by chatting with AI.
        </p>
      </div>
      <InputBox size="small" />
      <div className="absolute bottom-20 flex gap-5  ">
        {svgs.map((item) => (
          <div
            key={item.id}
            className="border px-3 py-1 border-[#326bfb4d] bg-[#2f5ce413] rounded-4xl flex justify-center items-center cursor-pointer hover:bg-[#7dd4ff1e] w-12 h-12"
          >
            <img src={item.svg} alt="" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Aurora;

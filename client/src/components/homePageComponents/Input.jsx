import React from "react";

const Input = ({ ...props }) => {
  return (
    <>
      <input
        {...props}
        className="w-80 h-10 outline-0 border border-[#1ed2ff2b] rounded-md mt-5 text-neutral-300 px-3 text-sm"
      />
    </>
  );
};

export default Input;

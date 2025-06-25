import React, { useContext } from "react";
import { MessagesContext } from "../../context/Messages.context";
import InputBox from "../homePageComponents/InputBox";

const ChatView = () => {
  const { message } = useContext(MessagesContext);
  return (
    <div className="bg-[#06181a23] h-[99vh] border border-[#1dd9ff22] p-3 rounded-lg flex flex-col justify-between items-center gap-5">
      <>
        {message.map((msg, i) => {
          return (
            <div
              key={i}
              className="justify-between items-center bg-[#31313181] py-3 rounded-md border border-[#277af614] w-[100%] h-15 flex flex-wrap px-5 "
            >
              <h1 className="text-neutral-300 overflow-hidden wrap-break-word text-[13px] leading-5 tracking-wide">
                {msg.message}
              </h1>
              <div className="flex justify-center items-center gap-2 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <p className="text-neutral-500 font-light text-sm ">
                  {msg.role}
                </p>
              </div>
            </div>
          );
        })}
      </>
      <div className=" flex flex-col flex-grow p-2 rounded-lg w-[100%] h-30 gap-5 ">
        <div className="w-[100%] flex-grow bg-[#1111118c]  border border-[#1dd9ff22] rounded-lg"></div>
        <InputBox size="large" />
      </div>
    </div>
  );
};

export default ChatView;

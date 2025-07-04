import React, { useContext } from "react";
import { MessagesContext } from "../../context/Messages.context";
import InputBox from "../homePageComponents/InputBox";

const ChatView = () => {
  const { message } = useContext(MessagesContext);

  return (
    <div className="bg-[#06181a23] h-[99vh] border border-[#1dd9ff22] p-3 rounded-lg flex flex-col justify-between relative overflow-hidden">
      {}
      <div className="overflow-y-auto px-2 flex-1 flex flex-col gap-4 pr-3 w-full [&::-webkit-scrollbar]:hidden">
        {message.map((msg, i) => (
          <div
            key={i}
            className={`self-${
              msg.role === "user" ? "end" : "start"
            } max-w-[100%] bg-[#31313181] text-neutral-300 p-3 rounded-md border border-[#277af614] text-sm`}
          >
            <p className="break-words leading-5">{msg.message}</p>
            <div className="flex items-center gap-2 mt-2 text-neutral-500 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {msg.role}
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="mt-3">
        <InputBox size="large" />
      </div>
    </div>
  );
};

export default ChatView;

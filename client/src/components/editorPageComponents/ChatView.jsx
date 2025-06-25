import React, { useContext } from "react";
import { MessagesContext } from "../../context/Messages.context";
import InputBox from "../homePageComponents/InputBox";
import { SandPackContext } from "../../context/SandPackContext";
import { Check } from "lucide-react";

const ChatView = () => {
  const { message } = useContext(MessagesContext);
  const { rawFiles } = useContext(SandPackContext);

  return (
    <div className="bg-[#06181a23] h-[99vh] border border-[#1dd9ff22] p-3 rounded-lg flex flex-col justify-between items-center gap-5 max-h-[95vh] overflow-auto [&::-webkit-scrollbar]:hidden relative ">
      <div className=" overflow-y-auto [&::-webkit-scrollbar]:hidden w-[100%] flex flex-col gap-2 h-full ">
        <>
          {message.map((msg, i) => {
            return (
              <div
                key={i}
                className="justify-between items-center bg-[#31313181] py-3 rounded-md border border-[#277af614] w-[100%] h-15 flex flex-wrap px-5  relative  "
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
        <div
          className=" flex flex-col rounded-lg w-[100%] gap-5 h-200 overflow-y-auto flex-grow bg-[#1111118c] border border-[#1dd9ff22] p-5 [&::-webkit-scrollbar]:hidden 
      "
        >
          {}
          {rawFiles.map((file, idx) => (
            <div key={idx} className="flex flex-col mb-6">
              {}
              <div className="flex items-center gap-2 text-white text-sm mb-2">
                <Check className="text-green-400" size={16} />
                <span>Create</span>
                <code className="text-[#1dd9ff]">{file.category}</code>
              </div>

              {}
              <pre className="bg-[#00000044] text-white text-sm p-3 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
                <code>{file.content}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
      <InputBox size="large" className=" absolute" />
    </div>
  );
};

export default ChatView;

import React, { useContext } from "react";
import { appIdeas } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { MessagesContext } from "../../context/Messages.context";
import { useLocation } from "react-router-dom";
import { PromptContext } from "../../context/PromptContext";

const InputBox = ({ size = "medium" }) => {
  const location = useLocation();
  const {  setMessage } = useContext(MessagesContext);
  const { input, setInput} = useContext(PromptContext);
  const onType = (input) => {
    setInput(input);
    setMessage((prev) => [...prev, { role: "user", message: input }]); 
    handlerNavigate();
  };

  const navigate = useNavigate();

  const handlerNavigate = () => {
    navigate("/editor");
  };

  const containerWidth = {
    small: "w-[60%]",
    medium: "w-[80%]",
    large: "w-[100%]",
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div
        className={`flex flex-col ${containerWidth[size]} h-35 rounded-md text-neutral-500 bg-[#11111128] text-sm border border-[#24a4f956] outline-0 p-3 font-medium justify-between relative`}
      >
        <textarea
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="w-full pl-4 pt-2 pr-16 focus:outline-none resize-none text-bolt-elements-textPrimary  placeholder-bolt-elements-textTertiary bg-transparent text-sm"
          placeholder="Hello how ek.ai can help you today?"
          name="prompt"
          id=""
        ></textarea>
        <div className="absolute top-0 left-0 h-[1.5px] w-[30%] bg-[rgba(40,116,248,0.66)] blur-[5px] "></div>
        <div className="absolute top-0 left-3 h-[1px] w-[30%] bg-[rgba(40,54,248,0.84)] blur-[3px] "></div>

        <div className="absolute bottom-3 left-5 flex gap-2 pb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 text-neutral-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </div>
        <>
          {input && (
            <button
              disabled={!input.trim()}
              onClick={() => {
                handlerNavigate();
                onType(input); 
              }}
              className="flex absolute bottom-3 right-5 border bg-[#1174ff06] border-[#1ad5ff2b] px-3 py-1 rounded-2xl hover:bg-[#1aecff17] cursor-pointer"
            >
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
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          )}
        </>
      </div>
      {location.pathname === "/" && (
        <div className="flex w-150 flex-wrap ` justify-center items-center mt-4">
          {appIdeas.map((item, id) => {
            return (
              <div
                key={id}
                onClick={() => {
                  handlerNavigate("/editor"), onType(item.idea);
                }}
                className="border border-[#22a7ff4e] px-4 py-[1px] rounded-4xl ml-2 mt-2 bg-[#2aa3ff18] 
            shadow-[inset_0px_1px_4px_0px_rgba(255,255,255,0.1),inset_0px_-1px_4px_0px_rgba(255,255,255,0.1)]
            "
              >
                <p className="text-sm text-neutral-400 hover:text-white cursor-pointer">
                  {item.idea}{" "}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InputBox;

import ChatView from "../components/editorPageComponents/ChatView";
import Codepreview from "../components/editorPageComponents/Codepreview";
import React from "react";

const EditorPage = () => {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.15) 1px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
      className="w-full h-screen text-white text-4xl justify-between items-center bg-[#090909] flex py-1 px-1"
    >
      <div className=" w-120">
        <ChatView></ChatView>
      </div>
      <div className="flex-1">
        <Codepreview />
      </div>
    </div>
  );
};

export default EditorPage;

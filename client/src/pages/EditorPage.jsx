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
      className="w-full  text-white text-4xl justify-between items-center bg-[#090909]  py-1 grid gap-2 lg:flex "
    >
      <div className="max-w-lg mx-auto px-1 ">
        <ChatView></ChatView>
      </div>
      <div className="flex-1">
        <Codepreview />
      </div>
    </div>
  );
};

export default EditorPage;

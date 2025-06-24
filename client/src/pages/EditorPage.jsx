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
      className="w-full h-screen text-white text-4xl justify-center items-center bg-[#090909] grid grid-cols-3 py-1 px-1"
    >
      <div className=" col-span-1">
        <ChatView></ChatView>
      </div>
      <div className="col-span-2">
        <Codepreview />
      </div>
    </div>
  );
};

export default EditorPage;

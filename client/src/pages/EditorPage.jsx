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
      className="text-white text-4xl bg-[#090909] flex flex-col md:flex-row p-3 gap-4 min-h-[196%] md:min-h-screen overflow-hidden"
    >
      <div className="min-h-[350px] ">
        <ChatView />
      </div>
      <div className="w-full flex-1">
        <Codepreview />
      </div>
    </div>
  );
};

export default EditorPage;

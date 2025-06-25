import React, { useEffect, useState, useContext } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { XMLParser } from "fast-xml-parser";
import { PromptContext } from "../../context/PromptContext";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { MessagesContext } from "../../context/Messages.context";

const Codepreview = () => {
  const { message } = useContext(MessagesContext);
  const { input } = useContext(PromptContext);
  const [activeTab, setActiveTab] = useState("code");
  const [sandpackFiles, setSandpackFiles] = useState({});
  const [sandpackTemplate, setSandpackTemplate] = useState("react");
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const response = await axios.post(`${BACKEND_URL}/template`, {
          prompt: input,
        });
        const { uiPrompts } = response.data;
        console.log(uiPrompts);
        const result = parser.parse(uiPrompts);

        const actions = result.boltArtifact.boltAction;
        const array = Array.isArray(actions) ? actions : [actions];

        const files = array.map((a) => ({
          type: a.type,
          filePath: a.filePath,
          content: a["#text"] || "",
        }));
        const formatted = files.reduce((acc, file) => {
          acc[file.filePath] = {
            code: file.content || "",
          };
          return acc;
        }, {});
        const isNode = files.some((file) => file.filePath === "index.js");
        const template = isNode ? "node" : "react";
        setSandpackTemplate(template);
        setSandpackFiles(formatted);

        console.log(files);
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    }

    fetchTemplate();
  }, [message]);

  return (
    <div className="ml-2 px-2 bg-[#111] h-[99vh] border border-[#1dd9ff22] p-3 rounded-lg">
      {}
      <div className="w-full h-10 flex gap-2 mb-2">
        <div className="bg-[#111] border border-[#19ffd927] p-1 rounded-full text-[16px] flex justify-center items-center gap-1">
          <h2
            className={`bg-[#3a3a3a9e] p-[6px] border border-[#19ffd927] rounded-full cursor-pointer transition-colors ${
              activeTab === "code"
                ? "text-white bg-[#19ffd927]"
                : "text-neutral-400"
            }`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </h2>
          <h2
            className={`bg-[#3a3a3a9e] p-[6px] border border-[#19ffd927] rounded-full cursor-pointer transition-colors ${
              activeTab === "preview"
                ? "text-white bg-[#19ffd927]"
                : "text-neutral-400"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h2>
        </div>
      </div>

      <SandpackProvider
        template="react"
        theme={"dark"}
        files={sandpackFiles}
        options={{
          activeFile:
            sandpackTemplate === "node" ? "/index.js" : "/src/main.tsx",
        }}
      >
        <SandpackLayout>
          <SandpackFileExplorer style={{ height: "90vh" }} />
          {activeTab === "code" && (
            <SandpackCodeEditor
              style={{
                height: "90vh",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            />
          )}
          {activeTab === "preview" && (
            <SandpackPreview style={{ height: "90vh" }} showNavigator={true} />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default Codepreview;

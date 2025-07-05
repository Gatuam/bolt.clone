import React, { useEffect, useState, useContext } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { MessagesContext } from "../../context/Messages.context";
import { AllDependencies, defaultFiles } from "../helper/codeview";

const sanitizeFiles = (rawFiles) => {
  const sanitized = {};
  for (const [path, file] of Object.entries(rawFiles)) {
    if (!file || typeof file !== "object") continue;

    if (path === "/package.json" && typeof file.code === "object") {
      sanitized[path] = {
        code: JSON.stringify(file.code, null, 2), // Convert to string
      };
    } else {
      sanitized[path] = {
        code: file.code,
      };
    }
  }
  return sanitized;
};

const Codepreview = () => {
  const { message } = useContext(MessagesContext);
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState({ ...defaultFiles });

  useEffect(() => {
    const lastMessage = message[message.length - 1]?.message;

    async function fetchTemplate() {
      try {
        const response = await axios.post(`${BACKEND_URL}/template`, {
          prompt: lastMessage,
        });
        const raw = response.data.response || response.data;
        const sanitized = sanitizeFiles(raw);
        setFiles(sanitized);
      } catch (error) {
        console.error("Error fetching template:", error.message);
      }
    }

    if (lastMessage) {
      fetchTemplate();
    }
  }, [message]);

  return (
    <div className="ml-2 px-2 bg-[#111] h-[99vh] border border-[#1dd9ff22] p-3 rounded-lg">
      {/* Tab Switcher */}
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
        template=""
        files={files}
        theme="dark"
        options={{
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
        }}
        customSetup={{
          entry: "/src/main.jsx",
          dependencies: {
            ...AllDependencies.dependencies,
            ...AllDependencies.devDependencies,
          },
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
            <SandpackPreview style={{ height: "90vh" }} showNavigator />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default Codepreview;

import React, { useEffect, useState, useContext } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { PromptContext } from "../../context/PromptContext";
import { SandPackContext } from "../../context/SandPackContext";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Codepreview = () => {
  const { input } = useContext(PromptContext);
  const { sandpackFiles, setSandpackFiles } = useContext(SandPackContext);
  const [activeTab, setActiveTab] = useState("code");
  const [activeFile, setActiveFile] = useState("/src/App.jsx");
  const [projectType, setProjectType] = useState("react"); // 'react' or 'node'

  // Parse Bolt XML response
  const parseBoltArtifact = (artifact) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(artifact, "text/xml");
    const files = {};

    const boltActions = xmlDoc.querySelectorAll('boltAction[type="file"]');
    boltActions.forEach((action) => {
      const filePath = `/${action.getAttribute("filePath")}`;
      const content = action.textContent || "";

      files[filePath] = {
        code: content,
        hidden: shouldHideFile(filePath),
      };

      // Set active file based on project type
      if (
        projectType === "react" &&
        (filePath.endsWith(".jsx") || filePath.endsWith(".js"))
      ) {
        setActiveFile(filePath);
      } else if (projectType === "node" && filePath.endsWith("/index.js")) {
        setActiveFile(filePath);
      }
    });

    return files;
  };

  // Determine if a file should be hidden
  const shouldHideFile = (filePath) => {
    const hiddenFiles = [
      "vite-env.d.ts",
      "tsconfig",
      "package.json",
      "postcss.config.js",
      "tailwind.config.js",
    ];

    return hiddenFiles.some((hidden) => filePath.includes(hidden));
  };

  // Detect project type based on files
  const detectProjectType = (files) => {
    if (files["/src/App.jsx"] || files["/src/main.jsx"]) {
      return "react";
    }
    if (files["/index.js"] || files["/server.js"]) {
      return "node";
    }
    return "react"; // default to react
  };

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const response = await axios.post(`${BACKEND_URL}/template`, {
          prompt: input,
        });
        const { uiPrompts } = response.data;

        if (uiPrompts) {
          // First parse to detect project type
          const initialFiles = parseBoltArtifact(uiPrompts);
          const detectedType = detectProjectType(initialFiles);
          setProjectType(detectedType);

          // Re-parse with proper project type settings
          const parsedFiles = parseBoltArtifact(uiPrompts);
          setSandpackFiles(parsedFiles);

          // Set active file based on project type
          if (detectedType === "react" && parsedFiles["/src/App.jsx"]) {
            setActiveFile("/src/App.jsx");
          } else if (detectedType === "node" && parsedFiles["/index.js"]) {
            setActiveFile("/index.js");
          }
          console.log(parsedFiles);
        }
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    }

    if (input) {
      fetchTemplate();
    }
  }, [input]);

  // Get Sandpack template based on project type
  const getSandpackTemplate = () => {
    return projectType === "node" ? "static" : "react";
  };

  // Get custom setup based on project type
  const getCustomSetup = () => {
    if (projectType === "react") {
      return {
        dependencies: {
          "lucide-react": "^0.344.0",
          tailwindcss: "^3.4.1",
          autoprefixer: "^10.4.18",
          postcss: "^8.4.35",
        },
      };
    }
    return {
      dependencies: {},
    };
  };

  const getAdditionalFiles = () => {
    const basePackageJSON = {
      code: JSON.stringify(
        {
          name: "generated-project",
          version: "1.0.0",
          main: "index.js",
          dependencies: getCustomSetup().dependencies || {},
        },
        null,
        2
      ),
      hidden: true,
    };

    if (projectType === "react") {
      return {
        "/postcss.config.js": {
          code: `export default {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        };`,
          hidden: true,
        },
        "/tailwind.config.js": {
          code: `/** @type {import('tailwindcss').Config} */
        export default {
          content: ['./index.html', './src/**/*.{js,jsx}'],
          theme: {
            extend: {},
          },
          plugins: [],
        };`,
          hidden: true,
        },
        "/package.json": basePackageJSON,
      };
    }

    // For Node or default case
    return {
      "/package.json": basePackageJSON,
    };
  };

  return (
    <div className="ml-2 px-2 bg-[#111] h-[99vh] border border-[#1dd9ff22] p-3 rounded-lg">
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
        template={getSandpackTemplate()}
        theme="dark"
        files={{
          ...sandpackFiles,
          ...getAdditionalFiles(),
          // Add index.html for Node.js projects
          ...(projectType === "node" && !sandpackFiles["/index.html"]
            ? {
                "/index.html": {
                  code: `<!DOCTYPE html>
<html>
  <head>
    <title>Node.js App</title>
  </head>
  <body>
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Node.js Application</h1>
      <p>This is a Node.js project. The preview is limited in this environment.</p>
      <p>Check the console for output (open browser developer tools).</p>
    </div>
    <script src="/index.js"></script>
  </body>
</html>`,
                  hidden: false,
                },
              }
            : {}),
        }}
        customSetup={getCustomSetup()}
        options={{
          activeFile,
          visibleFiles: Object.keys(sandpackFiles).filter(
            (path) =>
              !shouldHideFile(path) &&
              !(projectType === "node" && path.includes("src/"))
          ),
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

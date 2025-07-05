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

const Codepreview = () => {
  const { message } = useContext(MessagesContext);

  const [activeTab, setActiveTab] = useState("code");
  const [sandpackTemplate, setSandpackTemplate] = useState("react");
  const [files, setFiles] = useState({});

  useEffect(() => {
    const lastMessage = message[message.length - 1]?.message;
    const file = {
    "/package.json": `
    {
      "dependencies": {
        "react": "18.2.0",
        "react-dom": "18.2.0",
        "lucide-react": "0.294.0"
      }
    }
    `,
    "/App.jsx": `
    import React, { useState, useEffect } from "react";

    export default function App() {
      const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
      });
      const [filter, setFilter] = useState("all");
      const [newTask, setNewTask] = useState("");

      useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }, [tasks]);

      const addTask = () => {
        if (newTask.trim() === "") return;
        setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
        setNewTask("");
      };

      const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? {...t, done: !t.done} : t));
      };

      const filteredTasks = tasks.filter(task => {
        if (filter === "all") return true;
        if (filter === "done") return task.done;
        if (filter === "pending") return !task.done;
      });

      return (
        <div style={{ maxWidth: 400, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
          <h1>Todo App</h1>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
          />
          <button onClick={addTask}>Add</button>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("done")}>Done</button>
            <button onClick={() => setFilter("pending")}>Pending</button>
          </div>
          <ul>
            {filteredTasks.map(task => (
              <li
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{ 
                  cursor: "pointer",
                  textDecoration: task.done ? "line-through" : "none"
                }}
              >
                {task.text}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    `
  };

    async function fetchTemplate() {
      try {
        const response = await axios.post(`${BACKEND_URL}/template`, {
          prompt: lastMessage,
        });
        const raw = response.data.response || response.data;

        setFiles(file);
        setSandpackTemplate("react");
      } catch (error) {
        console.error("Error fetching template:", error.message);

        setFiles({
          "/src/App.jsx": `
            export default function App() {
              return <div>Error loading code: ${error.message}</div>;
            };
          `,
          "/src/index.js": `
            import React from "react";
            import ReactDOM from "react-dom/client";
            import App from "./App";
            const root = document.getElementById("root");
            ReactDOM.createRoot(root).render(<App />);
          `,
        });
        setSandpackTemplate("react");
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
        template=''
        files={files}
        theme="dark"
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

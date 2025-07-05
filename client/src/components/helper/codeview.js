export const AllDependencies = {
  dependencies: {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.265.0",
    tailwindcss: "^3.3.3",
    autoprefixer: "^10.4.16",
    postcss: "^8.4.31",
    "@headlessui/react": "^1.7.16",
    "@heroicons/react": "^2.1.1",
  },
  devDependencies: {
    vite: "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    eslint: "^8.56.0",
    prettier: "^3.2.5",
  },
};

export const defaultFiles = {
  "/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React + Tailwind</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
  },

  "/src/main.jsx": {
    code: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },

  "/src/index.css": {
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  },

  "/tailwind.config.js": {
    code: `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};`,
  },

  "/postcss.config.js": {
    code: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  },

  "/src/App.jsx": {
    code: `export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">
        Hello from Sandpack React + Tailwind!
      </h1>
    </div>
  );
}`,
  },
};

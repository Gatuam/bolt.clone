import { createContext, useState } from "react";

export const SandPackContext = createContext();

export const SandPackProvider = ({ children }) => {
   const [sandpackFiles, setSandpackFiles] = useState({});
  return (
    <SandPackContext.Provider value={{ sandpackFiles, setSandpackFiles }}>
      {children}
    </SandPackContext.Provider>
  );
};
import React, { useState, createContext } from "react";

export const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
  const [ input , setInput ] = useState(""); // <-- set to empty string
  return (
    <PromptContext.Provider value={{ input , setInput }}>
      {children}
    </PromptContext.Provider>
  );
};

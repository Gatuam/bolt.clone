import React, { createContext, useState } from "react";

export const SandPackContext = createContext();

export const SandPackProvider = ({ children }) => {
  const [rawFiles, setRawFiles] = useState([]);

  return (
    <SandPackContext.Provider value={{ rawFiles, setRawFiles }}>
      {children}
    </SandPackContext.Provider>
  );
};

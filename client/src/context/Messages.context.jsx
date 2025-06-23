import React, { useState, createContext } from "react";

export const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [message, setMessage] = useState([]);
  return (
    <MessagesContext.Provider value={{ message, setMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

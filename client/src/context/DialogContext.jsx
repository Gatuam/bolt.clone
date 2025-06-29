import { createContext, useState, useContext } from "react";

export const DialogOpenContext = createContext();

export const DialogOpenProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("signup"); // or 'login'

  const openDialog = (type) => {
    setDialogType(type);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogType(null);
  };

  return (
    <DialogOpenContext.Provider value={{ open, setOpen, dialogType, openDialog, closeDialog }}>
      {children}
    </DialogOpenContext.Provider>
  );
};

export const useDialogOpen = () => useContext(DialogOpenContext);

import { createContext, useState } from "react";

export const DialogOpenContext = createContext();

export const dailogOpenerProvider = ({ children })=>{
     const [open, setOpen] = useState(false);
    return (
        <DialogOpenContext.Provider value = {{ open, setOpen }}>
            {children}
        </DialogOpenContext.Provider>
    )
}
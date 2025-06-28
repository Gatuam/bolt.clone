import { createContext, useState } from "react";

export const UserDetailContext = createContext();

export const UserDeatilProvider = ({ children })=>{
    const [userDetail, setUserDeatil] = useState();
    return (
        <UserDetailContext.Provider value = {{ userDetail, setUserDeatil }}>
            {children}
        </UserDetailContext.Provider>
    )
}
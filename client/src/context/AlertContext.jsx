import { createContext, useState } from "react";

export const AlertContext = createContext({});

export function AlertContextProvider ({children}){
    const [alert , setAlert ] = useState(null);
    const [type , setType ] = useState(null);
    return (
    <AlertContext.Provider value={{alert,setAlert,type,setType}} >
        {children}
    </AlertContext.Provider>
)}

import { createContext, useState } from "react";

export const BlogContext = createContext({})

export function BlogContextProvider ({children}){
    const [allBlogs, setAllBlogs] = useState(null);
    const [savedBlogs, setSavedBlogs] = useState([]);

    return (<BlogContext.Provider value={{allBlogs,setAllBlogs,savedBlogs,setSavedBlogs}}>
        {children}
    </BlogContext.Provider>)
}
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Blogs from './pages/Blogs.jsx'
import ViewBlog from "./pages/ViewBlog";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { BlogContextProvider } from './context/BlogContext.jsx'
import CreatePost from './pages/WriteBlog.jsx'
import { AlertContextProvider } from './context/AlertContext.jsx'
import EditBlog from './pages/EditBlog.jsx'
import SavedBlogs from './pages/SavedBlogs.jsx'
import OwnBlogs from './pages/OwnBlogs.jsx'

let router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children:[
      {
        path:'/',
        element:<Blogs/>
      },{
        path:'/login',
        element:<Login/>
      },{
        path:'/register',
        element:<Register/>
      },{
        path:'/writeBlog',
        element:<CreatePost/>
      },{
        path:'/blogs/:id',  
        element:<ViewBlog/>
      },{
        path:'/edit/:id',
        element:<EditBlog/>
      },{
        path:'/saved',
        element:<SavedBlogs/>
      },{
        path:'/yourblogs',
        element:<OwnBlogs/>
      }
    ]
  },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <BlogContextProvider>
        <AlertContextProvider>
          <RouterProvider router={router} />
        </AlertContextProvider>
      </BlogContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)

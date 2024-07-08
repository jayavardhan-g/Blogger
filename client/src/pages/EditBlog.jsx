import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
import { UserContext } from "../context/UserContext";
import ReactQuill from "react-quill";
import '../Quill.css'

const EditBlog = (props) => {
    const [blog, setBlog ] = useState(null);
    const [edit, setEdit ] = useState(false);
    const {setAlert, setType } = useContext(AlertContext);
    const {userInfo} = useContext(UserContext);
    const navigate = useNavigate();

    const {id} = useParams();
    const getBlog = async()=>{
        const res = await fetch(`https://blogger-backend-n0va.onrender.com/blogs/${id}`,{
            method:'GET',
            // credentials:'include'
        })
        const response = await res.json();
        setBlog(response);
        if(response.author._id===userInfo._id){
            setEdit(true);
        }
        // console.log("blog",response.author._id);
        setTitle(response.title);
        setContent(response.content);
        setTags(response.tags);
    }
    
    const [title,setTitle] =useState("");
    const [tags, setTags] = useState("");
    const [content,setContent] = useState("");
    var [file,setFile] = useState([]);

    const updateBlog = async (e) =>{
        e.preventDefault();
        var data = new FormData();
        data.set('title',title);
        data.set('content',content);
        data.set('tags',tags);
        data.set('file',file[0]);
        data.set('blogid',blog._id)
        data.set('blogtoken',localStorage.getItem('blogtoken'));

        const res = await fetch("https://blogger-backend-n0va.onrender.com/blogs/edit",{
            method:"POST",
            body:data,
            // credentials:'include'
        })
        if(res.status==400){
            setAlert("Some error occured");
            setType("Error");
        }else{
            setAlert("Successfully updated the blog. Taking you to the blog")
            setType("Success");
            setTimeout(()=>{
                navigate(`../blogs/${blog._id}`)
            },1000)
        }
    }

    useEffect(()=>{
        getBlog();
        console.log(userInfo);
    },[userInfo])

    useEffect(()=>{
        console.log(blog);
    },[blog])

    return (
<>
{edit?
<div className="flex max-w-7xl justify-center items-center mx-auto ">
    <div className="w-full mx-auto overflow-hidden">
        <div className="sm:px-6 sm:py-4 sm:my-4 my-2 px-3 py-2">
            <form className="w-full" onSubmit={updateBlog} encType="multipart/form-data">
                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg   focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='title' placeholder="Title" aria-label="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg   focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='tags' placeholder="Tags separated by a space" aria-label="tags" onChange={(e)=>setTags(e.target.value)} value={tags} />
                </div>
                <div className="flex w-full mt-4">
                    <input className="block  px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg   focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='file' placeholder="file" aria-label="file" type="file" accept=".jpg,.png,.jpeg,.svg,.webp" onChange={(e)=>setFile(e.target.files)} />
                    <div className="w-1/2 flex flex-wrap mx-4 justify-start text-gray-700 items-center" >You can choose a picture if you want a new one or the previous one will be visible</div>
                </div>

                    <ReactQuill theme="snow" className="mt-4" value={content} onChange={setContent}>
                    </ReactQuill>

                <div className="flex items-center justify-between mt-4">
                    <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>:
<div className="flex h-screen w-full justify-center items-center" >
    <div>You can not edit this blog</div>
</div>
}
</>
  )
}
export default EditBlog
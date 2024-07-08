import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ReactQuill from 'react-quill';
import '../Quill.css'
import { UserContext } from "../context/UserContext";
import { AlertContext } from "../context/AlertContext";

const CreatePost = () => {
    const [title , setTitle] = useState("");
    const [content, setContent] = useState("")
    const [tags, setTags ] = useState("");
    var [file,setFile] = useState([]);
    const {userInfo} = useContext(UserContext);
    const {setAlert, setType } = useContext(AlertContext)
    const navigate = useNavigate();

    const postBlog = async (e) =>{
        e.preventDefault();
        var data = new FormData();
        data.set('title',title);
        data.set('content',content);
        data.set('tags',tags);
        data.set('file',file[0]);
        
        const res = await fetch("https://blogger-backend-n0va.onrender.com/blogs/post",{
            method:"POST",
            body:data,
            credentials:'include'
        })
        const response = await res.json();
        if(res.status==400){
            setAlert("Some error occured. Please try again after sometime");
            setType("Error");
        }else{
            setAlert("Successfully posted the blog. Taking you to your blog");
            setType("Success");
            setTimeout(()=>{
                navigate(`../blogs/${response._id}`)
            },1000)
        }
    }


    // useEffect(()=>{
    //     console.log(content);
    // },[content])
    useEffect(()=>{
        
    },[userInfo])

return (
<>
{userInfo?
    <div className="flex max-w-7xl justify-center items-center mx-auto ">
    <div className="w-full mx-auto overflow-hidden">
        <div className="sm:px-6 sm:py-4 sm:my-4 my-2 px-3 py-2">
            <form className="w-full" onSubmit={postBlog} encType="multipart/form-data">
                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700  placeholder-gray-500 bg-white border rounded-lg   focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='title' placeholder="Title" aria-label="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg   focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='tags' placeholder="Tags separated by a hashtag (#) Eg. #cat#dog" aria-label="tags" onChange={(e)=>setTags(e.target.value)} value={tags} />
                </div>
                <div className="w-full flex flex-row mt-4">
                    <input className="block px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg   focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='file' placeholder="File" aria-label="file" type="file" accept=".jpg,.png,.jpeg,.svg,.webp" onChange={(e)=>setFile(e.target.files)} />
                    <div className="w-full flex mx-4 justify-start text-gray-700 items-center" >You have to choose a picture</div>
                    
                </div>

                    <ReactQuill theme="snow" className="mt-4" value={content} placeholder="Write your content here" onChange={setContent}>
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
<div className="flex flex-col justify-center items-center h-screen w-full">
    <div>
        You need to be signed in to write a blog
    </div>
    <div>
        <Link to='/register'>
        <button className="button bg-blue-500 rounded-md text-white m-4 p-2">
            Register
        </button>
        </Link>
        <Link to='/login'>
        <button className="button bg-blue-500 rounded-md text-white m-4 p-2">
            Login
        </button>
        </Link>
    </div>
</div>
 }
</>
  )
}
export default CreatePost
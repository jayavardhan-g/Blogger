import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import Save from '/save.png'
import Saved from '/saved.png'
import Edit from '/edit.png'
import Share from '/share.png'
import { AlertContext } from "../context/AlertContext";

const ViewBlog = () => {
    const {userInfo,setUserInfo} = useContext(UserContext);
    const [blog, setBlog ] = useState(null);
    const [edit, setEdit ] = useState(false);
    const {setAlert, setType } = useContext(AlertContext);
    const [saved, setSaved] = useState(false);

    const {id} = useParams();
    // console.log(id);


    const getBlog = async()=>{
        const res = await fetch(`http://localhost:5001/blogs/${id}`,{
            method:'GET',
            credentials:'include'
        })
        const response = await res.json();
        // console.log(response);

        userInfo?.saved?.forEach((e)=>{
            if(e===response._id || e._id===response._id)setSaved(true);
        })
        setBlog(response);
        if(response.author._id === userInfo?._id)setEdit(true);
    
    }
    
    const copyUrl = ()=>{
        navigator.clipboard.writeText(location.href);
        setAlert("Link to the blog is copied")
        setType("Success")
    }

    const saveBlog = async ()=>{
        if(userInfo==null){
            setAlert("You need to be signed in to save blogs");
            setType("Error");
        }else{
            const res = await fetch("http://localhost:5001/auth/save",{
                method:"POST",
                body:JSON.stringify({user:userInfo._id, blog:id}),
                headers:{'Content-Type':'application/json'}
            })
            const updatedUserInfo = await res.json();
            // console.log(updatedUserInfo);
            setUserInfo(updatedUserInfo);
            setAlert("Blog added to saved blogs")
            setType("Success");
        }
    }

    const unsaveBlog = async ()=>{

        const res = await fetch("http://localhost:5001/auth/unsave",{
            method:"POST",
            body:JSON.stringify({user:userInfo._id, blog:id}),
            headers:{'Content-Type':'application/json'}
        })
        if (res.status==200){
            const updatedUserInfo = await res.json();
            // console.log(updatedUserInfo);
            setUserInfo(updatedUserInfo);
            setAlert("Blog removed saved blogs")
            setType("Success");
            setSaved(false);
        }else{
            setAlert("Some error occurred");
            setType("Error");
        }
    }

    useEffect(()=>{
        // console.log("userinfo",userInfo._id);
        getBlog();
    },[userInfo])

  return (
<>
<div className="flex m-5 justify-center">
    <div className="fixed mb-2 top-72 right-0 w-fit flex flex-col border-solid border-spacing-2 p-2 rounded-md border-l-2 border-gray-500">
        {saved?

            <button onClick={unsaveBlog}>
                <img src={Saved} className="w-8 m-2" />
            </button>:
            <button onClick={saveBlog}>
                <img src={Save} className="w-8 m-2" />
            </button>
        }
        <button onClick={copyUrl}>
            <img src={Share} className="w-8 m-2" />
        </button>
        { edit && <Link to={`/edit/${blog._id}`}><img src={Edit} className="w-8 m-2" /></Link>}
    </div>

{blog &&
    <div className="max-w-5xl flex-col justify-center">
        <h1 className="text-4xl font-bold text-center" >{blog.title}</h1>
        <div className="text-center flex flex-row" >{blog.tags.map((e,i)=><div className="m-2" key={i}>{e}</div>)}</div>
        <img src={`http://localhost:5001/${blog.image}`} className="w-full mx-auto rounded-xl" />
        <div className="mt-5" dangerouslySetInnerHTML={{__html:blog.content}} />
        
    </div>
}
</div>
</>
  )
}
export default ViewBlog
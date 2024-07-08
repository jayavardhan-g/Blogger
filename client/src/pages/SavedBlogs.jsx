import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
import Loader from "../components/Loader";

const SavedBlogs = () => {
    const {setUserInfo, userInfo} = useContext(UserContext)
    const {setAlert,setType} = useContext(AlertContext)
    const navigate = useNavigate();

    if(userInfo==null){
      setAlert("You are not signed in");
      setType("Error");
      setTimeout(()=>{
        navigate('/');
      })
    }
    const getSavedBlogs = async ()=>{
      const res = await fetch("https://blogger-backend-n0va.onrender.com/auth/saved",{
        method:"POST",
        body:JSON.stringify({blogtoken:localStorage.getItem('blogtoken')}),
        headers:{'Content-Type':'application/json'},
        // // credentials:'include'
      });
      const response = await res.json();
      setUserInfo(response);
    }
  
    useEffect(()=>{
      console.log(userInfo);
      getSavedBlogs();
    },[])
  
  
    return (
  <>
  {
    userInfo?.saved?.length==0 &&<div className="flex justify-center items-center w-full h-screen">You didn't save any blogs</div> 
  }
  <div className=" flex flex-row flex-wrap justify-center items-center">
    { userInfo?.saved!=null &&
      userInfo?.saved?.map((e,i)=>{
      return(
        <Card title={e.title} key={i} content={e.content} id={e._id} img = {`https://blogger-backend-n0va.onrender.com/${e.image}`} tags={e.tags} author={e.author?.username}  />
      )
    }
  )}
  {
    userInfo?.saved==null && <div className="w-full h-screen"><Loader/></div>
  }
  </div>
  </>
  )
}
export default SavedBlogs
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AlertContext } from "../context/AlertContext";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const OwnBlogs = () => {
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
    const getOwnBlogs = async ()=>{
      const res = await fetch("https://blogger-backend-n0va.onrender.com/auth/my",{
        method:"POST",
        body:JSON.stringify({blogtoken:localStorage.getItem('blogtoken')}),
        headers:{'Content-Type':'application/json'},
        // credentials:'include'
      });
      const response = await res.json();
      setUserInfo(response);
    }
  
    useEffect(()=>{
    getOwnBlogs();
    },[])
  
  
    return (
  <>
  {
    userInfo?.own?.length==0 &&<div className="flex justify-center items-center w-full h-screen">You didn't save any blogs</div> 
  }
  <div className="flex flex-row flex-wrap justify-center items-center">
    { userInfo?.own!=null &&
      userInfo?.own?.map((e,i)=>{
      return(
        <Card title={e.title} key={i} content={e.content} id={e._id} img = {`https://blogger-backend-n0va.onrender.com/${e.image}`} tags={e.tags} author={e.author?.username} date={e.createdAt} />
      )
    }
  )}

  {
    userInfo?.own==null && <div className="w-full h-screen"><Loader/></div>
  }

  </div>
  </>
  )
}
export default OwnBlogs
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AlertContext } from "../context/AlertContext";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("https://blogger-backend-9x9o.onrender.com/auth/my",{
        method:"GET",
        credentials:'include'
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
        <Card title={e.title} key={i} content={e.content} id={e._id} img = {`https://blogger-backend-9x9o.onrender.com/${e.image}`} tags={e.tags} author={e.author?.username} date={e.createdAt} />
      )
    }
  )}
  </div>
  </>
  )
}
export default OwnBlogs
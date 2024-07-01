import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Card from "../components/Card";

const OwnBlogs = () => {
    const {setUserInfo, userInfo} = useContext(UserContext)
    const getOwnBlogs = async ()=>{
      const res = await fetch("http://localhost:5001/auth/my",{
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

  <div className="flex flex-row flex-wrap justify-center items-center">
    { userInfo?.own!=null &&
      userInfo?.own?.map((e,i)=>{
      return(
        <Card title={e.title} key={i} content={e.content} id={e._id} img = {`http://localhost:5001/${e.image}`} tags={e.tags} author={e.author?.username}  />
      )
    }
  )}
  </div>
  </>
  )
}
export default OwnBlogs
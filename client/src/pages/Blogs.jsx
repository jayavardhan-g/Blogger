import { useContext, useEffect } from "react"
import Card from "../components/Card"
import { BlogContext } from "../context/BlogContext"
import Loader from "../components/Loader";

const Blogs = () => {
  const { allBlogs, setAllBlogs } = useContext(BlogContext);
  
  const getBlogs = async ()=>{
    const res = await fetch("https://blogger-backend-n0va.onrender.com/blogs/fetch");
    const response = await res.json();
    console.log(response);
    setAllBlogs(response);
  }

  useEffect(()=>{
    getBlogs();
  },[])


  return (
<>
<div className=" flex flex-row flex-wrap justify-center items-center">
  {
    allBlogs==null && 
    <div className="w-full h-screen justify-center items-center">
      <Loader />
    </div>
  }
  { allBlogs?.length>0 &&
    allBlogs.map((e,i)=>{
    return(
      <Card title={e.title} key={i} content={e.content} id={e._id} img = {`https://blogger-backend-n0va.onrender.com/${e.image}`} tags={e.tags} author = {e.author.username} date={e.createdAt} />
    )
  }
  )}
  {
    allBlogs!=null && allBlogs?.length==0 &&
    <div className="w-full h-screen flex justify-center items-center" >
    There are no blogs to read at present.
    </div>
  }
</div>
</>
  )
}
export default Blogs
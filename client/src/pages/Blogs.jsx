import { useContext, useEffect } from "react"
import Card from "../components/Card"
import { BlogContext } from "../context/BlogContext"
import Loader from "../components/Loader";

const Blogs = () => {
  const { allBlogs, setAllBlogs } = useContext(BlogContext);
  
  const getBlogs = async ()=>{
    const res = await fetch("https://blogger-backend-9x9o.onrender.com/blogs/fetch");
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
  { allBlogs.length>0 &&
    allBlogs.map((e,i)=>{
    return(
      <Card title={e.title} key={i} content={e.content} id={e._id} img = {`https://blogger-backend-9x9o.onrender.com/${e.image}`} tags={e.tags} author = {e.author.username} date={e.createdAt} />
    )
  }
)}
</div>
</>
  )
}
export default Blogs
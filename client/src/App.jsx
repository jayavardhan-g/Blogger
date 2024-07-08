import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import logo from '/logo.png';
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";

function App() {
  const {userInfo,setUserInfo} = useContext(UserContext)
  const check = async ()=>{
    const res = await fetch("https://blogger-backend-n0va.onrender.comauth/profile",{
      method:'POST',
      body: JSON.stringify({blogtoken:localStorage.getItem("blogtoken")}),
      headers:{'Content-Type':'application/json'},
    }
    );
    const response = await res.json();
    // console.log(response);
    if(response.username) setUserInfo(response);
    // console.log(response);
    
  }

  useEffect(()=>{
    check();
  },[])

  // useEffect(()=>{
  //   console.log(userInfo);
  // },[userInfo])

  return (
  <div className="">
      {/* <div className="sticky bg-white z-20 w-full h-1/6 p-3 items-center flex top-0 left-0 justify-between" >
        <Link to='/feed'><img src={logo} className="w-12"></img></Link>
        <div className="flex flex-row">
        <div className="m-4"> <Link to='/register' > Register </Link></div>
        <div className="m-4"> <Link to='/login' > Login </Link></div>
        </div>
        {userInfo?.username && <div onClick={logout}>{userInfo.username}</div>}
        </div> */}
      <Alert/>
      <Navbar/>
      <Outlet/>
  </div>
  );
}

export default App;

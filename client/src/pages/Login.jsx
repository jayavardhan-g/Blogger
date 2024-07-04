import { Link, Navigate } from 'react-router-dom'
import logo from '/logo.png'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { AlertContext } from '../context/AlertContext'

const Login = () => {

    const {userInfo, setUserInfo} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAlert,setType} =useContext(AlertContext);
    const navigate = useNavigate();

    const login = async (e) =>{
        e.preventDefault();
        const res = await fetch("https://blogger-backend-9x9o.onrender.com/auth/login",{
                method:"POST",
                body: JSON.stringify({username:username.toLowerCase(),password}),
                headers:{'Content-Type':'application/json'},
                credentials:'include'
            }
        )
        const response = await res.json();
        
        if(res.status!=200){
            setAlert(response.message);
            setType("Error");
        }
        else {
            setAlert("You successfully logged in. Redirecting to homepage");
            setType("Success");
            setUserInfo(response)
            setTimeout(()=>{
                navigate('/')
            },2500);
        }

    }

  return (
<div className="flex justify-center items-center h-screen">
<div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md ">
    <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt=""/>
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">Welcome Back</h3>
        <div className="flex items-center justify-center mt-6">
                <a href="#" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500  ">
                    sign In
                </a>
        </div>

        <form onSubmit={login}>
            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 lowercase bg-white border rounded-lg   focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='username' placeholder="Username" aria-label="Username" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>

            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>

            <div className="flex items-center justify-end mt-4">
                <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign In
                </button>
            </div>
        </form>
    </div>

    <div className="flex items-center justify-center py-4 text-center bg-gray-50 ">
        <span className="text-sm text-gray-600 ">Don't have an account? </span>

        <Link to="/register" className="mx-2 text-sm font-bold text-blue-500  hover:underline">Register</Link>

    </div>
</div>
</div>
  )
}
export default Login
import { Link, useNavigate } from 'react-router-dom'
import logo from '/logo.png'
import { useContext, useEffect, useState } from 'react'
import Alert from '../components/Alert';
import { AlertContext } from '../context/AlertContext';
const Register = () => {
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [password2,setPassword2] = useState("");
    const {setAlert,setType}= useContext(AlertContext);
    // const [alert, setAlert] = useState(null);
    // const [type, setType] = useState(null);
    const navigate = useNavigate();

    const register = async (e)=>{
        e.preventDefault();
        if(password!==password2){
            setAlert("Passwords don't match");
            setType("Error");

            return;
        }
        
        if(password.length<5){
            setAlert("Password is too short")
            setType("Error");
            return;
        }
        
        const res = await fetch("http://localhost:5001/auth/register",{
            method:"POST",
            body:JSON.stringify({username:username.toLowerCase(),email,password}),
            headers:{"Content-Type":"application/json"}
        }) ;

        const response = await res.json();
        // console.log(response);
        if(res.status!=200){
            if(response.errors){
                setAlert(response.message);
                setType("Error");
                
                // alert();
            }
            if(response.errorResponse){
                setAlert(Object.keys(response.keyValue)+" is not unique")
                setType("Error");
            }
        }else{
            setAlert("Registration done successfully, proceeding to login");
            setType("Success");
            setTimeout(()=>{
                navigate('/login')
            },2500)
        }

    }

    useEffect(()=>{
        console.log(username)
    })

  return (
<div className='flex justify-center items-center h-screen'>
{/* {alert && 
    <Alert message={alert} type={type} />
} */}
<section className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md ">
    <div className="container flex items-center justify-center h-auto px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={register}>
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src={logo} alt=""/>
            </div>
            
            <div className="flex items-center justify-center mt-6">
                <div  className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500  ">
                    sign up
                </div>
            </div>

            <div className="relative flex items-center mt-8">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>

                <input type="text" value={username} onChange={e=>setUsername(e.target.value)} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 lowercase" placeholder="Username"/>
            </div>


            <div className="relative flex items-center mt-6">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"/>
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" value={password2} onChange={e=>setPassword2(e.target.value)} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
            </div>

            <div className="mt-6">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign Up
                </button>

                <div className="m-6 text-center ">
                    <Link to='/login' className="text-sm text-blue-500 hover:underline">
                        Already have an account?
                    </Link>
                </div>
            </div>
        </form>
    </div>
</section>
</div>
  )
}
export default Register
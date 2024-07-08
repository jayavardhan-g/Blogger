import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { AlertContext } from "../context/AlertContext";
import logo from '/logo.png'

const container = {
  hidden: { x: 50 },
  show: {
    x: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    x: 250,
  },
};

const item = {
  hidden: { x: 250 },
  show: {
    x: 0,
  },
  exit: {
    x: 250,
  },
};

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [drop, setDrop] = useState(false);

  const { setAlert, setType } = useContext(AlertContext);

  const logout = async () => {
    // var res = await fetch("http://localhost:5001/auth/logout", {
    //   method: "GET",
    //   credentials: "include",
    // });

    setAlert("You have successfully logged out");
    setType("Success");
    localStorage.removeItem('blogtoken');
    setUserInfo(null);
    setDrop(false);
  };

  return (
    <div className="z-20 sticky top-0 mb-2 w-full">
      {/* {alert && <Alert message ={alert} type={type} />} */}
      <nav className=" bg-white shadow ">
        <div className="container flex items-center justify-between md:p-3 p-2 mx-auto text-gray-600 capitalize ">
          <Link
            to="/"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform   mx-1.5 sm:mx-4"
          >
            <img src={logo} className="w-12 box-content " />
          </Link>

          <Link
            to="/writeBlog"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            write blog
          </Link>

          {userInfo == null ? (
            <div>
              <Link
                to="/login"
                className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
              >
                login
              </Link>
              <Link
                to="/register"
                className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
              >
                Register
              </Link>
            </div>
          ) : (
            <>
              <motion.div className="relative inline-block ">
                <button
                  onClick={() => {
                    setDrop(!drop);
                  }}
                  className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
                >
                  <span className="mx-1 capitalize">{userInfo.username}</span>
                </button>
                <AnimatePresence mode="wait">
                  {drop && (
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right   bg-white rounded-md shadow-xl "
                    >
                      <Link to="/writeBlog">
                        <motion.div
                          onClick={()=>setDrop(!drop)}
                          variants={item}
                          className="block px-6 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100  "
                        >
                          Write Blog
                        </motion.div>
                      </Link>

                      <Link to="/yourBlogs">
                        <motion.div
                          onClick={()=>setDrop(!drop)}
                          variants={item}
                          className="block px-6 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100 "
                        >
                          Your Blogs
                        </motion.div>
                      </Link>

                      <Link to="/saved">
                        <motion.div
                          onClick={()=>setDrop(!drop)}
                          variants={item}
                          className="block px-6 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100 "
                        >
                          Saved
                        </motion.div>
                      </Link>

                      <motion.div
                        onClick={logout}
                        variants={item}
                        className="cursor-pointer block px-6 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100 "
                      >
                        Sign Out
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;

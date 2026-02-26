import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import AuthLayout from "../../components/AuthLayout";
import { FaPeopleLine } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../config";
import { ClipLoader } from "react-spinners";
import { validateEmail } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/userSlice";
function Login() {
const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const {loading} = useSelector(state=>state.user)
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleLogIn = async() => {
    if(!validateEmail(email)){
      setError("Please enter a valid email")
      return
    }
    if(!password){
      setError("Enter Password")
      return
    }

    try{
      dispatch(signInStart)
      const result = await axios.post(`${serverUrl}/api/auth/sign-in`,{
        email:email.trim().toLowerCase(),
        password:password.trim()
      },{withCredentials:true})
      // navigate("/")
      setError("")
      //  setLoading(false)
       console.log(result.data)
       if(result.data.role === "admin"){
        dispatch(signInSuccess(result.data))
        navigate("/admin/dashboard")
       }
       else{
        dispatch(signInSuccess(result.data))
        navigate("/user/dashboard")
       }
    }
    catch(err){
    //  setLoading(false)
     const msg = err.response?.data?.message || "Something went wrong"
         dispatch(signInFailure(msg))

     setError(msg)
     if (err.response) {
    console.error("Backend error status:", err.response.status);
    console.error("Backend response data:", err.response.data);
  } else if (err.request) {
    console.error("No response received:", err.request);
  } else {
    console.error("Error setting up request:", err.message);
  }
    }
  };
  return (
    <AuthLayout>
      <div className=" w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Gradient top border */}
          <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="p-8">
            {/* logo and title */}
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaPeopleLine className="text-4xl text-blue-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mt-4 uppercase">
                Project Flow
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your projects efficiently
              </p>
            </div>
            {/* longin form */}
            {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
              <div className="mb-4">
                <input
                  type="text"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none border-blue-500 "
                  // required
                />
              </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : password}
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none round border-blue-500"
                  />
                  <button
                    className="absolute right-3 top-[14px] cursor-pointer text-gray-500"
                    onClick={togglePassword}
                  >
                    {!showPassword ? <FaRegEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              {error && <p className="w-full flex justify-center mt-1 text-red-600">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border
                border-transparent rounded-md shadow-sm text-sm font-medium text-white
                bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer
                "
                onClick={handleLogIn }
                disabled={loading}
                >
                  {
                    loading?<ClipLoader size={20} color="white"/>:"Log in"
                  }
                </button>
              </div>
            {/* </form> */}
            <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100">
              <FcGoogle />
              <span>Sign in with Google</span>
            </button>
                        <Link to="/signin/forgot-password">
             <div className="text-center m-5 text-[#ff4d2d] font-medium cursor-pointer">
                    Forgotten password?
                 </div>
            </Link>
            <p className=" text-center">Don't have an account? <Link to="/signup"><span className="text-blue-500">Create account</span></Link></p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;

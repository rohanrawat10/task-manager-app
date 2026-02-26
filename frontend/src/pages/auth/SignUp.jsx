import React, { useState } from 'react'
import AuthLayout from '../../components/AuthLayout';
import { FaPeopleLine } from 'react-icons/fa6';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/ProfilePhotoSelector';
import axios from 'axios';
import { serverUrl } from '../../config';

function SignUp() {
  const[name,setName] = useState("")
  const[mobile,setMobile] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const[profilePic,setProfilePic] = useState(null)
  const [adminInviteToken,setAdminInviteToken] = useState("")
  const [showPassword,setShowPassword] = useState(false)
  const [error,setError] = useState("")
  const[showInviteToke,setShowInviteToken] = useState(false)
  const [loading,setLoading] = useState(false)
  const toggleShowPassowrd= ()=>{
           setShowPassword((prev)=>!prev)
          
  }
  const toggleShowInviteToken = ()=>{
    setShowInviteToken((prev)=>!prev)
  }
  const handleSignUp = async (e) => {
  e?.preventDefault();

  if (!validateEmail(email)) {
    setError("Please enter a valid email");
    return;
  }

  if (!password) {
    setError("Enter Password");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("mobile", mobile.trim());
    formData.append("email", email.trim().toLowerCase());
    formData.append("password", password.trim());
    formData.append("adminInviteToken", adminInviteToken.trim());

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    const result = await axios.post(
      `${serverUrl}/api/auth/sign-up`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setError("");
    console.log(result.data);
  } catch (err) {
    const msg = err.response?.data?.message || "Something went wrong";
    setError(msg);
  } finally {
    setLoading(false);
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
                Join Project Flow
              </h1>
              <p className="text-gray-600 mt-1">
               Start Managing Your Projects Efficiently
              </p>
            </div>
            {/* longin form */}
          
                     <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
              <div className=' mb-4'>
            <input type="text"
             value={name}
             placeholder='Enter your name'
             onChange={(e)=>setName(e.target.value)}
             className='w-full border rounded-lg px-3 py-2 focus:outline-none border-blue-500'
            />
              </div>
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
              {/* mobile */}
                          <div className={`mb-4`}>
                        <input 
                        type="text"
                        value={mobile}
                        onChange={(e)=>setMobile(e.target.value)}
                         className={`w-full border rounder-lg px-3 py-2 focus:outline-none rounded-lg border-blue-500`}
                         placeholder="Enter your number"
                         required
                         />
                        </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none round border-blue-500"
                  />
                  <button
                    className="absolute right-3 top-[14px] cursor-pointer text-gray-500"
                    onClick={toggleShowPassowrd}
                  >
                    {!showPassword ? <FaRegEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
               <div className="mb-4">
                <div className="relative">
                  <input
                    type={showInviteToke ? "text" : "password"}
                    value={adminInviteToken}
                    placeholder="Enter Admin Invite Token"
                    onChange={(e) => setAdminInviteToken(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none round border-blue-500"
                  />
                  <button
                    className="absolute right-3 top-[14px] cursor-pointer text-gray-500"
                    onClick={toggleShowInviteToken}
                  >
                    {!showInviteToke? <FaRegEye /> : <FaEyeSlash />}
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
                onClick={handleSignUp}
                disabled={loading}
                >
                  {
                    loading?<ClipLoader size={20} color="white"/>:"Sign up"
                  }
                </button>
              </div>
           
            <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100">
              <FcGoogle />
              <span>Sign in with Google</span>
            </button>
              
                    <p className="mt-2 text-center">Already have an account? <Link to="/login"><span className="text-[#ff4d2d]">Sign In</span></Link></p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}



export default SignUp
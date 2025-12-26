import React, { useEffect, useState } from 'react'
import { MetaData } from '../components/MetaData'
import { AiOutlineMail, AiOutlineUnlock, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { TbLoader2 } from 'react-icons/tb'
import { loginUser } from '../actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'

export const Login = () => {

  const { loading, isLogin } = useSelector(state => state.user) //
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyeTog, setEyeTog] = useState(false)

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password })) //
    setEmail("")
    setPassword("")
  }

  useEffect(() => {
    if (isLogin) {
      navigate("/")
    }
  }, [isLogin, navigate])

  return (
    <>
      <MetaData title="Login" />
      <div className='bg-gray-950 min-h-screen flex justify-center items-center pt-14 md:px-20 px-3 text-white'>
        
        {/* Glass Card */}
        <div className='flex flex-col md:w-1/3 w-full bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-sm'>
          
          <div className='text-center mb-8'>
            <p className='text-4xl font-bold titleT'>Login</p>
            <p className='text-gray-400 text-sm mt-2'>Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={loginHandler} className='flex flex-col gap-5'>
            
            {/* Email Input */}
            <div className='relative group'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#3803FF]'>
                <AiOutlineMail size={22} />
              </div>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                required 
                placeholder='Email' 
                type="text" 
                className='w-full bg-white text-black rounded-lg pl-10 pr-3 py-3 outline-none border-2 border-transparent focus:border-[#3803FF] transition-all font-medium placeholder:font-normal' 
              />
            </div>

            {/* Password Input */}
            <div className='relative group'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#3803FF]'>
                <AiOutlineUnlock size={22} />
              </div>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                required 
                placeholder='Password' 
                type={eyeTog ? "text" : "password"} 
                className='w-full bg-white text-black rounded-lg pl-10 pr-10 py-3 outline-none border-2 border-transparent focus:border-[#3803FF] transition-all font-medium placeholder:font-normal' 
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-black' >
                {eyeTog ? 
                  <AiOutlineEye size={22} onClick={() => setEyeTog(!eyeTog)} /> : 
                  <AiOutlineEyeInvisible size={22} onClick={() => setEyeTog(!eyeTog)} />
                }
              </div>
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading || !email || !password} 
              className='blueCol mt-2 w-full py-3 rounded-lg flex justify-center items-center font-bold text-lg hover:shadow-lg hover:shadow-blue-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Login"}
            </button>

          </form>

          <div className='text-center text-sm pt-6 text-gray-400'>
            <p>Don't have an account? <Link to="/register" className='text-yellow-400 hover:text-yellow-300 underline font-semibold transition-colors'>Register here</Link></p>
          </div>

        </div>
      </div>
    </>
  )
}
import React, { useState, useEffect } from 'react'
import { MetaData } from '../components/MetaData'
import { AiOutlineMail, AiOutlineUnlock, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md'
import { BsFileEarmarkText, BsUpload } from 'react-icons/bs' // Added Upload icon
import { CgProfile } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import { TbLoader2 } from 'react-icons/tb'
import { registerUser } from '../actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'

export const Register = () => {

  const { loading, isLogin } = useSelector(state => state.user) //
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [eyeTog, setEyeTog] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [avatar, setAvatar] = useState("")
  const [avatarName, setAvatarName] = useState("")
  const [resume, setResume] = useState("")
  const [resumeName, setResumeName] = useState("")

  const handleFileChange = (e, setFile, setFileName) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFile(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const registerHandler = (e) => {
    e.preventDefault()
    const skillsArr = skills.split(",")
    const data = { name, email, password, avatar, resume, skills: skillsArr } //
    dispatch(registerUser(data))
    
    // Reset form logic...
    setName(""); setEmail(""); setPassword(""); setAvatar(""); setAvatarName(""); setResume(""); setResumeName(""); setSkills("");
  }

  useEffect(() => {
    if (isLogin) navigate("/")
  }, [isLogin, navigate])

  return (
    <>
      <MetaData title="Register" />
      <div className='bg-gray-950 min-h-screen flex justify-center items-center py-20 px-3 text-white'>
        
        <div className='flex flex-col md:w-[40%] w-full bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-sm'>
          
          <div className='text-center mb-8'>
            <p className='text-4xl font-bold titleT'>Register</p>
            <p className='text-gray-400 text-sm mt-2'>Create your account to start applying.</p>
          </div>

          <form onSubmit={registerHandler} className='flex flex-col gap-5'>

            {/* Name */}
            <div className='relative group'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#3803FF]'>
                <MdPermIdentity size={22} />
              </div>
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder='Full Name' type="text" className='w-full bg-white text-black rounded-lg pl-10 pr-3 py-3 outline-none border-2 border-transparent focus:border-[#3803FF] transition-all font-medium' />
            </div>

            {/* Email */}
            <div className='relative group'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#3803FF]'>
                <AiOutlineMail size={22} />
              </div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' type="email" className='w-full bg-white text-black rounded-lg pl-10 pr-3 py-3 outline-none border-2 border-transparent focus:border-[#3803FF] transition-all font-medium' />
            </div>

            {/* Password */}
            <div className='relative group'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#3803FF]'>
                <AiOutlineUnlock size={22} />
              </div>
              <input value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password' type={eyeTog ? "text" : "password"} className='w-full bg-white text-black rounded-lg pl-10 pr-10 py-3 outline-none border-2 border-transparent focus:border-[#3803FF] transition-all font-medium' />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-black' >
                  {eyeTog ? <AiOutlineEye size={22} onClick={() => setEyeTog(!eyeTog)} /> : <AiOutlineEyeInvisible size={22} onClick={() => setEyeTog(!eyeTog)} />}
              </div>
            </div>

            {/* Skills */}
            <div className='relative group'>
              <div className='absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-gray-500 group-focus-within:text-[#3803FF]'>
                <MdOutlineFeaturedPlayList size={22} />
              </div>
              <textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder='Skills (comma separated)' className='w-full bg-white text-black rounded-lg pl-10 pr-3 py-3 outline-none border-2 border-transparent focus:border-[#3803FF] transition-all font-medium h-24 resize-none' />
            </div>

            {/* File Uploads Row */}
            <div className="flex flex-col md:flex-row gap-4">
                
                {/* Profile Pic Upload */}
                <div className='flex-1'>
                    <label htmlFor='avatar' className='flex items-center gap-3 w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-3 cursor-pointer transition-all'>
                         <div className="text-[#3803FF] bg-white rounded-full p-1">
                            {avatar ? <img src={avatar} className='w-6 h-6 rounded-full object-cover'/> : <CgProfile size={24} />}
                         </div>
                         <span className='text-sm text-gray-300 truncate'>{avatarName || "Upload Profile Pic"}</span>
                         <BsUpload className="ml-auto text-gray-500" />
                    </label>
                    <input id='avatar' name='avatar' required onChange={(e) => handleFileChange(e, setAvatar, setAvatarName)} accept="image/*" type="file" className='hidden' />
                </div>

                {/* Resume Upload */}
                <div className='flex-1'>
                    <label htmlFor='resume' className='flex items-center gap-3 w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-3 cursor-pointer transition-all'>
                         <div className="text-[#3803FF] bg-white rounded-full p-1">
                            <BsFileEarmarkText size={20} />
                         </div>
                         <span className='text-sm text-gray-300 truncate'>{resumeName || "Upload Resume"}</span>
                         <BsUpload className="ml-auto text-gray-500" />
                    </label>
                    <input id='resume' name='resume' required onChange={(e) => handleFileChange(e, setResume, setResumeName)} accept="image/*" type="file" className='hidden' />
                </div>
            </div>

            {/* Submit */}
            <button disabled={loading} className='blueCol mt-4 w-full py-3 rounded-lg flex justify-center items-center font-bold text-lg hover:shadow-lg hover:shadow-blue-900/50 transition-all disabled:opacity-50' >
              {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Register"}
            </button>

          </form>

          <div className='text-center text-sm pt-6 text-gray-400'>
            <p>Already have an account? <Link to="/login" className='text-yellow-400 hover:text-yellow-300 underline font-semibold transition-colors'>Login here</Link></p>
          </div>

        </div>
      </div>
    </>
  )
}
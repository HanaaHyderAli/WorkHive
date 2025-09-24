import React from 'react'
import logo from '../../assets/logo.png'
import {IoLogOutOutline} from "react-icons/io5"
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Header = ({setAddTaskDiv}) => {
   const navigate=useNavigate();
  const logout=async()=>{
   try {
    const res=await axios.post(
      "https://work-hive-backend.vercel.app/v1/user/logout",{},{withCredentials: true}
    );
    toast.success(res.data.success)
    localStorage.clear("userLoggedIn")
    navigate("/login")
    
   } catch (error) {
    console.log(error)
    navigate("/login")
   }
  }
  return (
    <div className='flex px-12 py-4 items-center justify-between border-b'>
      <div>
        <img className='w-[100px]' src={logo} alt='WorkHive'/>
      </div>
      <div className='flex gap-8'>
        <button className='hover:text-blue-800 transition-all duration-300' onClick={()=>setAddTaskDiv("block")}>
            Add Task
        </button>
        <button className='text-2xl hover:text-red-600 transition-all duration-300' onClick={logout}>
         <IoLogOutOutline />
        </button>
      </div>



    


    </div>
  )
}

export default Header

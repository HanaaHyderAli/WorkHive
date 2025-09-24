import React from 'react'
import logo from '../assets/logo.png'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl } from '../config'

const Login = () => {
  const navigate= useNavigate();
    const [Values,setValues]=useState({
        
        email:"",
        password:""

    });

    const change=(e)=>{
        const {name,value}=e.target;
        setValues({...Values,[name]:value});
    }

    const login = async(e)=>{
        try {
            e.preventDefault()
            
            const res= await axios.post(backendUrl+
                "/api/v1/user/login",
                Values,
                {withCredentials:true,}
            );

            if(res.data.success){
         
          
          toast.success(res.data.success)
          localStorage.setItem("userLoggedIn","yes")
          localStorage.setItem("workhiveToken",response.data.token)
          navigate('/dashboard')
        } else{
          console.log("hi")
          toast.error(res.data.error)
        }
            
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
            
        }
    }
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
        <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
            <img className='w-[150px] mx-auto' src={logo} alt='WorkHive'/>
            <h3 className='text-center font-semibold'>Login with WorkHive</h3>
       </div>
       <div className='w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4'>
        <form className='flex flex-col gap-4'>
           
            <input type="email" required placeholder='email' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'
            name='email' value={Values.email} onChange={change}/>
            <input type="password" required placeholder='password' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'
            name='password' value={Values.password} onChange={change}/>
           <button  onClick={login} className='bg-black text-white font-semibold py-2 rounded hover:bg-gray-800 transition-all duration-300'>Login</button>

           <p className='text-center font-semibold text-gray-900'>
            Don't have an account?<Link to='/register' className='text-orange-600'>SignUp</Link>
           </p>
        </form>
        </div>
      
    </div>
  )
}

export default Login

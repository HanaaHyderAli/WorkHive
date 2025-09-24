import React, { useEffect, useState } from 'react'
import Header from '../components/Dashboard/Header'
import AddTask from '../components/Dashboard/AddTask'
import StackTitle from '../components/Dashboard/StackTitle'
import YetToStart from '../components/Dashboard/YetToStart'
import InProgess from '../components/Dashboard/InProgess'
import Completed from '../components/Dashboard/Completed'
import axios from 'axios'
import EditTask from '../components/Dashboard/EditTask'
import { backendUrl } from '../config'
const Dashboard = () => {
  const [AddTaskDiv,setAddTaskDiv]=useState("hidden")
  const [EditTaskDiv,setEditTaskDiv]=useState("hidden")
  const [Tasks, setTasks]=useState()
  const [EditTaskId,setEditTaskId]=useState("")

const token=localStorage.getItem("workhiveToken")
  useEffect(()=>{
  
    const fetchUserDetails=async()=>{
      try {
      
        const res=await axios.get(backendUrl+"/api/v1/user/userDetails",{headers:{Authorization:`Bearer ${token}`}});
       
        setTasks(res.data.tasks)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserDetails();
    if(window.sessionStorage.getItem("editTaskId")){
      setEditTaskDiv("block");
      setEditTaskId(window.sessionStorage.getItem("editTaskId"))
      
    }
  },[AddTaskDiv,EditTaskDiv])

  
  return (
    <div className='w-full relative'>
     <div className='bg-white'>
          <Header setAddTaskDiv={setAddTaskDiv}/>
     </div>


     <div className='px-12 py-4 flex flex-col gap-25 md:gap-12 md:flex-row bg-zinc-100 min-h-[89vh] max-h-auto'>
      <div className='md:w-1/3'><StackTitle title={"Yet To Start"}/>
      <div className='pt-2'>{Tasks && <YetToStart task={Tasks[0].yetToStart} /> } 
        </div></div>
      <div className='md:w-1/3'><StackTitle title={"InProgess"}/>
      <div className='pt-2'> {Tasks && <InProgess task={Tasks[1].inProgress} /> }
        </div></div>
      <div className='md:w-1/3'><StackTitle title={"Completed"}/>
      <div className='pt-2'> {Tasks && <Completed task={Tasks[2].completed} /> }
        </div></div>

     </div>

      








      <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
      <div className={`w-full  ${AddTaskDiv}  h-screen fixed top-0 left-0 flex items-center justify-center `}>
        <AddTask  setAddTaskDiv={setAddTaskDiv}/>
      </div>



     <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
      <div className={`w-full  ${EditTaskDiv}  h-screen fixed top-0 left-0 flex items-center justify-center `}>
        <EditTask EditTaskId={EditTaskId} setEditTaskDiv={setEditTaskDiv}/>
      </div>




    </div>
  )
}

export default Dashboard

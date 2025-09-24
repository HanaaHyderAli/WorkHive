import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../config";

const EditTask = ({  EditTaskId ,setEditTaskDiv}) => {
    const token=localStorage.getItem("workhiveToken")
  const [Values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  useEffect(()=>{
    if(!EditTaskId) return;
   const fetchTask=async()=>{
    
    try {
        
        const res=await axios.get(backendUrl+`/api/v1/task/getTask/${EditTaskId}`,{withCredentials:true},{headers:{Authorization:`Bearer ${token}`}});
        
 
        setValues(res.data.taskDetails)
    } catch (error) {
        console.error(error)
    } 
   };
    fetchTask()
},[EditTaskId]);


  const editTask = async (e,id) => {
    e.preventDefault();

    try {
      const res = await axios.put(backendUrl+
        `/api/v1/task/editTask/${id}`,
        Values,
        { withCredentials: true },{headers:{Authorization:`Bearer ${token}`}}
      );
     
     
      alert(res.data.success);
      window.sessionStorage.clear("editTaskId")
      setEditTaskDiv("hidden");
      window.location.reload()
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const deleteTask = async (e,id) => {
    e.preventDefault();

    try {
      const res = await axios.delete(backendUrl+
        `/api/v1/task/deleteTask/${id}`,
        
        { withCredentials: true },{headers:{Authorization:`Bearer ${token}`}}
      );
     
     
      alert(res.data.success);
      window.sessionStorage.clear("editTaskId")
      setEditTaskDiv("hidden");
      window.location.reload()
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="bg-white rounded px-4 py-4 w-[90%] md:w-[50%]">
      <h1 className="text-center font-semibold text-xl">Edit Task</h1>
      <hr className="mb-4 mt-2" />
      <form className="flex flex-col gap-4">
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="Title"
          name="title"
          value={Values.title}
          onChange={change}
        />
        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              name="priority"
              value={Values.priority}
              onChange={change}
              id=""
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              name="status"
              value={Values.status}
              onChange={change}
              id=""
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
            >
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <textarea
          name="description"
          id=""
          placeholder="Description"
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
          value={Values.description}
          onChange={change}
        ></textarea>
        <div className="flex items-center justify-between gap-4">
          <button
            className="w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded"
            onClick={(e)=>editTask(e,Values._id)}
          >
            Edit Task
          </button>
          <button
            className="w-full  py-2 border border-red-600 text-red-600 hover:bg-red-100 transition-all duration-300  rounded"
            onClick={(e)=>deleteTask(e,Values._id)}
          >
            Delete Task
          </button>
          <button
            className="w-full  py-2 border border-black  hover:bg-zinc-300 transition-all duration-300  rounded"
            onClick={(event) => {
              event.preventDefault();
              window.sessionStorage.clear("editTaskId");
              setEditTaskDiv("hidden");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;

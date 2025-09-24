import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    title:{type: String, required:true},
    description:{type: String, required:true},
    priority:{type: String, required:true, enum:["low","medium","high"], default:"low"},
    status:{type: String, required:true, enum:["yetToStart","inProgress","completed"], default:"yetToStart"},
  
})

const task =mongoose.model("task",taskSchema);

export default task;
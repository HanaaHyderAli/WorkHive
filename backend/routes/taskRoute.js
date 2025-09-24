import express from 'express';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { addTask, deleteTask, editTask, getTask } from '../controllers/task.js';



const taskRouter=express.Router();




taskRouter.post('/addTask',authMiddleware,addTask)
taskRouter.put('/editTask/:id',authMiddleware,editTask)
taskRouter.get('/getTask/:id',authMiddleware,getTask)
taskRouter.delete('/deleteTask/:id',authMiddleware,deleteTask)


export default taskRouter;
import express from 'express';


import { login,logout,register, userDetails } from '../controllers/user.js';
import { authMiddleware } from '../middleware/authMiddleware.js';




const userRouter=express.Router();




userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.get('/userDetails',authMiddleware,userDetails)
export default userRouter;
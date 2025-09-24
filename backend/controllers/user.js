import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'



const register= async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username||!email||!password){
            return res.status(400).json({error:"All fields are required"});
        }

        if(username.length<5){
            return res.status(400).json({error:"Username must have 5 characters"});
        }
        
        if(password.length<6){
            return res.status(400).json({error:"Password must have 6 characters"});
        }
        

        const checkUser= await User.findOne({ $or:[{email},{username}]});

        if (checkUser){
            return res.status(400).json({error:"User or Email already exists"});
        }

        const hashPass = await bcrypt.hash(password,10);
        const newUser= new User({username,email,password:hashPass});
        await newUser.save();

        return res.status(200).json({success:"Registration successfull"})
    } catch (error) {
        
          console.log(error);
    res.json({success:false,message:error.message})
    }
}

const login= async(req,res)=>{
    try {
       const {email,password}=req.body;
      
       if(!email||!password){
            return res.status(400).json({error:"All fields are required"});
        }

        const checkUser= await User.findOne({email});
        if(checkUser){
            bcrypt.compare(password,checkUser.password, (err,data)=>{
                if(data){
                    const token=jwt.sign({id:checkUser._id, email:checkUser.email},process.env.JWT_SECRET, {expiresIn:"30d"})
                    res.cookie('workhiveToken',token,{
                        httpOnly:true,
                        maxAge:30*24*60*60*1000,
                        secure:true,
                        sameSite:"None",
                        path:"/"
                    })
                     return res.status(200).json({success:"Login success"})
                }
            })
        }else{
                    
                    return res.status(400).json({error:"invalid credentials"})
                }
    } catch (error) {
        
          console.log(error);
    res.json({success:false,message:error.message})
    }
}

const logout =async(req,res)=>{
    try {
        res.clearCookie("workhiveToken",{httpOnly:true});
        res.json({message:"Logged out"})
    } catch (error) {
        console.log(error);
    res.json({success:false,message:error.message})
    }
}


const userDetails= async(req,res)=>{
try {
    const {user}=req;
    const getDetails= await User.findById(user._id).populate("tasks").select("-password");
    if(getDetails){
        const allTasks=getDetails.tasks;
        let yetToStart=[];
        let inProgress=[];
        let completed=[];
        allTasks.map((item)=>{
            if(item.status==="yetToStart"){
                yetToStart.push(item);

            }else if(item.status==="inProgress"){
                inProgress.push(item);

            }else completed.push(item)
        })
        return res.status(200).json({success:"success",tasks:[{yetToStart},{inProgress},{completed}]})
    }
} catch (error) {
     console.log(error);
    res.json({success:false,message:error.message})
}
}
export {register,login,logout,userDetails}
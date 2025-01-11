import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res)=>{
    const {fullname, email,password} = req.body
    try{
        // password
        if(!fullname || !password || !email){
            return res.status(400).json({message:"Please enter data for every field"})
        }
        if (password.length < 6){
            return res.status(400).json({message: "Password must be more than 6 characters"})
        }
        //Login
        const user = await User.findOne({email})

        if(user) return res.status(400).json({message: "Email already exists"})
        //hashing pasword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
        })

        if(newUser){
            //genrate jwt token
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilepic: newUser.profilepic,
            })
        }else{
            res.status(400).json({message:"Server Error please try again"})
        }
    }catch(err){
        console.log("Error in signup controller",err.message);
        res.status(500).json({messgae:"Internal server error"});
    }
};

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const isPasswordCorrect=  await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        generateToken(user._id,res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilepic: user.profilepic,
        })
    }catch(error){
        console.log("Error in login controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
};

export const logout = (req,res)=>{
    res.send("logout route")
};
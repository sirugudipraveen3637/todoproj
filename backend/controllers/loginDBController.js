const mongoose=require("mongoose");
const usermodel=require("../models/usermodel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const login= async(req,res)=>
{
    try {
        const {email,password}=req.body;

        if(!(email && password))
        {
            res.status(200).send("All fields are required")
        }
        else
        {
            const usercheck=await usermodel.findOne({"email":email});
            if(usercheck && await bcrypt.compare(password,usercheck.password))
            {
                const token=jwt.sign({email,id:usercheck._id},"shhhhh",{expiresIn:"2h"});

                const options={expires:new Date(Date.now()+900000),httpOnly:true}
                res.status(200).cookie("token",token,options).json({
                    success:true,
                    message:"login successful",
                    id:usercheck._id
                })
            }
            else
            {
                res.status(200).json({
                    success:false,
                    message:"login failed"
                })
            }

        }
        
    } catch (error) {
        res.status(201).send("login service failed")
    }
}

module.exports=login;
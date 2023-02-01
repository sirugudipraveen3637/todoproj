const User=require("../models/usermodel");
const crypto=require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const resetPassword=async(req,res)=>
{

    const {password,confirmpassword}=req.body;
    const {forgottoken}=req.params;

    if(!password && !confirmpassword && !forgottoken)
        res.status(400).send("Provide all required fields")

    if(password!=confirmpassword)
        res.send(400).send("Password and confirm password should match");

    const forgotpasswordtoken=crypto.createHash("sha256").update(forgottoken).digest("hex");
try{
   const user= await User.findOne({forgotPasswordToken:forgotpasswordtoken, forgotPasswordExpiry:{$gt:Date.now()}})

   if(!user)
   {
    res.status(400).send("Forgot token is invalid or expired")
   }
 
   const encryptpwd = await bcrypt.hash(password, 10);
   const updateduser=await User.findByIdAndUpdate(user._id,{password:encryptpwd});
   const jwttoken=jwt.sign({email:updateduser.email,id:updateduser._id},"shhhhh",{expiresIn:"2h"})

   updateduser.token = jwttoken;
   updateduser.password = undefined;
   res.status(200).json({
    message:"reset password successful",
    success:true,
    user:updateduser
});
}
catch(err)
{
    res.status(404).json({
        message:"reset password failed",
        success:false,
        response:error
    });
}
}

module.exports=resetPassword;
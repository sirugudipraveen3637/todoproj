const User=require("../models/usermodel");
const crypto=require("crypto");
const mailHelper=require('../utils/mailhelper')

const pwdReset=async(req,res)=>
{
    const {useremail}=req.body;

if(!useremail)
{
    res.status(400).send("provide email")
}

const user=await User.findOne({email:useremail});
if(!user)
{
    res.status(400).send("user doesn't exists")
}
console.log("user id"+user._id);

const randomtokenstring=crypto.randomBytes(10).toString("hex");
const forgotToken=crypto.createHash("sha256").update(randomtokenstring).digest("hex");
const forgotExpiry=Date.now()+20*60*1000;
try {

    const updatedUser=await User.findOneAndUpdate({email:useremail},{forgotPasswordToken:forgotToken,forgotPasswordExpiry:forgotExpiry},{new:true});
    const reseturl=`http://localhost:3000/resetpassword/${randomtokenstring}`;
 
    let resp=await mailHelper({to_name:user.name,to_email:useremail,message:reseturl});
   
    res.status(200).json({
        message:"email sent successfully",
        success:true,
        response:resp,
        forgottoken:randomtokenstring
    })
} catch (error) {

     res.status(404).json({
            message:"email sent failed",
            success:false,
            response:error
        });
}

}

module.exports=pwdReset;
const mailHelper=require('../utils/mailhelper')

const mailsendRequest=async(req,res)=>
{
   const {to_name,to_email,message}= req.body;

    if(!to_name && !to_email && !message)
        res.status(400).send("Inputs to send Email are not provided")

    try {
        let resp=await mailHelper({to_name:to_name,to_email:to_email,message:message});
        res.status(200).json({
        message:"email sent successfully",
        response:resp
    })
    } catch (error) {
        res.status(404).json({
            message:"email sent failed",
            response:error
        })
    }
}
module.exports=mailsendRequest;
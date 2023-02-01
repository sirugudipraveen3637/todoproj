const transport=require('../config/mailconfig');
const emailjs =require('@emailjs/nodejs');

const mailHelper=async (options)=>
{
    const message={
        to_name: options.to_name, // to_name
        email: options.to_email, // list of receivers
        message: options.message, // plain text body
    }

    let info = await emailjs.send(process.env.MAIL_SERVICEID,process.env.MAIL_TEMPLATEID,message,{publicKey:process.env.MAIL_PUBLICKEY,privateKey:process.env.MAIL_PRIVATEKEY});

    return info;
}

module.exports= mailHelper;
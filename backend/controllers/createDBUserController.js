const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const formidable = require('formidable');
const fs=require('fs');
const Mongoose=require("mongoose");
const s3fileupload=require("../utils/fileservice")

const createuser = async (req, res) => {

	const form=formidable({multiples:true, keepExtensions: true});
	form.parse(req,async(err,fields,files)=>
  {
    try {
      if (err) {
        res.status(400).send("error")
    }
      console.log(fields);
      //console.log(files);
      const { name,email, password ,logintype,socialprofileurl} = fields;
      let encryptpwd;
      let imgArray;
      if(logintype==="manual"){
        if (!name && !email && !password) {
            res.status(200).send("email and password fields are required");
        } 
      }
      else{
        if (!name && !email) {
          res.status(200).send("email and name fields are required");
      } 
      }
   
        const userexists = await usermodel.findOne({ email: email });
        if (userexists) {
            console.log("user exists")
            res.status(200).send(userexists);
            //res.status(200).send("user already exists");
        } else {
          
          let userId = new Mongoose.Types.ObjectId().toHexString();
          if(logintype==="manual"){
           encryptpwd = await bcrypt.hash(password, 10);
           imgArray= await Promise.all(
            Object.keys(files).map(async(filekey,index)=>
            {
              const element=files[filekey];
              //console.log(element.filepath)
              const data=fs.readFileSync(element.filepath);
              //console.log(element.mimetype)

              const upload=await s3fileupload({
                bucket:process.env.S3_BUCKET,
                key:`users/${userId}/user_${index+1}.png`,
                body:data,
                contenttype:element.mimetype
              })
              return {secure_url:upload.Location}
            })
          )
          }
            //console.log(imgArray)
            //console.log(imgArray[0]["secure_url"])
            const user = await usermodel.create({
              _id: userId,
              name:name,
              email: email,
              password: logintype==="manual"?encryptpwd:"",
              profileurl:logintype==="manual"?imgArray[0]["secure_url"]:socialprofileurl
            });
        
        
            const token = jwt.sign({ email: email, id: user._id }, "shhhhh", {
              expiresIn: "2h",
            });
           
            console.log(user)
            user.token = token;
            user.password = undefined;
            res.status(200).send(user);
        }
      
    }
    catch (error) {
      console.log(JSON.stringify(error.message));
      res.status(201).send("createuser failed");
    }
  })
} 

module.exports = createuser;

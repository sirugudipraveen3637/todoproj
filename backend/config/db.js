const mongoose=require("mongoose");

const dbconnect=mongoose.connect(process.env.DBURL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(res=>
    {
        console.log("DB Connection successful")
    })
    .catch(err=>
    {
        console.log("DB Connection failed");
        process.exit(1)
    })


module.exports=dbconnect;
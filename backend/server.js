const app=require("./app");

app.listen(process.env.PORT,()=>
{
    console.log("App is listening at"+process.env.PORT)
})
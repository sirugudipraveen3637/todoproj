const todomodel=require("../models/todomodel")

const updateTodo= async(req,res)=>
{
    try {
        const {id}=req.params;
        const todo=await todomodel.findByIdAndUpdate(id,req.body);
        if(!updateTodo)
        {
            res.status(201).send("updateTodo failed")
        }
        else
        {
            res.status(200).json({
                id:id,
                success:true,
                todo:todo
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(201).send("updateTodo failed")
    }
}

module.exports=updateTodo;
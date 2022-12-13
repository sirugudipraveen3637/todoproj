import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Todo() {
  const [todos, settodos] = useState([]);
  const [tasks, settasks] = useState([]);
  const [value, setValue] = useState(1);
  const [selid, setselid] = useState(0);
  const [titlevalue,settitlevalue]=useState("");
  const [taskval,settaskvalue]=useState("");
  const [statusval,settaskstatusvalue]=useState("");

  useEffect(() => {
    fetchtoDos();
  }, [value]);

  const deleteTodo=async (id)=>
  {
     const deletetodoresponse= await axios.delete("v1/todo/deleteTodo/"+id);

     console.log("deleted successfully"+deletetodoresponse);
     setValue(value+2);
  }

  const deleteTask=async (id,temptasks)=>
  {
     const data={
      tasks:temptasks
     }

     console.log("id"+JSON.stringify(id))
     console.log("temptasks"+JSON.stringify(temptasks))
     const deletetaskresponse= await axios.put("v1/todo/updateTodo/"+id,data);

     console.log("deleted task successfully"+deletetaskresponse);
     setValue(value+3);
  }
  const updateTask=async (id,tasks)=>
  {
     const data={
      tasks:tasks
     }
     //console.log(JSON.stringify(data))
     const updatetaskresponse= await axios.put("v1/todo/updateTodo/"+id,data);

     console.log("updated task successfully"+updatetaskresponse);
     setValue(value+7);
  }
  const updateTodo=async (id,title)=>
  {
   
     const data={
      title:title
     }
     const updateTodoresponse= await axios.put("v1/todo/updateTodo/"+id,data);

     console.log(" task title updated successfully"+updateTodoresponse);

     setValue(value+1);
  }

  const createTodo=async (title)=>
  {
   
     const data={
      title:title,
      "userid":"63951a66b1862ee8e1291a95"
     }
     const createTodoresponse= await axios.post("v1/todo/createTodo/",data);

     console.log(" todo created  successfully"+createTodoresponse);

     setValue(value-1);
  }

  const fetchtoDos = async () => {
    const todoresponse = await axios.get("v1/todo/getAllTodos/desc");
    if (todoresponse.data.length > 0) {
      settodos(todoresponse.data.todos);
      setselid(todoresponse.data.todos[0]._id);
      settasks(todoresponse.data.todos[0].tasks);
    } else console.log("No todos available");
  };

  console.log("todoresponse" + JSON.stringify(todos));
  return (
    <div className="flex">
      <div className="text-left mt-12 ml-12  flex-1">
        <div>
        <label className="my-3 text-3xl font-bold text-cyan-600">Todos</label>
        <Popup   trigger={<button  className="w-12 ml-3 px-1 py-1 fon9t-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Add </button>} modal>
                  {close =>(
                  <div>
                    <input placeholder="Todo"  onChange={event=>{settitlevalue(event.target.value)}} className="border border-gray-600 ml-0 pl-2 py-1 border-opacity-90" type="text" />
                     <button onClick={()=>{close();  createTodo(titlevalue); }} className="w-12 ml-3 px-1 py-1 mt-2 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Add</button> 
                     <button onClick={()=>{close();}} className="w-12 ml-3 px-1 py-1 mt-2 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Cancel</button> 
 
                  </div>)}
                  </Popup>
        {/* <button className="w-12 ml-3 px-1 py-1 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Add</button> */}
        </div>
        <table className="table">
          <tbody>
            {todos.map((todo,pos) => (
              
              <tr className="pt-3" key={todo._id}>
                <td className="pt-4">
                  <b>{todo.title}</b>
                </td>
             
                <td className="pt-4">
                  <button
                    type="button"
                    className="w-12 ml-3 px-1 py-1 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50"
                    onClick={()=>{setselid(todo._id);settasks(todo.tasks);}}
                  >
                    View
                  </button>
                </td>
                <td className="pt-4">
                  <button
                    type="button"
                    onClick={()=>{deleteTodo(todo._id)}}
                    className="w-12 ml-3 px-1 py-1 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50"
                  >
                    Delete
                  </button>
                </td>
                <td className="pt-4">
                  <Popup  key={todo._id}  trigger={<button  className="w-12 ml-3 px-1 py-1 fon9t-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Edit </button>} modal>
                  {close =>(
                  <div>
                    <input placeholder="Todo Name" onChange={event=>{settitlevalue(event.target.value)}} className="border border-gray-600 ml-0 pl-2 py-1 border-opacity-90" type="text" />
                     <button onClick={()=>{close(); updateTodo(todo._id,titlevalue);}} className="w-12 ml-3 px-1 py-1 mt-2 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Save</button> 
                     <button onClick={()=>{close();}} className="w-12 ml-3 px-1 py-1 mt-2 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Cancel</button> 
 
                  </div>)}
                  </Popup>
                </td>
  
              </tr>
            ) )}
          </tbody>
        </table>
      </div>

      <div className="text-left mt-12 mr-12 flex-1">
        <label className="my-3 text-3xl font-bold text-cyan-600">Tasks</label>
        {/* <button className="w-12 ml-3 px-1 py-1 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Add</button> */}
        <Popup   trigger={<button  className="w-12 ml-3 px-1 py-1 fon9t-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Add </button>} modal>
                  {close =>(
                  <div>
                    <input placeholder="Task"  onChange={event=>{settaskvalue(event.target.value)}} className="border border-gray-600 ml-0 pl-2 py-1 border-opacity-90" type="text" />
                     <button onClick={()=>{close();  tasks.push({task:taskval}); settasks(tasks);updateTask(selid,tasks) }} className="w-12 ml-3 px-1 py-1 mt-2 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Save</button> 
                     <button onClick={()=>{close();}} className="w-12 ml-3 px-1 py-1 mt-2 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Cancel</button> 
 
                  </div>)}
                  </Popup>
        <table className="table">
          <tbody>
            {tasks.length == 0 ? (
              <tr className="pt-3" >
                <td className="pt-4">
                  <b>No tasks available</b>
                </td>
              </tr>
            ) : (
              tasks.map((task,pos) => (
                <tr className="pt-3" key={pos}>
                  <td className="pt-4">
                    <b>{task.task}</b>
                    <div>
                    {task.status === "pending" ? 
                    (
                      <button className=" font-semibold text-red-600">{task.status}</button>
                    )
                   : 
                    ( 
                      <button className=" font-semibold text-green-600">{task.status}</button>
                    )
                  }
                    </div>
                  </td>
                  <td className="pt-4">
                  
                  <button
                    type="button"
                    onClick={()=>{console.log(pos); settasks(tasks.splice(pos,1)); console.log(tasks); deleteTask(selid,tasks)}}
                    className="w-12 ml-3 px-1 py-1 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50"
                  >
                    Delete
                  </button>
                </td>

                  {/* <td className="pt-4">
                  <button
                    type="button"
                    className="w-12 ml-3 px-1 py-1 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50"
                  >
                    Edit
                  </button>
                </td> */}

                <td className="pt-4">
                  <Popup   trigger={<button  className="w-12 ml-3 px-1 py-1 fon9t-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Edit </button>} modal>
                  {close =>(
                  <div>
                    <input placeholder="Task"  onChange={event=>{settaskvalue(event.target.value)}} className="border border-gray-600 ml-0 pl-2 py-1 border-opacity-90" type="text" />
                    <input placeholder="Status"  onChange={event=>{settaskstatusvalue(event.target.value)}} className="border border-gray-600 ml-3 pl-2 py-1 border-opacity-90" type="text" />
                     <button onClick={()=>{close();  task.task=taskval; task.status=statusval; settasks(tasks);updateTask(selid,tasks) }} className="w-12 ml-3 px-1 py-1 mt-2 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Save</button> 
                     <button onClick={()=>{close();}} className="w-12 ml-3 px-1 py-1 mt-2 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">Cancel</button> 
 
                  </div>)}
                  </Popup>
                </td>
             
                  
              
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Todo;

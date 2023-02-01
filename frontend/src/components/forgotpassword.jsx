import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


export const Forgotpassword=()=> {

    const navigate=useNavigate();
	const [email, setEmail] = useState("");

    const invokesendResetLinkService=async()=>
    {
        const data={
			"useremail":email,
		}
		console.log("data"+JSON.stringify(data));
		const response= await axios.post("/v1/todo/forgotPassword",data);
		
		if(response.data.success==true)
		{
			navigate("/login")
		}
        else
        {
            alert("Email sent failed");
        }

    }

   const handleSubmitAction=(event)=>
    {
        event.preventDefault();
        invokesendResetLinkService();

		setEmail("");
    }

  return (
   <div className="flex flex-col container mx-auto my-20 max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
	<div className="mb-8 text-center">
		<h1 className="my-3 text-4xl font-bold">Forgot Password</h1>
		{/* <p className="text-sm text-gray-600">Sign in to access your account</p> */}
	</div>
	<form className="space-y-12 ng-untouched ng-pristine ng-valid">
		<div className="space-y-4">
			<div>
				<label className="block mb-2 text-left text-sm">Email address</label>
				<input type="email" name="email" id="email" placeholder="" value={email} onChange={event=>{setEmail(event.target.value)}} className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
		</div>
		<div className="space-y-2">
			<div>
				<button type="button" onClick={handleSubmitAction} className="w-full px-8 py-3 font-semibold rounded-md bg-cyan-600 text-gray-50">Submit</button>
			</div>
		</div>
	</form>
</div>
  )
}

export default Forgotpassword
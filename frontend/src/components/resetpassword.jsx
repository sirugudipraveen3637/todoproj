import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

export const Resetpassword=()=>{

    const navigate=useNavigate();
    const routeParams = useParams();
    
	const [password, setPassword] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");

    const invokeResetPasswordService=async()=>
    {
        const data={
			"password":password,
            "confirmpassword":confirmpassword,
		}

		console.log("data"+JSON.stringify(data));
        console.log("routeParams"+JSON.stringify(routeParams));
		const response= await axios.post("/v1/todo/resetPassword/"+routeParams.id,data);
		
		if(response.data.success==true)
		{
			navigate("/login")
		}
        else
        {
            alert("Password reset failed");
        }

    }

   const handleSubmitAction=(event)=>
    {
        event.preventDefault();
        invokeResetPasswordService();
        setconfirmPassword("");
		setPassword("");
    }

  return (
   <div className="flex flex-col container mx-auto my-20 max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
	<div className="mb-8 text-center">
		<h1 className="my-3 text-4xl font-bold">Reset Password</h1>
		{/* <p className="text-sm text-gray-600">Sign in to access your account</p> */}
	</div>
	<form className="space-y-12 ng-untouched ng-pristine ng-valid">
		<div className="space-y-4">
			<div>
				<label className="block mb-2 text-left text-sm">Password</label>
				<input type="password" name="password" id="password" value={password} onChange={event=>{setPassword(event.target.value)}} placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
		</div>
        <div className="space-y-4">
			<div>
				<label className="block mb-2 text-left text-sm">Confirm Password</label>
				<input type="password" name="password" id="password" value={confirmpassword} onChange={event=>{setconfirmPassword(event.target.value)}} placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
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

export default Resetpassword
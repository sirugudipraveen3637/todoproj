import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export const Login=()=>
{
	const navigate=useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isopen, setPopup] = useState(false);

	const invokeloginService= async ()=>
	{
	
		const data={
			"email":email,
			"password":password
		}
		console.log("data"+JSON.stringify(data));
		const response= await axios.post("/v1/todo/login",data);

		console.log("response"+JSON.stringify(response));

		if(response.data.success==true)
		{
			navigate("/home")
		}
		else{
			setPopup(true);
		}
	}

	const handleLoginAction=(event)=>
	{

		event.preventDefault();
		
		invokeloginService();

		setEmail("");
		setPassword("");

	}

return(
<div className="flex flex-col container mx-auto my-20 max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
	<div className="mb-8 text-center">
		<h1 className="my-3 text-4xl font-bold">Sign in</h1>
		<p className="text-sm text-gray-600">Sign in to access your account</p>
	</div>
	<form className="space-y-12 ng-untouched ng-pristine ng-valid">
		<div className="space-y-4">
			<div>
				<label className="block mb-2 text-left text-sm">Email address</label>
				<input type="email" name="email" id="email" placeholder="" value={email} onChange={event=>{setEmail(event.target.value)}} className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
			<div>
				<div className="flex justify-between mb-2">
					<label className="text-sm">Password</label>
					<a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">Forgot password?</a>
				</div>
				<input type="password" name="password" id="password" value={password} onChange={event=>{setPassword(event.target.value)}} placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
		</div>
		<div className="space-y-2">
			<div>
				<button type="button" onClick={handleLoginAction} className="w-full px-8 py-3 font-semibold rounded-md bg-cyan-600 text-gray-50">Sign in</button>
			</div>
			<Popup  open={isopen} modal>
                  {close =>(
                  <div>
                    <h1 className="font-semibold mx-auto">Login failed. Please provide valid credentials</h1>
                     <button onClick={()=>{setPopup(false);close();}} className="w-22 ml-3 px-1 py-1 mt-2 font-semibold text-sm rounded-md bg-cyan-600 text-gray-50">OK</button> 

                    </div>)}
                  </Popup>
			<p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
				<a rel="noopener noreferrer" href="/signup" className="hover:underline text-cyan-600">Sign up</a>.
			</p>
		</div>
	</form>
</div>)
}

export default Login;

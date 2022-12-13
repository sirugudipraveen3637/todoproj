import React from "react";
import { useState } from "react";
import axios from "axios";

function Signup()
{

	const [username, setusername] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

async function invokesignupService()
{

	const data={
		"name":username,
		"email":email,
		"password":password
	}

	const response=axios.post("/v1/todo/createuser",data);

	console.log(response);

}

function signuphandle(event)
{
	event.preventDefault();
	invokesignupService();
	setemail("");
	setpassword("");
	setusername("");

}

return(<div className="flex flex-col mx-auto my-20 max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
	<div className="mb-8 text-center">
		<h1 className="my-3 text-4xl font-bold">Sign Up</h1>
		<p className="text-sm text-gray-600">Sign up to create your account</p>
	</div>
	<form action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
		<div className="space-y-4">
			<div>
				<label className="block mb-2 text-sm text-left">Username</label>
				<input type="text" value={username} onChange={event=>{setusername(event.target.value)}} name="uname" id="uname" placeholder="" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
			<div>
				<label className="block mb-2 text-sm text-left">Email address</label>
				<input type="email" value={email} onChange={event=>{setemail(event.target.value)}} name="email" id="email" placeholder="" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
			<div>
				<div className="flex justify-between mb-2">
					<label className="text-sm text-left">Password</label>
					
				</div>
				<input type="password" value={password} onChange={event=>{setpassword(event.target.value)}} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
		</div>
		<div className="space-y-2">
			<div>
				<button type="button" onClick={signuphandle} className="w-full px-8 py-3 font-semibold rounded-md bg-cyan-600 text-gray-50">Sign Up</button>
			</div>
			{/* <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
				<a rel="noopener noreferrer" href="#" className="hover:underline text-cyan-600">Sign up</a>.
			</p> */}
		</div>
	</form>
</div>)
}

export default Signup;

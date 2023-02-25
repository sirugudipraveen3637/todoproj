import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

export const Login=()=>
{
	const navigate=useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isopen, setPopup] = useState(false);
	const [providertype, setProvider] = useState("");
	const [profile, setProfile] = useState();

	const invokeloginService= async ()=>
	{
	
		const data={
			"email":email,
			"password":password
		}
		console.log("data"+JSON.stringify(data));
		const response= await axios.post("/v1/todo/login",data);
		
		if(response.data.success==true)
		{
			navigate("/home",{state:{id:response.data.id,name:response.data.name,profileurl:response.data.profileurl}})
		}
		else{
			setPopup(true);
		}
	}

	const googleNav=()=>
	{
		navigate("/forgotpassword")
	}

	async function invokesignupService(providertype,email,name,picture)
	{

			//console.log(providertype);
			//console.log(profile);
			const formData = new FormData();
			formData.append("name", name);
			formData.append("email", email);
			//formData.append("password", password);
			formData.append("logintype", providertype);
			formData.append("socialprofileurl", picture);
			
			//formData.append("file", selectedFile,selectedFile.name);

			console.log(formData);

			const response=await axios.post("/v1/todo/createuser",formData);
			//{headers: {"Content-Type": "multipart/form-data",},});
			console.log(response.data._id);
			console.log(response)
			if(response.data._id)
			{
				console.log("Account creation is successfull.");
				navigate("/home",{state:{id:response.data._id,name:response.data.name,profileurl:response.data.profileurl}})
			}
			else{
				setPopup(true);
				console.log("Account creation failed. Please try after sometime");
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
					<a rel="noopener noreferrer" href="/forgotpassword" className="text-xs hover:underline text-gray-600">Forgot password?</a>
				</div>
				<input type="password" name="password" id="password" value={password} onChange={event=>{setPassword(event.target.value)}} placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
		</div>
		<div className="space-y-2">
			<div>
				<button type="button" onClick={handleLoginAction} className="w-full px-8 py-3 font-semibold rounded-md bg-cyan-600 text-gray-50">Sign in</button>
			</div>
			<div>
				<LoginSocialGoogle
					//isOnlyGetToken
					client_id="518207309400-0u26dvkdlj17dmoe3nk46ocdk82sm6hj.apps.googleusercontent.com"
					scope="openid profile email"
					//discoveryDocs="claims_supported"
					//access_type="offline"
					onResolve={({ provider, data }) => {
					console.log(provider);
					console.log(data);
					console.log(data.email);
					console.log(data.name);
					console.log(data.picture);
					//setProvider("google");
					//setProfile({email:data.email,name:data.name,picture:data.picture});
					//console.log(providertype);
					//console.log(profile)
					invokesignupService(provider,data.email,data.name,data.picture);
					}}
					onReject={(err) => {
					console.log(err);
					}}
				>
					<GoogleLoginButton />
				</LoginSocialGoogle>
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

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const [toast, setToast] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
         setError("");
       try{
            const res = await axios.post(
                BASE_URL + "login",
                {emailId, password,},
                //to get cookies from server in the frontend
                {withCredentials: true},
            );

            dispatch(addUser(res.data));
            setToast(true);
            setTimeout(()=> {
                setToast(false);
            return navigate("/feed");
            }, 3000);
            // console.log(res.data);
            
       }catch(err){
            console.log(err);
            setError(err?.response?.data || "ERROR: Something Went Wrong");
       }
        
    };

    const handleSignUp = async() => {
        setError("");
        try{    
            const res = await axios.post(BASE_URL + "signup",{
                firstName, lastName, emailId, password
            },{
                withCredentials: true
            });

            dispatch(addUser(res.data.data));
            setToast(true);
            setTimeout(()=> {
                setToast(false);
            return navigate("/profile");
            }, 3000);

        }catch(err){
            console.log(err);
            setError(err?.response?.data || "ERROR: Something Went Wrong");
        }
    }
    
    return (
    <div className="flex justify-center my-10">
    <div className="card card-border bg-base-content w-96 text-base-200">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up" }</h2>

    {!isLoginForm  && ( 
        <>
    <label className="input input-bordered flex items-center gap-2 my-4">
    {/* <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="white"
        stroke="currentColor"
        >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
        </g>
    </svg> */}
    <input
        type="text"
        className="grow text-base-content"
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}
        required
        placeholder="First Name"
    />
    </label>

    <label className="input input-bordered flex items-center gap-2 my-4">
    {/* <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="white"
        stroke="currentColor"
        >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
        </g>
    </svg> */}
    <input
        type="text"
        className="grow text-base-content"
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}
        required
        placeholder="Last Name"
    />
    </label>
    </>
    )}
    
        <label className="input input-bordered flex items-center gap-2 my-4">
    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="white"
        stroke="currentColor"
        >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
        </g>
    </svg>
    <input
        type="text"
        className="grow text-base-content"
        value={emailId}
        onChange={(e)=>setEmailId(e.target.value)}
        required
        placeholder="Username"
    />
    </label>

      <label className="input input-bordered flex items-center gap-2 my-4">
    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="white"
        stroke="currentColor"
        >
        <path
            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
        ></path>
        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
        </g>
    </svg>
    <input
        type="password"
        className="grow text-base-content"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        placeholder="Password"
    />
    </label>
    {error && 
    (<p className="text-red-500">{error}</p>)
    }
    
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
    
   </div>

    <p 
    className="cursor-pointer underline m-auto" 
    onClick={()=>setIsLoginForm((value)=>!value)}
    >{isLoginForm ? "New User? Sign Up Here!" : "Existing User? Login Here!"}</p>

   {toast && (
     <div className="toast toast-top toast-end mt-20 rounded-sm">
    <div className="alert alert-success">
        <span>{ isLoginForm ? "Login Successful!" : "Sign Up Successful!"}</span>
    </div>
    </div>
   )}
  </div>
  </div>
</div>
);
};

export default Login;
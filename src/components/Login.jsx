import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
       try{
            const res = await axios.post(
                BASE_URL + "login",
                {emailId, password,},
                //to get cookies from server in the frontend
                {withCredentials: true},
            );

            setToast(true);
            setTimeout(()=> setToast(false), 3000);
            console.log(res.data);
            dispatch(addUser(res.data));
            return navigate("/feed");
            
       }catch(err){
        console.log(err);
       }
        
    };
    
    return (
    <div className="flex justify-center my-10">
    <div className="card card-border bg-base-content w-96 text-base-200">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    
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
        // pattern="[A-Za-z][A-Za-z0-9\-]*"
        // minlength="3"
        // maxlength="30"
        // title="Only letters, numbers or dash"
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
        // minlength="8"
        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
    />
    </label>

    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
   </div>

   {toast && (
     <div className="toast toast-top toast-end mt-20 rounded-sm">
    <div className="alert alert-success">
        <span>Login Successful !</span>
    </div>
    </div>
   )}
  </div>
  </div>
</div>
);
};

export default Login;
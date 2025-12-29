import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import {addRequests, removeRequest}from "../utils/requestsSlice";
import { useEffect } from "react";
import axios from "axios";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store)=> store.requests);

        const reviewRequests = async (status, _id) => {
            try{   
                const res = axios.post(`${BASE_URL}request/review/${status}/${_id}`,
                    {},
                {withCredentials: true});
                dispatch(removeRequest(_id));
            }catch(err){
                //Err Handling
            }
        };

    const fetchRequests = async()=>{
        try{
            const res = await axios.get(BASE_URL + "user/requests/received",{
                withCredentials: true,
            });
            dispatch(addRequests(res?.data?.data));
        }catch(err){
            //Err handling
        }
    };



    useEffect(()=>{
        fetchRequests();
    }, []);

     if(!requests) return;

    if(requests.length === 0) return (<div className="flex justify-center text-4xl m-10">
        No Requests Found! 
    </div>)
    
    return (<div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections Requests</h1>

        {requests.map((request)=>{
            const {_id, firstName, lastName, photoURL, age, gender, about} = request.fromUserId;

            return(<div key= {_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                <div>
                    <img alt="photo" className="w-50 h-20 rounded-full" src={photoURL} />
                </div>
                <div className="text-left mx-4">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                <p>{about}</p>
               { age && gender && ( <p>{age +", " + gender}</p>)}
                </div>

                <div>
                    <button 
                    className="btn btn-soft btn-primary mx-2" 
                    onClick={()=>reviewRequests("accepted", request._id )}>
                    Accept</button>
                    <button 
                    className="btn btn-soft btn-error mx-2"
                    onClick={()=>reviewRequests("rejected", request._id )}
                    >Reject</button>
                </div>
                
            </div>
            );
        })}

        </div>
       );

};

export default Requests;
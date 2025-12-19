import { useDispatch, useSelector} from "react-redux";
import {BASE_URL} from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store)=>store.feed);

    const getFeed = async () => {
        try{
            if(feed) return;
            const res = await axios.get(BASE_URL + "feed", {withCredentials: true});
            dispatch(addFeed(res.data));
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getFeed();
    },[]);

    return  (
        feed && (
            <div className="flex justify-center">
            <UserCard user={feed[0]}/>
        </div>
        )
    );
}

export default Feed;
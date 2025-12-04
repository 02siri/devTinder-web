import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () =>{
    return (
        <div>
            <NavBar/>
            
            {/*Outlet - any children components of Body will be rendered here*/}
            <Outlet />

            <Footer/>
        </div>
    );
};

export default Body;
import React from "react";
import {Helmet} from "react-helmet";
import { Outlet } from "react-router-dom";


const AuthLayout = () => {

    return (
        <Outlet/>
        
    );
}

export default AuthLayout;
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../modules/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../modules/auth/Login";
import CategoryList from "../modules/category/CategoryList";
import AddCategory from "../modules/category/AddCategory";

const PublicRouter = createBrowserRouter([
    {
        path:'/',
        element : <AuthLayout/>,
        children: [
            {
                path: '/',
                element : <Login/>
            }
            ,
             {
                path: '/category',
                element : < CategoryList/>
            }
            ,
             {
                path: '/category/create',
                element : < AddCategory/>
            }
        ]
    }
])

export default PublicRouter;
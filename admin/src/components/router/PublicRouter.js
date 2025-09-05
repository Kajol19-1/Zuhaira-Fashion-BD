import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../modules/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../modules/auth/Login";
import CategoryList from "../modules/category/CategoryList";
import AddCategory from "../modules/category/AddCategory";
import CategoryEdit from "../modules/category/CategoryEdit";
import SubCategoryAdd from "../modules/subCategory/SubCategoryAdd";
import SubCategoryList from "../modules/subCategory/SubCategoryList";
import SubCategoryEdit from "../modules/subCategory/SubCategoryEdit";
import BrandAdd from "../modules/brand/BrandAdd";
import BarndList from "../modules/brand/BrandList";
import BrandEdit from "../modules/brand/BrandEdit";
import SupplierAdd from "../modules/suppliers/SupplierAdd";
import SupplierList from "../modules/suppliers/SupplierList";

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
            ,
             {
                path: '/category/edit/:id',
                element : < CategoryEdit/>
            },
             {
                path: '/sub-category/create',
                element : < SubCategoryAdd/>
            },
             
            {
                path: '/sub-category',
                element : < SubCategoryList/>
            },
             
            {
                path: '/sub-category/edit/:id',
                element : < SubCategoryEdit/>
            }
            ,
             
            {
                path: '/brand/create',
                element : < BrandAdd/>
            } ,
             
            {
                path: '/brand',
                element : < BarndList/>
            }
            ,
             
            {
                path: '/brand/edit/:id',
                element : < BrandEdit/>
            }
             ,
             
            {
                path: '/supplier/create',
                element : < SupplierAdd/>
            },
             
            {
                path: '/supplier',
                element : < SupplierList/>
            }
        ]
    }
])

export default PublicRouter;
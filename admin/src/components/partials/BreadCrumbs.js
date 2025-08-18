import React from "react";
import {Helmet} from "react-helmet";

const BreadCrumb = (props) => {
    return (
        <>
            <Helmet>
                <title>{props.title} | Zuhaira Fashion BD</title>
            </Helmet>
                        <ol class="breadcrumb mb-4">
                             <li class="breadcrumb-item text-theme-light">Dashboard</li>
                            <li class="breadcrumb-item active">{props.title}</li>
                        </ol>
        </>
    );
}

export default BreadCrumb;
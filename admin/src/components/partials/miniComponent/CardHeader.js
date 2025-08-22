import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CardHeader = (props) => {
    return (

        <>
        <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-theme">{props.title}</h4>
            <Link to={props.link}><button className={'btn theme-button'}><i
            class={`fa-solid ${props.icon}`}></i>  {props.button_text} </button></Link>
        </div>
        </>
    );
};

export default CardHeader;
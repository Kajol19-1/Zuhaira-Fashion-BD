import React from "react";
import loader from './../../../assets/img/loader.svg'
const Loader = () => {
    return (
        <div className="loader">
            <img src ={loader} alt={'Loader'}/>
        </div>
    );
};

export default Loader;
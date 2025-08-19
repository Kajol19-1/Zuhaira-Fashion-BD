import React from 'react';
import $ from 'jquery';
import logo from './../../assets/img/logo.jpg';
import Swal from 'sweetalert2';
import axios from 'axios';
import Constants from '../../Contants';
import GlobalFunction from "../../GlobalFunction"


const Nav = () => {

    const handlelogout = () => {
        Swal.fire({
                    title: "Are you sure?",
                    text: "You will be logged out!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Logout!"
                    }).then((result) => {
                    if (result.isConfirmed) {
                    axios.post(`${Constants.BASE_URL}/logout`).then(res=>{
                                    GlobalFunction.logOut()
                                    window.location.reload()
                                }).catch(errors =>{
                                    GlobalFunction.logOut()
                                })
                    }
                });
    }

    const handleSidebar =() => {
        $('body').toggleClass('sb-sidenav-toggled')
    }
    return (

        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-theme">
            <a className="navbar-brand ps-3" href="index.html">
                <img src={logo} alt={'logo'} className={'img-thumbnail w-50'} /></a>
            <button onClick={handleSidebar} class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            
            <ul class="navbar-nav align-items-center ms-auto  me-3 me-lg-4 ">
                 <p className='text-white'>{localStorage.name != undefined ? localStorage.name : null}</p>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#!">Settings</a></li>
                        <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><button onClick={handlelogout} class="dropdown-item" >Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
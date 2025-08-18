import React from "react";
import Footer from '../partials/Footer';
import Nav from '../partials/Nav';
import SideBar from '../partials/SideBar';
import {Outlet} from "react-router-dom";



const Master = () => {
    return (
        <>
         <Nav></Nav>
      <div id="layoutSidenav">
        <SideBar></SideBar>
       
         <div id="layoutSidenav_content">
          <main>
                    <div class="container-fluid px-4">
                       <Outlet></Outlet> 
                        
                    </div>
                </main>

                <Footer></Footer>
         </div>
      </div>
        </>
    );
}

export default Master;
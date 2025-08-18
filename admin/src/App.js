import './assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './assets/css/style.scss'
import Footer from './components/partials/Footer';
import Nav from './components/partials/Nav';
import SideBar from './components/partials/SideBar';
import { RouterProvider } from 'react-router-dom';
import ProjectRouter from './components/router/ProjectRouter';
import { useEffect, useState } from 'react';
import PublicRouter from './components/router/PublicRouter';
import axios from 'axios';
import './AxiosInterceptor';



function App() {

  const [auth, setAuth] = useState(false)
  
  useEffect(()=>{ 

if (localStorage.token != undefined ){
  setAuth(true)
  }
  }, [])

  return (
    <>
     {auth ?
     <RouterProvider router={ProjectRouter}/>:
     <RouterProvider router={PublicRouter}/>
     }
    </>
  );
}

export default App;

// abc

import axios from "axios";
import GlobalFunction from "./GlobalFunction"
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.token != undefined ){
 config.headers['Authorization'] = `Bearer ${localStorage.token}`
  }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.status == 401){
         GlobalFunction.logOut()
    }else if (error.response.status == 500)
    
     window.location.href = window.location.origin + '/error-500'

    return Promise.reject(error);
  });
import { Outlet, Navigate } from "react-router";

import Cookies from "universal-cookie";

import axios from "axios";

import useHttp from "../hooks/useHttp";

import {
    useState, useEffect} from "react";


const AdminGuard = ()=>{
    

    const [request,setRequest] = useState(null);
    const [httpResponse,httpError,httpLoader] = useHttp(request);

    const verifyToken = () => {
    
        return setRequest({
          method: "get",
          url: "http://localhost:8080/verify-token/"+token
        });
        
      
      }

    const cookie = new Cookies();
    const token = cookie.get("authToken");

    

    if(request == null){

        verifyToken();
  
      }

      if(httpResponse){

        let user = JSON.stringify(httpResponse.data);
        
        sessionStorage.setItem("admin",user);
  
        return <Outlet />
  
      }if(httpError){
  
        return <Navigate to="/admin/login" />
  
      }




}

export default AdminGuard;
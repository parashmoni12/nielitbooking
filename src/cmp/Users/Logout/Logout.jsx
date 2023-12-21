

import { useState, useEffect } from "react";



import { useDispatch, useSelector } from "react-redux";


import { logoutRequest } from "../Login/Login.action";




const Logout = ()=>{

   

    const {LoginReducer} = useSelector(response=>response);
    
    const dispatch = useDispatch();

    
    const [testing,setTesting] = useState(null);

   

    
    useEffect(()=>{

        dispatch(logoutRequest());


    },[testing]);
    


    const design = (

        <>
        </>

    );



    return design;
}

export default Logout;


import { useState, useEffect } from "react";



import { useDispatch, useSelector } from "react-redux";


import { AdminlogoutRequest } from "../../../Login/AdminLogin.action";




const Logout = ()=>{

   

    const {AdminLoginReducer} = useSelector(response=>response);
    
    const dispatch = useDispatch();

    
    const [testing,setTesting] = useState(null);

   

    
    useEffect(()=>{

        dispatch(AdminlogoutRequest());


    },[testing]);
    


    const design = (

        <>
        </>

    );



    return design;
}

export default Logout;
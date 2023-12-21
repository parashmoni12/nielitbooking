import{

    

    OTP_REQUEST,
    OTP_SUCCESS,
    OTP_NOT_FOUND,

    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAILED


} from "./Verification.state";



import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";


const sendMail = (user)=>{


    return async (dispatch)=>{


        try{

            dispatch({

                type : OTP_REQUEST,
                payload : []

            });



            const response = await axios({

                method : "post",
                url : "/user/otp",
                data: user

            });


           
           

         
            if(response.status==404){

                dispatch({

                    type : OTP_NOT_FOUND

                });

            }

            if(response.status==200)
            {
                dispatch({

                    type : OTP_SUCCESS,
                    
    
                });

            }
            
           
            


        }catch(err){

            if(err.response.status==401){

                dispatch({

                    type : OTP_NOT_FOUND

                });


            }


        }



    }

}


const loginRequest = (user)=>{

    
    return async (dispatch)=>{


        try{

            dispatch({

                type : VERIFY_REQUEST,
                payload : []

            });

            

            const response = await axios({

                method : "post",
                url : "/user/otpVerify",
                data: user

            });

        
           
    
            if(response.status==409){

                dispatch({

                    type : VERIFY_FAILED

                });

            }

            if(response.status==200)
            {
                dispatch({

                    type : VERIFY_SUCCESS
    
                });

            }
            
          
            


        }catch(err){

           
            if(err.response.status==409){

                dispatch({

                    type : VERIFY_FAILED

                });


            }


        }



    }

    

}


export {

    loginRequest,
    sendMail
   

}
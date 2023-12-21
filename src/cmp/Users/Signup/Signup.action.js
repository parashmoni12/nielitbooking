import {
    SIGNUP_REQUEST,
    SIGNUP_ERROR,
    SIGNUP_SUCCESS
} from "./Signup.state";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const signupRequest = (formdata)=>{

    return async (dispatch)=>{

        try{

                    const response = await axios({

                        method : "post",
                        url: "/user/signup",
                        data : formdata

                    });

                    if(response.data.status == 409){

                    const err = JSON.parse(response.data.text);
                            
                            dispatch({

                                type : SIGNUP_ERROR,
                                error : err
                                
                            });

                    }else{

                        dispatch({

                            type : SIGNUP_SUCCESS,
                            payload : response.data
                            
                        });



                    }

        }catch(err){
            
            dispatch({

                type : SIGNUP_ERROR,
                error : err
                
            });


        }

    }

}

export {

    signupRequest

}
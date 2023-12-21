import{

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_NOT_FOUND,
    INCORRECT_PASSWORD,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED

} from "./Login.state";

import Cookies from "universal-cookie";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";



const loginRequest = (user)=>{

    return async (dispatch)=>{


        try{

            dispatch({

                type : LOGIN_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "post",
                url : "/user/login",
                data: user

            });
            
            if(response.data.status==404){

                dispatch({

                    type : USER_NOT_FOUND

                });

            }

            if(response.data.isLogged)
            {
                dispatch({

                    type : LOGIN_SUCCESS,
                    payload : response.data
    
                });

            }
            
            


        }catch(err){

            if(err.response.status==401){

                dispatch({

                    type : INCORRECT_PASSWORD

                });


            }


        }



    }



}

const logoutRequest = ()=>{

    return async (dispatch)=>{

        try {
            const cookie = new Cookies();
            let tmp = sessionStorage.getItem("user");
            let userInfo = JSON.parse(tmp);
            let id = userInfo._id;
            const response = await axios({
              method: "get",
              url: "/logout/"+id
            });
            sessionStorage.clear();
            cookie.remove("sukdldtojken");
            dispatch({
              type: LOGOUT_SUCCESS
            });

          }catch(err){

            dispatch({
                type: LOGOUT_FAILED
              });

        }


    }


}
export {

    loginRequest,
    logoutRequest

}
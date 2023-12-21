import{

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_NOT_FOUND,
    INCORRECT_PASSWORD,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED

} from "./AdminLogin.state";

import Cookies from "universal-cookie";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";



const AdminloginRequest = (user)=>{

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : LOGIN_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "post",
                url : "/admin/login",
                data: user

            });
            
          
           
         

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
          
            if(err.response.status==404){

                dispatch({

                    type : USER_NOT_FOUND

                });

            }

           


        }



    }



}

const AdminlogoutRequest = ()=>{

    return async (dispatch)=>{

        try {
            const cookie = new Cookies();
            let tmp = sessionStorage.getItem("admin");
            let userInfo = JSON.parse(tmp);
            let id = userInfo._id;
            const response = await axios({
              method: "get",
              url: "admin/logout/"+id
            });
            sessionStorage.clear();
            cookie.remove("authToken");
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

    AdminloginRequest,
    AdminlogoutRequest

}
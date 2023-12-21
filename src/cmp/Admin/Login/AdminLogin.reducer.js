import{

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_NOT_FOUND,
    INCORRECT_PASSWORD,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED

} from "./AdminLogin.state";


const Model = {

    isLoading : false,
    userNotFound : false,
    incorectPassword : false,
    data : [],
    isLogged : false,
    isLogout : false


}


const AdminLoginReducer = (state=Model,action)=>{

    switch(action.type){

        case LOGIN_REQUEST : return {

            ...state,
            isLoading : true,
            userNotFound : false,
            incorectPassword : false,
            data : [],
            isLogged : false,
            isLogout : false
        
        }
        case LOGIN_SUCCESS : return {

            ...state,
            isLoading : false,
            userNotFound : false,
            incorectPassword : false,
            data : action.payload,
            isLogged : true,
            isLogout : false
        
        
        }

        case USER_NOT_FOUND : return {

            ...state,
            isLoading : false,
            userNotFound : true,
            incorectPassword : false,
            data : [],
            isLogged : false,
            isLogout : false
        
        
        }

        case INCORRECT_PASSWORD : return {

            ...state,
            isLoading : false,
            userNotFound : false,
            incorectPassword : true,
            data : [],
            isLogged : false,
            isLogout : false
        
        
        }

        case LOGOUT_SUCCESS : return {

            ...state,
            isLoading : false,
            userNotFound : false,
            incorectPassword : false,
            data : [],
            isLogged : false,
            isLogout : true
        
        
        }

        case LOGOUT_FAILED : return {

            ...state,
            isLoading : false,
            userNotFound : false,
            incorectPassword : false,
            isLogged : true,
            isLogout : false
        
        
        }

        default : return state ;




    }


}


export default AdminLoginReducer;
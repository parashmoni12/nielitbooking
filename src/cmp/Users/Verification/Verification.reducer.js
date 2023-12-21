import{

    

    OTP_REQUEST,
    OTP_SUCCESS,
    OTP_NOT_FOUND,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAILED


} from "./Verification.state";



const Model = {

    isLoading : false,
    otpsend : false,
    otpsendingFailed : false,
    isLoadingV : false,
    vSuccess : false,
    vFailed : false
 


}


const OtpReducer = (state=Model,action)=>{

    switch(action.type){

        case OTP_REQUEST : return {

            ...state,
            isLoading : true,
            otpsend: false,
            otpsendingFailed:false
        
        }
        case OTP_SUCCESS : return {

           
            ...state,
            isLoading : false,
            otpsend: true,
            otpsendingFailed:false
        
        
        }

        case OTP_NOT_FOUND : return {

            ...state,

            isLoading : false,
            otpsend: false,
            otpsendingFailed:true
        
        
        }

        case VERIFY_REQUEST : return {

            ...state,
            
            isLoading:false,
            isLoadingV : true,
            vSuccess : false,
            vFailed: false
        
        
        }

        case VERIFY_SUCCESS : return {

            ...state,
            isLoading :false,
            isLoadingV : false,
            vSuccess : true,
            vFailed: false
        
        
        }

        case VERIFY_FAILED : return {

            ...state,
            isLoading: false,
            isLoadingV : false,
            vSuccess : false,
            vFailed: true
        
        
        }

      

        default : return state ;




    }


}


export default OtpReducer;
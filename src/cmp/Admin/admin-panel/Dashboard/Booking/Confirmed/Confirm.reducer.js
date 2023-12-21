import {

    COUNT_REQUEST,
    COUNT_SUCCESS,
    COUNT_FAILED,
    PAGINATION_REQUEST,
    PAGINATION_SUCCESS,
    PAGINATION_FAILED,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAILED
  

} from "./Confirm.state";

const Model = {

    isLoading : false,
    countSuccess : false,
    countFailed : false,
    paginationSuccess : false,
    paginationFailed : false,
    data : [],
    dataPag : [],
    dataCon:[],
    confirmPayment:false,
    failedPayment:false,
    message : ""
  
   


}



const AdminConfirmReducer = (state=Model,action)=>{


    switch(action.type){

        case COUNT_REQUEST : return {

            ...state,
            isLoading : true,
            data : [],
            countSuccess : false,
            countFailed : false
        
        }
        case COUNT_SUCCESS : return {

            ...state,
            isLoading : false,
            data : action.payload,
            countSuccess : true,
            countFailed : false
        
        
        }

        case COUNT_FAILED : return {

            ...state,
            isLoading : false,
            data : [],
            countSuccess : false,
            countFailed : true
        
        
        }

        case PAGINATION_REQUEST: return {

            ...state,
            isLoading : true,
            data : [],
            paginationSuccess : false,
            paginationFailed : false
        
        
        }

        case PAGINATION_SUCCESS: return {

            ...state,
            isLoading : false,
            dataPag: action.payload,
            paginationSuccess : true,
            paginationFailed : false
        
        
        }

        
        case PAGINATION_FAILED: return {

            ...state,
            isLoading : false,
            data : [],
            paginationSuccess : false,
            paginationFailed : true
        
        
        }

        case UPDATE_REQUEST: return {

            ...state,
            isLoading : true,
            dataCon: [],
            confirmPayment:false,
            failedPayment: false
        
        
        }

        case UPDATE_SUCCESS: return {

            ...state,
            isLoading : false,
            dataCon: action.payload,
            confirmPayment:true,
            failedPayment: false,
            message : "Payment Update Successfully"
        
        
        }

        case UPDATE_FAILED: return {

            ...state,
            isLoading : false,
            dataCon: [],
            confirmPayment: false,
            failedPayment: true,
            message : "Payment Failed"
        
        
        }
        

        default : return state ;




    }


} 


export default AdminConfirmReducer;
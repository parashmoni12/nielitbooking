import {

    COUNT_REQUEST,
    COUNT_SUCCESS,
    COUNT_FAILED,
    PAGINATION_REQUEST,
    PAGINATION_SUCCESS,
    PAGINATION_FAILED,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAILED,
    CANCEL_REQUEST,
    CANCEL_SUCCESS,
    CANCEL_FAILED

} from "./Pending.state";

const Model = {

    isLoading : false,
    countSuccess : false,
    countFailed : false,
    paginationSuccess : false,
    paginationFailed : false,
    data : [],
    dataPag : [],
    dataCon:[],
    confirmBooking: false,
    failedBooking :false,
    cancelSuccess: false,
    cancelFailed : false
   


}



const AdminPendingReducer = (state=Model,action)=>{


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
            confirmBooking:false,
            failedBooking: false
        
        
        }

        case UPDATE_SUCCESS: return {

            ...state,
            isLoading : false,
            dataCon: action.payload,
            confirmBooking:true,
            failedBooking: false
        
        
        }

        case UPDATE_FAILED: return {

            ...state,
            isLoading : false,
            dataCon: [],
            confirmBooking: false,
            failedBooking: true
        
        
        }
        
        case CANCEL_REQUEST : return {

            ...state,
            isLoading:true,
            cancelSuccess:false,
            cancelFailed:false

        }

        case CANCEL_SUCCESS : return {

            ...state,
            isLoading:false,
            cancelSuccess:true,
            cancelFailed:false

        }
        
        case CANCEL_FAILED : return {

            ...state,
            isLoading:false,
            cancelSuccess:false,
            cancelFailed:true

        }
        

        default : return state ;




    }


} 


export default AdminPendingReducer;
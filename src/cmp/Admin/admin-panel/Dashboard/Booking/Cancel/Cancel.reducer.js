import {

    COUNT_REQUEST,
    COUNT_SUCCESS,
    COUNT_FAILED,
    PAGINATION_REQUEST,
    PAGINATION_SUCCESS,
    PAGINATION_FAILED,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILED
  

} from "./Cancel.state";

const Model = {

    isLoading : false,
    countSuccess : false,
    countFailed : false,
    paginationSuccess : false,
    paginationFailed : false,
    data : [],
    dataPag : [],
    dataCon:[],
    deleteSuccess: false,
    deleteFailed : false
  
   


}



const CancelAdminReducer = (state=Model,action)=>{


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

        case DELETE_REQUEST : return {

            ...state,
            isLoading :true,
            deleteSuccess :false,
            deleteFailed:false

        }

        case DELETE_SUCCESS : return {

            ...state,
            isLoading :false,
            deleteSuccess :true,
            deleteFailed:false

        }

        case DELETE_FAILED : return {

            ...state,
            isLoading :false,
            deleteSuccess :false,
            deleteFailed:true

        }
      

        default : return state ;




    }


} 


export default CancelAdminReducer;
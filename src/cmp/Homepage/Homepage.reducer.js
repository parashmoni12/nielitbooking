import {

    COUNT_REQUEST,
    COUNT_SUCCESS,
    COUNT_FAILED,
    COUNT_PENDING_REQUEST,
    COUNT_PENDING_SUCCESS,
    COUNT_PENDING_FAILED,
    COUNT_TOTAL_REQUEST,
    COUNT_TOTAL_SUCCESS,
    COUNT_TOTAL_FAILED


} from "./Homepage.state";

const Model = {

    isLoading : false,
    countSuccess : false,
    countFailed : false,
    countPendingSuccess:false,
    countPendingFailed : false,
    countTotalSuccess : false,
    countTotalFailed : false,
    data : [],
    pendingData : [],
    totalData : []
   
   


}



const HomepageReducer = (state=Model,action)=>{


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
        
        case COUNT_PENDING_REQUEST : return {

            ...state,
            isLoading: true,
            pendingData: [],
            countPendingSuccess:false,
            countPendingFailed :false
            


        }

        case COUNT_PENDING_SUCCESS : return {

            ...state,
            isLoading:false,
            countPendingSuccess:true,
            pendingData:action.payload,
            countPendingFailed:false


        }
        
        case COUNT_PENDING_FAILED : return {

            ...state,
            isLoading: false,
            pendingData:[],
            countPendingSuccess:false,
            countPendingFailed:true

        }

        case COUNT_TOTAL_REQUEST : return{

            ...state,
            isLoading :true,
            countTotalSuccess : false,
            countTotalFailed : false,
            totalData : []
            

        }
        

        case COUNT_TOTAL_SUCCESS : return {

            ...state,
            isLoading : false,
            countTotalSuccess : true,
            countTotalFailed : false,
            totalData: action.payload


        }

        case COUNT_TOTAL_FAILED : return {

            ...state,
            isLoading : false,
            countTotalSuccess : false,
            countTotalFailed : true,
            totalData: []


        }




        default : return state ;




    }


} 


export default HomepageReducer;
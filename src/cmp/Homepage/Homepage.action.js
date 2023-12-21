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



import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";


const countUser = ()=>{
    

    return async (dispatch)=>{

       

       
     
        try{

            dispatch({

                type : COUNT_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "get",
                url : "/count-user-admin",


            });
            
           
            if(response){

                dispatch({

                    type : COUNT_SUCCESS,
                    payload : response.data.length
    
                });


            }else{

                dispatch({

                    type : COUNT_FAILED,
                  
                });

            }
          
           
         

         
            


        }catch(err){


                dispatch({

                    type : COUNT_FAILED

                });


    
          
       

           


        }

        


    }


}



const countPending = ()=>{

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : COUNT_PENDING_REQUEST,
                payload : []

            });
 
            const response = await axios({

                method : "get",
                url : "/count",


            });

            
                     
          
            dispatch({

                type : COUNT_PENDING_SUCCESS,
                payload : response.data

            });

         

            
            


        }catch(err){


                dispatch({

                    type : COUNT_PENDING_FAILED

                });


    
          
       

           


        }



    }


}


const countTotal = ()=>{

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : COUNT_TOTAL_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "get",
                url : "/allbookingData",


            });

            
            
          
            dispatch({

                type : COUNT_TOTAL_SUCCESS,
                payload : response.data

            });

        
            
            


        }catch(err){


                dispatch({

                    type : COUNT_TOTAL_FAILED

                });


    
          
       

           


        }



    }


}


export {

    countUser,
    countPending,
    countTotal
  
}
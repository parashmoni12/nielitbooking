import {

    COUNT_REQUEST,
    COUNT_SUCCESS,
    COUNT_FAILED,
    PAGINATION_REQUEST,
    PAGINATION_SUCCESS,
    PAGINATION_FAILED,
   
    CANCEL_REQUEST,
    CANCEL_SUCCESS,
    CANCEL_FAILED


} from "./Pending.state";



import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";


const countData = (id)=>{

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : COUNT_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "get",
                url : `/count-pendinguserBooking/${id}`,


            });

            
            
          
            dispatch({

                type : COUNT_SUCCESS,
                payload : response.data

            });

         

            
            


        }catch(err){


                dispatch({

                    type : COUNT_FAILED

                });


    
          
       

           


        }



    }


}


const pagination = (id,from,to)=>{

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : PAGINATION_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "get",
                url : `http://localhost:8080/count-pendinguserBooking/${from}/${to}/${id}`,


            });

          
          


            if(response){

              
                dispatch({

                    type : PAGINATION_SUCCESS,
                    payload : response.data
    
                });

            }
          
           
         

         
            


        }catch(err){


           
                dispatch({

                    type : PAGINATION_FAILED
                });


    
          
       

           


        }



    }


}



const cancelBooking = (id)=>{

    
    
    return async (dispatch)=>{


     
        try{

            dispatch({

                type : CANCEL_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "post",
                url : "/cancel-booking",
                data : {
                    _id: id
                }


            });

            dispatch({

                type : CANCEL_SUCCESS,
                payload : response.data


            });
            
        


        }catch(err){


                dispatch({

                    type : CANCEL_FAILED

                });


    
          
       

           


        }



    }
    

}

export {

    countData,
    pagination,
    cancelBooking
}
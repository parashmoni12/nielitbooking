import {

    COUNT_REQUEST,
    COUNT_SUCCESS,
    COUNT_FAILED,
    PAGINATION_REQUEST,
    PAGINATION_SUCCESS,
    PAGINATION_FAILED
 

} from "./Confirm.state";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const countConfirmBooking= (id)=>{

   

    return async (dispatch)=>{

     
       
     
        try{

            dispatch({

                type : COUNT_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "get",
                url : `http://localhost:8080/confirm-bookinguser/${id}`


            });

           
    
            if(response){


                dispatch({

                    type : COUNT_SUCCESS,
                    payload : response.data
    
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

const pagination = (id,from,to)=>{

    return async (dispatch)=>{

     
       
     
        try{

            dispatch({

                type : PAGINATION_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "get",
                url : `http://localhost:8080/confirm-bookinguser/${from}/${to}/${id}`


            });

          
    
            if(response){


                dispatch({

                    type : PAGINATION_SUCCESS,
                    payload : response.data
    
                });



            }else{

                dispatch({

                    type : PAGINATION_FAILED,
                    
    
                });




            }
          
          
           
         

         
            


        }catch(err){


                dispatch({

                    type : PAGINATION_FAILED

                });


    
          
       

           


        }



    }


}



export {

    countConfirmBooking,
    pagination
   

}
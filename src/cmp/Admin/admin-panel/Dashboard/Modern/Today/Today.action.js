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
  


} from "./Today.state";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const countUser = (today)=>{

    return async (dispatch)=>{

     
       
     
        try{

            dispatch({

                type : COUNT_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "get",
                url : `/today-count-admin/${today}`


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


const pagination = (today,from,to)=>{

   

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : PAGINATION_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "get",
                url : `/today-count-admin/${today}/${from}/${to}`,


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


const confirmPending = (id)=>{

  

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : UPDATE_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "post",
                url : "/confirm-bookings",
                data : {
                    _id: id
                }


            });

            dispatch({

                type : UPDATE_SUCCESS,
                payload : response.data


            });
            
        


        }catch(err){


                dispatch({

                    type : UPDATE_FAILED

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

    countUser,
    pagination,
    confirmPending,
    cancelBooking
   

}
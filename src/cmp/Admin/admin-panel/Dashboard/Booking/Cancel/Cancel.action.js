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
                url : "/cancelbookingInfo",


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


const pagination = (from,to)=>{

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : PAGINATION_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "get",
                url : `/cancelbookingInfo/${from}/${to}`,


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


const deleteCancelBooking = (id)=>{

  

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : DELETE_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "post",
                url : "/cancelbookingInfo",
                data : {
                    _id: id
                }


            });

            dispatch({

                type : DELETE_SUCCESS,
                payload : response.data


            });
            
        


        }catch(err){


                dispatch({

                    type : DELETE_FAILED

                });


    
          
       

           


        }



    }


}

export {

    countUser,
    pagination,
    deleteCancelBooking
 
}
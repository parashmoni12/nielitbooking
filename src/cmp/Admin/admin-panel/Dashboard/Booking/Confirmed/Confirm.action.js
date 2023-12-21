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
                url : "/count-confirm",


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
                url : `/count-confirm/${from}/${to}`,


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


const confirmPayment = (id)=>{

  

    return async (dispatch)=>{


     
        try{

            dispatch({

                type : UPDATE_REQUEST,
                payload : []

            });

            const response = await axios({

                method : "post",
                url : "/count-confirm",
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

export {

    countUser,
    pagination,
    confirmPayment
 
}
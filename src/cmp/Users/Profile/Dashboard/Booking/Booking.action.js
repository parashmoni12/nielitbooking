import {

    BOOKING_REQUEST,
    BOOKING_SUCCESS,
    BOOKING_FAILED,



} from "./Booking.state";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const BookingRequest = (user)=>{

    return async (dispatch)=>{

       
        try{

            dispatch({

                type : BOOKING_REQUEST,
                payload : []

            });

        
            const response = await axios({

                method : "post",
                url : "/booking-slot",
                data: user

            });

           if(response.status){

            dispatch({

                type : BOOKING_SUCCESS,
                

            });




           }else{


            dispatch({

                type : BOOKING_FAILED,
                

            });

           }

           

          
         
        
            
            


        }catch(err){

            dispatch({

                type : BOOKING_FAILED,
                

            });


        }



    }



}

export {

    BookingRequest

}
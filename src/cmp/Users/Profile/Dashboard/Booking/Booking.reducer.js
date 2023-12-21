import {

    BOOKING_REQUEST,
    BOOKING_SUCCESS,
    BOOKING_FAILED,



} from "./Booking.state";

const Model = {

    isLoading : false,
    bookingRequest: false,
    bookingSuccess : false,
    bookingFailed : false,
 
    
   


}



const BookingReducer = (state=Model,action)=>{


    switch(action.type){

        case BOOKING_REQUEST : return {

            ...state,
            isLoading : true,
            bookingSuccess : false,
            bookingFailed : false
        
        }
        case BOOKING_SUCCESS : return {

            ...state,
            isLoading : false,
            bookingSuccess : true,
            bookingFailed : false
        
        
        }

        case BOOKING_FAILED : return {

            ...state,
            isLoading : false,
            bookingSuccess : false,
            bookingFailed : true
        
        
        }


        

        default : return state ;




    }


} 


export default BookingReducer;
import { createStore,applyMiddleware,combineReducers } from "redux";    
import logger from "redux-logger";
import thunk from "redux-thunk";
import SignupReducer from "./cmp/Users/Signup/Signup.reducer";
import LoginReducer from "./cmp/Users/Login/Login.reducer";
import AdminLoginReducer from "./cmp/Admin/Login/AdminLogin.reducer";
import UserCountReducer from "./cmp/Admin/admin-panel/Dashboard/Users/User.reducer";
import BookingReducer from "./cmp/Users/Profile/Dashboard/Booking/Booking.reducer";
import AdminPendingReducer from "./cmp/Admin/admin-panel/Dashboard/Booking/Pending/Pending.reducer";
import AdminConfirmReducer from "./cmp/Admin/admin-panel/Dashboard/Booking/Confirmed/Confirm.reducer";
import TodayCountReducer from "./cmp/Users/Profile/Dashboard/Modern/Today/Today.reducer";
import ConfirmBoookingReducer from "./cmp/Users/Profile/Dashboard/Details/Confirmed/Confirm.reducer";
import TodayCountReducerAdmin from "./cmp/Admin/admin-panel/Dashboard/Modern/Today/Today.reducer";
import AdminAllBookingReducer from "./cmp/Admin/admin-panel/Dashboard/Booking/AllBooking/AllBooking.reducer";
import CancelAdminReducer from "./cmp/Admin/admin-panel/Dashboard/Booking/Cancel/Cancel.reducer";
import UserPendingReducer from "./cmp/Users/Profile/Dashboard/Details/Pending/Pending.reducer";
import ForgotReducer from "./cmp/Forgot/Forgot.reducer";
import HomepageReducer from "./cmp/Homepage/Homepage.reducer";
import OtpReducer from "./cmp/Users/Verification/Verification.reducer";
import UserAllReducer from "./cmp/Users/Profile/Dashboard/Details/AllBooking/AllBooking.reducer";


const middlewares = applyMiddleware(
    logger,
    thunk
);

const root = combineReducers({

    SignupReducer,
    LoginReducer,
    AdminLoginReducer,
    UserCountReducer,
    BookingReducer,
    AdminPendingReducer,
    AdminConfirmReducer,
    TodayCountReducer,
    ConfirmBoookingReducer,
    TodayCountReducerAdmin,
    AdminAllBookingReducer,
    CancelAdminReducer,
    UserPendingReducer,
    ForgotReducer,
    HomepageReducer,
    OtpReducer,
    UserAllReducer
});

const storage = createStore(root,{},middlewares);

export default storage;
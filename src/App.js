import * as React from "react";


import {

  BrowserRouter as Router, 
  Routes, 
  Route

} from "react-router-dom";

import {

  ThemeProvider ,
  createTheme,
  CircularProgress

} from "@mui/material";

import {

  deepPurple,
  teal,
  pink,
  deepOrange,
  lightBlue,
  cyan

} from "@mui/material/colors";


import storage from "./storage";
import { Provider } from "react-redux";



import "./App.css";
import 'material-icons/iconfont/material-icons.css';


const AdminLogin = React.lazy(()=>import("./cmp/Admin/Login/AdminLogin"));
const AdminPanel = React.lazy(()=>import("./cmp/Admin/admin-panel/admin"));
const Homepage = React.lazy(()=>import("./cmp/Homepage/Homepage"));
const Signup = React.lazy(()=>import("./cmp/Users/Signup/Signup"));
const Forgot = React.lazy(()=>import("./cmp/Forgot/Forgot"));
const ForgotAdmin = React.lazy(()=>import("./cmp/ForgotAdmin/Forgot"));
const Profile = React.lazy(()=>import("./cmp/Users/Profile/Profile"));
const Notfound = React.lazy(()=>import("./cmp/Notfound/Notfound"));
const Login = React.lazy(()=>import("./cmp/Users/Login/Login"));
const Modern = React.lazy(()=>import("./cmp/Users/Profile/Dashboard/Modern/Modern"));
const Booking = React.lazy(()=>import("./cmp/Users/Profile/Dashboard/Booking/Booking"));
const AllBooking = React.lazy(()=>import("./cmp/Users/Profile/Dashboard/Details/AllBooking/AllBooking"));
const ConfirmBooking = React.lazy(()=>import("./cmp/Users/Profile/Dashboard/Details/Confirmed/Confirm"));
const PendingBooking = React.lazy(()=>import("./cmp/Users/Profile/Dashboard/Details/Pending/Pending"));
const VerificationMail = React.lazy(()=>import("./cmp/Users/Verification/Verification"));
const ULogout = React.lazy(()=>import("./cmp/Users/Logout/Logout"));
const ProfileInfo = React.lazy(()=>import("./cmp/Users/Profile/Dashboard/Details/Profile/Profile"));


const AdminGuard = React.lazy(()=>import("./guard/AdminGuard"));
const ProfileGuard = React.lazy(()=>import("./guard/ProfileGuard"));
const Amodern = React.lazy(()=>import("./cmp/Admin/admin-panel/Dashboard/Modern/Modern"));
const Ausers = React.lazy(()=>import("./cmp/Admin/admin-panel/Dashboard/Users/User"));
const Apending = React.lazy(()=>import("./cmp/Admin/admin-panel/Dashboard/Booking/Pending/Pending"));
const Aconfirmed = React.lazy(()=>import("./cmp/Admin/admin-panel/Dashboard/Booking/Confirmed/Confirm"));
const AdminAllBooking = React.lazy(()=>import("./cmp/Admin/admin-panel/Dashboard/Booking/AllBooking/AllBooking"));
const ACancelBooking = React.lazy(()=>import("./cmp/Admin/admin-panel/Dashboard/Booking/Cancel/Cancel"));
const Alogout = React.lazy(()=>import("./cmp/Admin/admin-panel/Dashboard/Logout/Logout"));
const AddUser = React.lazy(()=>import("./cmp/Admin/admin-panel/Dashboard/Booking/AddUser/AddUser"));
const AForgotPass = React.lazy(()=>import("./cmp/Admin/admin-panel/Dashboard/Booking/Forgot/Forgot"));


const Loader = ()=>{

  const design = (

    <>

        <CircularProgress color="info" className="loader" />


    </>


  );
  
  return design;

}


const App = ()=>{
  
  const Theme = createTheme({

    palette : {

      secondary : teal,
      error : pink,
      warning : deepOrange,
      success: cyan,
      info : deepPurple


    }, typography : {

      fontFamily : "Poppins"

    }


  });


  const design  = (

      <>
      
      <Provider store={storage}>

          <ThemeProvider theme={Theme}>
            
            <Router>

                <Routes>

                    
                    <Route path="/admin/login" element={
                        <React.Suspense fallback={<Loader />}>

                              <AdminLogin/>

                        </React.Suspense>

                    } />
                   
                    <Route element={<AdminGuard />}>

                          <Route path="/admin-panel" element = { 

                                <React.Suspense fallback={<Loader />}>

                                    <AdminPanel />

                                </React.Suspense>

                           } >

                                <Route path="modern" element={
                                
                                    <React.Suspense fallback={<Loader />}>

                                            <Amodern/>
  
                                       </React.Suspense>
                                
                                } />

                                <Route path="users" element = {

                                    <React.Suspense fallback={<Loader />}>

                                        <Ausers/>

                                    </React.Suspense>

                                } />

                                <Route path="pending" element = {


                                          <React.Suspense fallback={<Loader />}>

                                              <Apending/>

                                          </React.Suspense>

                                } />

                                <Route path="confirmed-bookings" element = {

                                        <React.Suspense fallback={<Loader />}>

                                            <Aconfirmed />

                                        </React.Suspense>


                                } />

                                <Route path="all-bookings" element = {

                                        <React.Suspense fallback={<Loader />}>

                                            <AdminAllBooking />

                                        </React.Suspense>

                                } />

                                <Route path="cancel-booking" element = {

                                          <React.Suspense fallback={<Loader />}>

                                              <ACancelBooking />

                                          </React.Suspense>
                                } />

                                <Route path="add_instructor" element={

                                          <React.Suspense fallback={<Loader />}>

                                              <AddUser />

                                          </React.Suspense>
                                } />

                                <Route path="forgot-password" element={

                                      <React.Suspense fallback={<Loader />}>

                                            <AForgotPass/>

                                      </React.Suspense>


                                } />

                                <Route path="logout"  element={
                                      <React.Suspense fallback={<Loader />}>

                                      <Alogout/>

                                      </React.Suspense>



                                } />

                                <Route path = "*" element = {

                                      <React.Suspense fallback={<Loader />}>

                                        <Notfound/>

                                      </React.Suspense>

                                } />

                          </Route>

                    </Route>



                    <Route path="/" element={
                    
                          <React.Suspense fallback={<Loader />}>

                              <Homepage />

                         </React.Suspense>
                    
                    
                    } /> 
                    <Route path="/forgot-password" element={

                            <React.Suspense fallback={<Loader />}>

                            <Forgot/>

                            </React.Suspense>


                    } />
                    <Route path ="/forgot-password-admin" element={

                            <React.Suspense fallback={<Loader />}>

                              <ForgotAdmin/>

                            </React.Suspense>


                    } />
                    <Route path="/login" element={

                            <React.Suspense fallback={<Loader />}>

                            <Login/>

                            </React.Suspense>


                    }  />
                    <Route path="/signup" element={

                                <React.Suspense fallback={<Loader />}>

                                <Signup/>

                                </React.Suspense>


                    }  />
                    <Route path="verification-mail" element={
                        <React.Suspense fallback={<Loader />}>

                        <VerificationMail/>

                         </React.Suspense>


                    } />
                    
                    <Route element={
                      <React.Suspense fallback={<Loader />}>

                        <ProfileGuard />

                     </React.Suspense>

                    }>

                            <Route path="/profile" element = {

                                <React.Suspense fallback={<Loader />}>

                                  <Profile/>

                                </React.Suspense>

                             } >

                                  <Route path="modern" element={

                                      <React.Suspense fallback={<Loader />}>

                                       <Modern/>

                                      </React.Suspense>

                                  } />

                                  <Route path="booking-slots" element={

                                            <React.Suspense fallback={<Loader />}>

                                            <Booking/>

                                            </React.Suspense>

                                  } />

                                  <Route path="all-bookings" element={

                                          <React.Suspense fallback={<Loader />}>

                                          <AllBooking/>

                                          </React.Suspense>

                                  } />

                                  <Route path="confirmed-bookings" element={

                                          <React.Suspense fallback={<Loader />}>

                                          <ConfirmBooking/>

                                          </React.Suspense>

                                  } />

                                  <Route path="pending-bookings" element={

                                          <React.Suspense fallback={<Loader />}>

                                          <PendingBooking/>

                                          </React.Suspense>

                                  } />

                                  <Route path="profileInfo" element ={

                                          <React.Suspense fallback={<Loader />}>

                                              <ProfileInfo/>

                                          </React.Suspense>


                                  } />

                                  <Route path="logout" element={

                                            <React.Suspense fallback={<Loader />}>

                                            <ULogout/>

                                            </React.Suspense>

                                  } />

                                  <Route path = "*" element = {

                                          <React.Suspense fallback={<Loader />}>

                                               <Notfound/>

                                          </React.Suspense>

                                  } />

                            </Route>

                            

                    </Route>
                    <Route path = "*" element = {

                            <React.Suspense fallback={<Loader />}>

                                <Notfound/>

                            </React.Suspense>



                    } />


                </Routes>


            </Router>
          
          </ThemeProvider>

      </Provider>
      
      
      </>


  );

    return design ;


}

export default App;

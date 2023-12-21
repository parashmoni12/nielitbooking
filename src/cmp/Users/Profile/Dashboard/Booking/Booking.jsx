
import MediaQuery from "react-responsive";
import { Card, Typography, Grid, Button, Switch, FormControlLabel,Fade,Alert} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { TextField,Stack, Modal, Box} from '@mui/material';
import { LoadingButton } from "@mui/lab";

import { StaticDatePicker } from '@mui/x-date-pickers';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { useEffect,useState } from "react";
import { BookingRequest } from "./Booking.action";
import dayjs from 'dayjs';
import "./Booking.css";
import {  useDispatch,useSelector } from "react-redux";



const Booking = ()=>{

    const [selectedDate, setSelectedDate] = useState(null);
    const [time,setTime] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [checked, setChecked] = useState(false);
    const [ successAlert, setsuccessAlert] = useState(false);
    const [ errorAlert, seterrorAlert] = useState(false);
    const [successMessage,setSuccessMessage] = useState('');
    const [errorMessage,setErrorMessage] = useState('');



    const dispatch = useDispatch();
    const {BookingReducer} = useSelector(response=>response);

    useEffect(() => {
      if (BookingReducer && BookingReducer.bookingSuccess) {

       
        setSuccessMessage("Booking Successfull. Wait for confirmation");
        setsuccessAlert(true);
     
       
         
      } else if (BookingReducer && BookingReducer.bookingFailed) {
        
        setErrorMessage("Booking Failed. Please try again!");
        seterrorAlert(true);
      }
    }, [BookingReducer]);

    
    const slots = [
      { id: 1, time: '9:00 AM - 11:00 AM' },
      { id: 2, time: '11:00 AM - 1:00 PM' },
      { id: 3, time: '1:00 AM -  3:00 PM' },
      { id: 4, time: '3:00 PM - 5:00 PM' },
      { id: 5, time: '5:00 PM - 7:00 PM' },
      { id: 6, time: '7:00 PM - 9:00 PM' },
      { id: 7, time: '9:00 PM - 11:00 PM' },
    ];

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs : "220px",
            md  : "400px"
        },
        bgcolor: 'background.paper',
       
        boxShadow: 24,
        p: 4,
      };
  
  


      const Timepicker = ()=>{

        const customTimeOptions = [1, 2, 3, 4, 5, 6, 7];

  const [selectedTime, setSelectedTime] = useState(0);

  const handleCustomTimeChange = (newValue) => {
    const timeRanges = [
      "9-11 AM",
      "11 AM-1 PM",
      "1-3 PM",
      "3-5 PM",
      "5-7 PM",
      "7-9 PM",
      "9-11 PM"
    ];

    const timeRange = timeRanges[newValue - 1];
    sessionStorage.setItem("time", timeRange);

    setSelectedTime(newValue);
  };

  const disabledHours = [8, 9, 10, 11,12,24];
        const design = (<>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticTimePicker          label="Select time"
          displayStaticWrapperAs="desktop"
          value={dayjs().hour(selectedTime).minute(0)}
          onChange={(newValue) => {
            handleCustomTimeChange(newValue.hour()); // Get the hour value
          }}
          renderInput={(params) => <TextField {...params} />}
          shouldDisableTime={(timeValue) =>
            disabledHours.includes(timeValue.hour()) 
          }
          renderOption={(props, option, { selected }) => (
            <li {...props}>{customTimeOptions[option - 1]}</li>
          )}
          views={['hours']}
          ampmInClock={false} // This removes AM/PM from the time picker
          sx={{
            width: {
              xs: "150px",
              md: "400px",
            },
            marginLeft: {
              xs: "-8px",
              md: "",
            },
            marginBottom: "20px",
          }}
        />
      </LocalizationProvider>
        
        </>);

        return design;

      }

      const demo = (selectedDate)=>{

      
        if(selectedDate){
  
          const date = new Date(selectedDate);
                  // Get the day, month, and year components from the Date object
          const day = date.getDate();
          const month = date.getMonth() + 1; 
          
          const year = date.getFullYear();
  
          const formattedDay = day < 10 ? `0${day}` : day;
          const formattedMonth = month < 10 ? `0${month}` : month;
          const formattedYear = year.toString().slice(-2); // Get the last 2 digits of the year
  
          // Combine them in the desired format (dd-mm-yy)
          const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;
  
           sessionStorage.setItem('date',formattedDate);

          //setSelectedDate(formattedDate);
         
  
        }
  
       
  
        
      }

      const handleDateChange = (newValue) => {

        if(newValue && dayjs(newValue).isValid()){
      
            
            demo(newValue); 
        }   
         
        };

        const handleDateChangeTime = (newValues) => {
            
            if (newValues && newValues.isBefore) {
              // Extract the time portion from the newValue (assuming newValue is a Date object)
              const newValue = new Date(newValues);
              const hours = newValue.getHours();
              const minutes = newValue.getMinutes();
              const timeString = `${hours}:${minutes > 9 ? minutes : "0" + minutes} ${
                hours < 12 ? "AM" : "PM"
              }`;
              
        
              sessionStorage.setItem("time",timeString);
              setTime(timeString);
               // Alert the time string
            }

            
    
          };


          const BookingTimeMobile = (

       
            <Grid item xs={11} sx={{zIndex:"100"}} >
 
                             
              <Card sx={{width:"240px",p:5,mt:1,marginLeft:"-70px"}} >
                 <Typography sx={{fontFamily:"Mooli",fontSize:"20px",textAlign:"center"}}> Available slots </Typography>
                 {slots.map((slot) => (
 
                 
                 <Stack key={slot.id} direction="row" sx={{py:2,textAlign:"center",fontSize:"16px",fontFamily:"Poppins"}}>
 
                     <span className="material-icons"  id="timeC">access_time_filled</span><b>Slot {slot.id}</b>: {slot.time}
 
                 </Stack>
 
 
             ))}
             </Card>
             </Grid>
     
       );




          const generateBookingId = () => {

            return Math.floor(10000000 + Math.random() * 90000000);
        
          };

          const hideAlerts = () => {
            setsuccessAlert(false);
            seterrorAlert(false);
          };

          

          useEffect(() => {
            if (successAlert || errorAlert) {
              // Set a timer to hide the alerts after 2 seconds
              const timer = setTimeout(hideAlerts, 2000);
        
              // Clean up the timer when the component unmounts or when the alerts change
              return () => {
                clearTimeout(timer);
              
              };
            }
          }, [successAlert, errorAlert]);

          const login = (e)=>{

            e.preventDefault();

            if(sessionStorage.getItem("date") && sessionStorage.getItem("time")){


              const booking_id = generateBookingId();
              let tmp = sessionStorage.getItem("user");
              let userInfo = JSON.parse(tmp);
              let date = sessionStorage.getItem("date");
              let times = sessionStorage.getItem("time");
            
                
                const data = {
                    bookingId : booking_id,
                    date : date,
                    time : times,
                    uid : userInfo._id,
                    email: userInfo.email
    
                }
    
    
                try{
    
                  dispatch(BookingRequest(data));
    
                  
                
        
                  
                }catch (error) {
                // Handle any errors that occurred during the dispatch
               
                setErrorMessage("An error occurred. Please try again.");
                seterrorAlert(true);
                
              }


            }else{


              seterrorAlert(true);
              setErrorMessage("Please Choose your date and time !");


            }

           
         

           
          }
   
   
   
   
          const design = (

            <>

            <Grid container spacing={4}>


                 <Grid  item xs={12} sm={6} >


                    <Typography sx={{fontFamily: 'Poppins',textAlign:"center",fontSize:"21px",letterSpacing:"3px"}}> Book Your Slots </Typography>


                    <MediaQuery minWidth={1224}>

                            <Card sx={{marginTop:"20px"}}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <StaticDatePicker label="Select a Date" displayStaticWrapperAs='desktop'
                            value={selectedDate}

                            onChange={(newValue)=>{ handleDateChange(newValue);setOpen(true)}}

                            renderInput={(params) => <TextField {...params} />} />

                            </LocalizationProvider>

                            </Card>


                     </MediaQuery>
                     <MediaQuery maxWidth={1224}>

                            


                            <div style={{width:"260px",boxShadow:"0px 0px 6px 0px #ddd", overflowY:'hidden',overflowX:'scroll',marginTop:"30px"}}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <StaticDatePicker label="Select a Date" displayStaticWrapperAs='desktop'
                            value={selectedDate}

                            onChange={(newValue)=>{ handleDateChange(newValue);setOpen(true)}}

                            renderInput={(params) => <TextField {...params} />} />

                            </LocalizationProvider>

                            </div>


                     </MediaQuery>
                 



                  
                 </Grid> 

                 <Grid  item xs={12} sm={6} >
                        
                        

                        <Typography sx={{fontFamily: 'Poppins',textAlign:"center",fontSize:"21px",letterSpacing:"3px"}}> Submit Now </Typography>
                        
                        <Card sx={{paddingTop:"40px",marginTop:"20px"}}>

                        <form onSubmit={login}>

                            
                            
                            <Stack direction="column" spacing={3} justifyContent="center" alignItems="center" >
                                
                              

                            <TextField label="Booking Date" value={sessionStorage.getItem('date')?sessionStorage.getItem('date'):""}  disabled required variant="outlined" 
                                name="date"  sx={{
                                    width: {
                                        sm : "20px",
                                        md  : "70%"
                                    } ,
                                    marginBottom: "20px"
                                    
                                }} />
                               
                                { sessionStorage.getItem("time") ?
                                  <TextField label="Booking Time" value={sessionStorage.getItem("time") || ''} disabled required variant="outlined" 
                                    name="time"  sx={{
                                        width: {
                                            sm : "80%",
                                            md  : "70%"
                                        } ,
                                        marginBottom: "20px"
                                        
                                    }} /> : null }
                                
                                { !sessionStorage.getItem("time")?

                                <TextField label="Booking Time" value={time || ''} disabled required variant="outlined" 
                                    name="time"  sx={{
                                        width: {
                                            sm : "80%",
                                            md  : "70%"
                                        } ,
                                        marginBottom: "20px"
                                        
                                    }} /> :null}
                          
                            
                          </Stack>  
                                
                        <div style={{paddingBottom:"60px"}}>
                         
                             <LoadingButton loading={BookingReducer.isLoading} variant="contained" color="secondary" type="submit" sx={{px:3,pb:1,marginLeft:"90px",marginTop:"60px",letterSpacing:"2px",fontFamily:"Poppins"}} id="login_btn">Book</LoadingButton>
                    
                        </div>
                            
                            </form>   
                            

                        </Card>

                  
                  </Grid> 

            </Grid>
        
           



            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-titles" variant="h6" component="h2">
                        Choose Your Slot from 1 - 7
                    </Typography>
                                
                    <div id="timepicker">
                    <Timepicker />

                   
                   
                      

                    </div>
                   
                  
                </Box>
           </Modal>




           <section style={{height:"500px"}}>

                      <MediaQuery minWidth={1224}>

                        <Grid container>

             


            <Grid item md={12}>

                <img src="../images/plane.png" id="plane" style={{marginTop:"10px"}}/>
                    <Card sx={{width:"280px",height:"255px",marginTop:"60px",p:5,marginLeft:"700px",overflowY:"scroll"}} >
                        <Typography sx={{fontFamily:"Mooli",fontSize:"20px",textAlign:"center"}}> Available slots </Typography>
                        {slots.map((slot) => (
                    
                        
                        <Stack key={slot.id} direction="row" sx={{py:2,textAlign:"center",fontSize:"16px",fontFamily:"Poppins"}}>

                            <span className="material-icons"  id="timeC">access_time_filled</span><b>Slot {slot.id}</b>: {slot.time}
                    
                        </Stack>
                    
                            
                            
                    
                    
                
                ))}
                </Card>
            </Grid>

                        </Grid>

                      </MediaQuery>

                      <MediaQuery maxWidth={1224}>

                    <Grid container>
                
                        <Grid item xs={12}>


                                <Box sx={{ height: 180 , mt:3,ml:8}}>
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show Booking Slots"
                                        />
                                        <Box sx={{ display: 'flex' }}>
                                            <Fade in={checked}>{BookingTimeMobile}</Fade>
                                        </Box>
                                </Box>



                        </Grid>
                        
                      



                        </Grid>


                      </MediaQuery>

          </section>
        
            
          {
        
        successAlert?<Stack sx={{ 

            width: {
                xs : '80%',
                md :  '30%'
            },
           top: {

                xs : "100px",
                md : "650px"
            },
            marginLeft : {

                xs : "-250px",
                md : "-20px"
            }
            ,
            position:"absolute"


        }} spacing={2} >

        <Alert severity="success">{successMessage}</Alert>

        </Stack> : null

    }

    {

errorAlert?<Stack sx={{ 

          width: {
            xs : '80%',
            md :  '30%'
        },
       top: {

            xs : "1030px",
            md : "650px"
        },
        left :{

          xs : "30px",
          md : "260px"

        },
        position:"absolute"

        }} spacing={2} >

        <Alert severity="error">{errorMessage}</Alert>

        </Stack> : null

    }


        </>


    );

    return design;
}

export default  Booking;
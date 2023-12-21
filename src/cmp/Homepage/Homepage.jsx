
import Navbar from "./Navbar/Navbar";
import Footer from "../Footer/Footer";

import { Grid, Stack, Typography,Button ,TextField, Modal, Card, Divider,CardContent,Box,Switch,FormControlLabel,Fade,Paper} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MediaQuery from "react-responsive";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import { green, pink, cyan,blue } from '@mui/material/colors';
import { useSelector,useDispatch } from "react-redux";

import { countUser, countPending, countTotal} from "./Homepage.action";

import Cookies from "universal-cookie";

import "./Homepage.css";

const Homepage = ()=>{

    const { HomepageReducer } = useSelector(response=>response);
    const [selectedDate, setSelectedDate] = useState(null);
    const [time,setTime] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [testing,setTesting] = useState(null);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const cookie = new Cookies();


    const handleChange = () => {
        setChecked((prev) => !prev);
      };
      

    const clearRecord = ()=>{

        if(cookie.get("sukdldtojken")){

            cookie.remove("sukdldtojken");

        }
        if(sessionStorage.getItem("user")){

            sessionStorage.removeItem("user");

        }
        

    }

    useEffect(()=>{

        clearRecord();

    },[testing]);



    const countUsers = ()=>{

          dispatch(countUser());

    }

    const countPendings = ()=>{

      dispatch(countPending());

    }

    const countTotals = ()=>{

        dispatch(countTotal());


    }

    useEffect(()=>{

        const fetchData = async ()=>{
  
            await countPendings();
            
            await countTotals();
         }
         fetchData();


         countUsers();
       

    },[testing]);


    const slots = [
        { id: 1, time: '9:00 AM - 11:00 AM' },
        { id: 2, time: '11:00 AM - 1:00 PM' },
        { id: 3, time: '1:00 AM -  3:00 PM' },
        { id: 4, time: '3:00 PM - 5:00 PM' },
        { id: 5, time: '5:00 PM - 7:00 PM' },
        { id: 6, time: '7:00 PM - 9:00 PM' },
        { id: 7, time: '9:00 PM - 11:00 PM' },
      ];


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
  

    const handleDateChange = (newValue) => {

        if(newValue && dayjs(newValue).isValid()){
      
            
            demo(newValue); 
        }   
         
    };

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
    

   const handleDateChangeTime = (newValues) => {
            
            if (newValues && newValues.isBefore) {
              // Extract the time portion from the newValue (assuming newValue is a Date object)
              const newValue = new Date(newValues);
              const hours = newValue.getHours();
              const minutes = newValue.getMinutes();
              const timeString = `${hours}:${minutes > 9 ? minutes : "0" + minutes} ${
                hours < 12 ? "AM" : "PM"
              }`;
              
              
              sessionStorage.setItem('time',timeString);
              setTime(timeString);
               // Alert the time string
            }

            
    
  };


        



    const design = (

        <>

           
            <div className="main-container">



                <Navbar />

                <Grid container>

                        <Grid item xs={12} sm={6} sx={{padding:
                            { md: "100px",
                            xs : "20px"
                            }
                            
                            }}>
                            
                            <Stack direction="column">
                                
                                <Typography id="iot"> IoT and Robotics <span style={{color:"#5B0888"}}>Laboratory</span></Typography>
                                <Typography id="iot_sub" > All facility are available . 24/7 Support</Typography>

                                <div>
                                <Button variant="contained" sx={{boxShadow: "0px 2px 8px rgba(0,0,0,0.20)",marginTop:"50px"}} id="book_now" component={Link} to="/login"> Book Now </Button>
                                </div>

                            </Stack>

                        </Grid>

                        <Grid item xs={12} sm={6}>


                        <MediaQuery minWidth={1224}>
                    
                            <Typography sx={{marginTop:"40px",fontFamily: 'Poppins',marginLeft:"185px",fontSize:"22px",letterSpacing:"3px"}}> Book Your Slots </Typography>
                                

                                        <Card  sx={{marginTop:"50px",width:"430px", left:"55%",position:"absolute",zIndex:"100px"}} id="cardIn" >

                                        <LocalizationProvider dateAdapter={AdapterDayjs} >

                                        <StaticDatePicker label="Select a Date" displayStaticWrapperAs='desktop'
                                        value={selectedDate} 

                                        onChange={(newValue)=>{ handleDateChange(newValue);setOpen(true)}}

                                        renderInput={(params) => <TextField {...params} />} />

                                        </LocalizationProvider>

                                        </Card>


                        </MediaQuery>
                        <MediaQuery maxWidth={1224}>

                                
                        <Typography sx={{marginTop:"60px",marginLeft:"80px",fontFamily: 'Poppins',fontSize:"20px",letterSpacing:"3px"}}> Book Your Slots </Typography>

                                <Card sx={{marginTop:"50px",width:"273px", left:"8%",position:"absolute", overflowX:"scroll",}}>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <StaticDatePicker label="Select a Date" displayStaticWrapperAs='desktop'
                                value={selectedDate}

                                onChange={(newValue)=>{ handleDateChange(newValue);setOpen(true)}}

                                renderInput={(params) => <TextField {...params} />} />

                                </LocalizationProvider>

                                </Card>


                        </MediaQuery>
                        
                    </Grid>


                </Grid>            
               

            </div>
           
            <section style={{height:"700px"}}>

                <MediaQuery minWidth={1224}>
                
                    <Grid container>

                            <Grid item md={6}>
                            
                                <img src="./images/iot.png" id="iot-image"/>

                                <Card sx={{width:"280px",p:5}} id="slot-card-2">

                                    <Typography sx={{fontFamily:"Poppins",fontSize:"22px",letterSpacing:"5px"}}> Our Achivements</Typography>
                                    
                                    <Card sx={{width:"300px",height:"120px",mt:4}}>

                                        <CardContent>
                                            
                                            <Grid container alignItems="center">

                                                <Grid item>
                                                        <Avatar sx={{ bgcolor: green[500] }}>
                                                        <span className="material-icons">account_circle </span>
                                                        </Avatar>
                                                </Grid>
                                                <Grid item> <Typography sx={{fontFamily:"Mooli",ml:1}}> Total Users </Typography></Grid>

                                            </Grid>
                                        

                                                
                                                    <Avatar sx={{ bgcolor: green[400], marginLeft:"220px",marginTop:"15px"}}>{HomepageReducer && HomepageReducer.countSuccess? HomepageReducer.data : 0}</Avatar>
                                                    
                                        

                                        </CardContent>

                                    </Card>
                                    
                                    <Card sx={{width:"300px",height:"120px",mt:6, ml:14}}>

                                        <CardContent>
                                            
                                            <Grid container alignItems="center">

                                                <Grid item>
                                                        <Avatar sx={{ bgcolor: cyan[500] }}>
                                                        <span className="material-icons">account_circle </span>
                                                        </Avatar>
                                                </Grid>
                                                <Grid item> <Typography sx={{fontFamily:"Mooli",ml:1}}> Total Booking</Typography></Grid>

                                            </Grid>
                                        

                                                
                                                    <Avatar sx={{ bgcolor: cyan[400], marginLeft:"220px",marginTop:"15px"}}>{HomepageReducer && HomepageReducer.countTotalSuccess ? HomepageReducer.totalData :0}</Avatar>
                                                    
                                        

                                        </CardContent>

                                    </Card>

                                    <Card sx={{width:"300px",height:"120px",mt:6}}>

                                        <CardContent>
                                            
                                            <Grid container alignItems="center">

                                                <Grid item>
                                                        <Avatar sx={{ bgcolor: pink[500] }}>
                                                        <span className="material-icons">account_circle </span>
                                                        </Avatar>
                                                </Grid>
                                                <Grid item> <Typography sx={{fontFamily:"Mooli",ml:1}}> Pending Booking</Typography></Grid>

                                            </Grid>
                                        

                                                
                                                    <Avatar sx={{ bgcolor: pink[400], marginLeft:"220px",marginTop:"15px"}}>{HomepageReducer && HomepageReducer.countPendingSuccess ? HomepageReducer.pendingData:0}</Avatar>
                                                    
                                        

                                        </CardContent>

                                    </Card>

                                </Card>

                            </Grid>


                            <Grid item md={6}>

                                <img src="./images/plane.png" id="plane" style={{marginTop:"20px",marginLeft:"99px",borderTopRightRadius:"8900px",borderBottomRightRadius:"8200px"}}/>
                                    <Card sx={{width:"280px",p:5}} id="slot-card">
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


                                    <Box sx={{ height: 180 , mt:24,ml:8}}>
                                            <FormControlLabel
                                                control={<Switch checked={checked} onChange={handleChange} />}
                                                label="Show Booking Slots"
                                            />
                                            <Box sx={{ display: 'flex' }}>
                                                <Fade in={checked}>{BookingTimeMobile}</Fade>
                                            </Box>
                                    </Box>



                            </Grid>
                            
                            <Grid item xs={12} sx={{overflow:"hidden"}}>
                                    <img src="./images/iot.png" style={{width:"600px",height:"520px"}}/>
                                    <Card sx={{width:"200px",height:"440px",p:5,backgroundColor:"white",top:"930px",position:"absolute",ml:3}}>

                                            <Typography sx={{fontFamily:"Poppins",fontSize:"18px",textAlign:"center",letterSpacing:"2px"}}> Our Achivements</Typography>

                                            <Card sx={{width:"210px",height:"110px",mt:4,ml:-4}}>

                                                <CardContent>
                                                    
                                                    <Grid container alignItems="center">

                                                        <Grid item>
                                                                <Avatar sx={{ bgcolor: green[500] }}>
                                                                <span className="material-icons">account_circle </span>
                                                                </Avatar>
                                                        </Grid>
                                                        <Grid item> <Typography sx={{fontFamily:"Mooli",ml:1}}> Total Users </Typography></Grid>

                                                    </Grid>
                                                

                                                        
                                                            <Avatar sx={{ bgcolor: green[400],marginLeft:"140px",marginTop:"6px"}}>{HomepageReducer && HomepageReducer.countSuccess? HomepageReducer.data : 0}</Avatar>
                                                            
                                                

                                                </CardContent>

                                            </Card>

                                            <Card sx={{width:"210px",height:"110px",mt:4, ml:3}}>

                                                <CardContent>
                                                    
                                                    <Grid container alignItems="center">

                                                        <Grid item>
                                                                <Avatar sx={{ bgcolor: cyan[500] }}>
                                                                <span className="material-icons">account_circle </span>
                                                                </Avatar>
                                                        </Grid>
                                                        <Grid item> <Typography sx={{fontFamily:"Mooli",ml:1}}> Total Booking</Typography></Grid>

                                                    </Grid>
                                                

                                                        
                                                            <Avatar sx={{ bgcolor: cyan[400],marginLeft:"140px",marginTop:"6px"}}>{HomepageReducer && HomepageReducer.countTotalSuccess ? HomepageReducer.totalData :0}</Avatar>
                                                            
                                                

                                                </CardContent>

                                            </Card>

                                            <Card sx={{width:"210px",height:"110px",mt:3,ml:-4}}>

                                                <CardContent>
                                                    
                                                    <Grid container alignItems="center">

                                                        <Grid item>
                                                                <Avatar sx={{ bgcolor: pink[500] }}>
                                                                <span className="material-icons">account_circle </span>
                                                                </Avatar>
                                                        </Grid>
                                                        <Grid item> <Typography sx={{fontFamily:"Mooli",ml:1}}> Pending Booking</Typography></Grid>

                                                    </Grid>
                                                

                                                        
                                                            <Avatar sx={{ bgcolor: pink[400],marginLeft:"140px",marginTop:"6px"}}>{HomepageReducer && HomepageReducer.countPendingSuccess ? HomepageReducer.pendingData:0}</Avatar>
                                                            
                                                

                                                </CardContent>

                                            </Card>

                                    </Card>
                            </Grid>




                    </Grid>


               </MediaQuery>

            </section>


         
                        
                 <Footer />
          
                 <Divider sx={{width:"100%"}} />
                 <Typography sx={{textAlign:"center",fontFamily:"Poppins",letterSpacing:{xs :"1px",md:"3px"},fontSize:{xs:"13px",md:"14px"},marginLeft:"16px",marginBottom:"20px",marginTop:"20px"}}>Copyright © NIELIT. All Rights Reserved</Typography>

         
           

         


             



            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography sx={{fontFamily:"Poppins",textAlign:"center"}} id="modal-modal-title" variant="h6" component="h2">
                        Choose Your Slot From 1 - 7
                    </Typography>
                                
                    <div id="timepicker">
                    <Timepicker />

                   
                   
                    <Button sx={{
                        
                        marginLeft: {
                            xs : "110px",
                            md : "160px"
                        },
                        p:1

                    }} variant="contained" component={Link} to="/login">Book Now</Button>

                    </div>
                   
                  
                </Box>
           </Modal>
        </>


    );


    return design;
}

export default Homepage;
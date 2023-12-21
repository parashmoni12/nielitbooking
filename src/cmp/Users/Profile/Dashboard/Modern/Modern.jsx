import Pending from "./Pending/Pending";
import  Total from "./Total/Total";
import MediaQuery from "react-responsive";
import { Card, CardContent, Typography, CardActions, Grid, Button, CardMedia, colors,Avatar} from "@mui/material";
import Today from "./Today/Today";
import {  cyan } from '@mui/material/colors';
import { Link } from "react-router-dom";
import Confirm from "./Confirmed/Confirmed";

const Modern = ()=>{

    const design = (

        <>

            <Grid container spacing={{xs:1,md:4}}>


                    <Pending />

                     <Total />

              
                     <Confirm />

                    <MediaQuery maxWidth={1224}>

                    <Button  variant="contained" component={Link} to="/profile/booking-slots"   style={{boxShadow:"0px 0px 12px white",marginTop:"20px",marginLeft:"100px",height:"40px"}}> Book <span className="material-icons" style={{marginLeft:"10px"}}>arrow_circle_right</span></Button>

                    </MediaQuery>

                     

                       

                   

            </Grid>

          


                <Typography sx={{fontFamily:"Poppins",letterSpacing:"5px",fontSize:"22px",marginTop:"50px",marginBottom:{xs:"5px",md:"40px"}}}>Today Booking : </Typography>
                <Today />

               
          
           

        
        </>


    );

    return design;
}

export default  Modern;
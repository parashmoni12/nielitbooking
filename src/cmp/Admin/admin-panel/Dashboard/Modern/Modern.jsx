import Pending from "./Pending/Pending";

import User from "./Users/User";

import Total from "./Total/Total";

import Today from "./Today/Today";

import { Card, CardContent, Typography, CardActions, Grid, Button, CardMedia, colors} from "@mui/material";


const Modern = ()=>{

    const design = (

        <>

            <Grid container spacing={4}>


                 <Pending />
                
                 <Total />
                

                <User />
                

            </Grid>

        

            <Typography sx={{fontFamily:"Poppins",letterSpacing:"5px",fontSize:"22px",marginTop:"50px",marginBottom:{xs:"5px",md:"40px"}}}>Today Booking : </Typography>
                    <Today />


         
         
           

        
        </>


    );

    return design;
}

export default  Modern;
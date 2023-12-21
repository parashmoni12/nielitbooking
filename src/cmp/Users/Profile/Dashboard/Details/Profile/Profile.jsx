import React from 'react';
import "./Profile.css";



import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import MediaQuery from 'react-responsive';


const serverUrl = 'http://localhost:8080';


const Cards = ()=>{

    const [user,setUser] = useState(null);


    const showUserInfo = ()=>{
        if(!user)
        {
          let tmp = sessionStorage.getItem("user");
          let userInfo = JSON.parse(tmp);
          return setUser(userInfo);
        }
      }



      useEffect(()=>{
        
        showUserInfo(); 
       
           
        
        
      },[user]);


    const design = (

        <>

                 { user  ? (
                                            
                                            <Card sx={{width:{sx:"200px",md:"370px"},height:"420px",marginLeft:{sx:"50px",md:"400px"},marginTop:"50px",position:"relative"}}>

                                                <CardContent>

                                                        <center> <Avatar alt="Profile-pic" src={serverUrl + "/" + user.image} sx={{width:"150px",height:"150px"}} /></center>

                                                          
                                                                
                                                            <Stack direction="row" sx={{p:3,marginLeft:{xs:"-40px",md:"-90px"} }} alignItems="center" justifyContent="center" >
                                                                <div style={{width:"40px",height:"40px",borderRadius:"100%",backgroundColor:"#EAF8FF",border:"none",marginRight:"10px"}}><Button><span className="material-icons" style={{marginLeft:"-24px",marginTop:"2px"}}>account_circle</span></Button></div>
                                                                <Typography>{user.fullname}</Typography>
                                                           </Stack>

                                                           <Grid container sx={{p:3,marginLeft:{xs:"-60px",md:"-90px"},marginTop:"-30px"}} alignItems="center" justifyContent="center" >
                                                                
                                                                <Grid item >

                                                                    <div style={{width:"40px",height:"40px",borderRadius:"100%",backgroundColor:"#E9FFC4",border:"none",marginRight:"10px"}}><Button><span className="material-icons" style={{marginLeft:"-24px",marginTop:"2px",color:"#65F224"}}>phone</span></Button></div>

                                                                </Grid>

                                                                <Grid item>

                                                                   <Typography>{user.mobile}</Typography>

                                                                </Grid>
                                                                
                                                                
                                                           </Grid>

                                                           <Grid container sx={{p:3,marginLeft:"-90px",marginTop:"-30px"}} alignItems="center" justifyContent="center" >

                                                           <MediaQuery minWidth={1224}>

                                                                <div style={{width:"300px",height:"40px",left:"6px",top:"300px",position:"absolute",overflow:"hidden"}}>
                                                                
                                                     

                                                                            <Stack direction="row">

                                                                                    <div style={{width:"40px",height:"40px",borderRadius:"100%",backgroundColor:"#EAF8FF",border:"none",marginLeft:"18px",marginRight:"10px"}}><Button><span className="material-icons" style={{marginLeft:"-24px",marginTop:"2px"}}>email</span></Button>
                                                                                    </div>

                                                                                    <div style={{marginTop:"6px"}}>
                                                                                        {user.email}
                                                                                    </div>
                                                                            </Stack>


                                                                    
                                                                    
                                                                </div>

                                                            </MediaQuery>
                                                            <MediaQuery maxWidth={1224}>

                                                                        <div style={{width:"278px",height:"40px",left:"-14px",top:"300px",position:"absolute",overflow:"hidden"}}>


                                                                        <Stack direction="row">

                                                                                <div style={{width:"40px",height:"40px",borderRadius:"100%",backgroundColor:"#EAF8FF",border:"none",marginLeft:"18px",marginRight:"10px"}}><Button><span className="material-icons" style={{marginLeft:"-24px",marginTop:"2px"}}>email</span></Button>
                                                                                </div>

                                                                                <div style={{marginTop:"6px"}}>
                                                                                    {user.email}
                                                                                </div>
                                                                        </Stack>
                                                                                    

                                                                            
                                                                            
                                                                        </div>

                                                            </MediaQuery>
                    

                                                               

                                                                
                                                                
                                                                
                                                           </Grid>


                                                     </CardContent>

                                                  </Card>

                                        ) : null}
           
        
        
        
        
        </>
    );   

    return design;


}

export default Cards;



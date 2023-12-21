import { Grid, Stack, Typography,Button ,TextField, Modal, Box ,Card} from "@mui/material";
import MediaQuery from "react-responsive";
import "./Footer.css";

const Footer =  ()=>{

    const design = (<>
    
        <MediaQuery minWidth={1224}>
                <div style={{paddingLeft:"180px"}}>

                    <Grid container>

                    

                        <Grid item md={3} sx={{p:4}}>

                        

                            <Stack direction="column">
                            <img src="./images/nielit.png"  style={{width:"200px",height:"80px"}}/>
                            

                            <Stack direction="row" sx={{p:3}} >
                                    <div style={{width:"40px",height:"40px",borderRadius:"100%",backgroundColor:"#EAF8FF",border:"none",marginRight:"30px"}}><Button><span className="material-icons" style={{marginLeft:"-24px",marginTop:"2px"}}>facebook</span></Button></div>
                                    <div style={{width:"40px",height:"40px",borderRadius:"100%",backgroundColor:"#EAF8FF",border:"none",marginRight:"30px"}}><Button><span className="material-icons" style={{marginLeft:"-24px",marginTop:"2px"}}>mail</span></Button></div>
                            </Stack>
                            </Stack>

                    

                        </Grid>

                        <Grid item md={3} sx={{p:4,pl:8}}>

                                    <Stack direction="row">
                                    
                                    <span className="material-icons">place</span>
                                    <Typography sx={{fontFamily:"Poppins",fontSize:"20px", fontWeight:"bold",letterSpacing:"3px"}}>ADDRESS : </Typography>


                                    </Stack>
                            
                                    
                                    <p className="address">1st & 2nd Floor, Vittiya Bhavan,</p>
                                    <p className="address">AFC Building, Md. Shah Road</p>
                                    <p className="address">Paltan Bazar, Guwahati - 781008, ASSAM</p>
                                
                        </Grid>

                        <Grid item md={3} sx={{p:4,ml:10}}>

                        
                                    
                
                                    <Typography sx={{fontFamily:"Poppins",fontSize:"20px", fontWeight:"bold",letterSpacing:"3px"}}>Contacts : </Typography>


                                
                            
                                    <Stack direction="row">
                                        <span className="material-icons" style={{marginTop:"10px",marginRight:"20px"}}>call</span>  <p className="address">Phone : 0361-2730269</p>


                                    </Stack>
                                    <Stack direction="row">
                                        <span className="material-icons" style={{marginTop:"10px",marginRight:"20px"}}>mail</span>  <p className="address">Email : pbtech@gmail.com</p>


                                    </Stack>
                                    
                                    
                                
                        </Grid>

                    

                        

                    </Grid>

               </div>

        </MediaQuery>
        <MediaQuery maxWidth={1224}>


            <div>

                <Grid container sx={{mt:25}}>

                    <Grid item xs={12} sx={{ml:8}}>

                        

                            <Stack direction="column">
                
                                <Typography sx={{fontFamily:"Mooli",fontSize:"21px",ml:3,letterSpacing:"5px",}}> Follow Us </Typography>

                                    <Stack direction="row" sx={{p:3}} >
                                            <div style={{width:"40px",height:"40px",borderRadius:"100%",backgroundColor:"#EAF8FF",border:"none",marginRight:"30px"}}><Button><span className="material-icons" style={{marginLeft:"-24px",marginTop:"2px"}}>facebook</span></Button></div>
                                            <div style={{width:"40px",height:"40px",borderRadius:"100%",backgroundColor:"#EAF8FF",border:"none",marginRight:"30px"}}><Button><span className="material-icons" style={{marginLeft:"-24px",marginTop:"2px"}}>mail</span></Button></div>
                                    </Stack>
                            </Stack>



                    </Grid>

                    <Grid item xs={12} sx={{mt:3,ml:3}} >

                                    <Stack direction="row">
                                    
                                    <span className="material-icons place" >place</span>
                                    <Typography sx={{ml:1,fontFamily:"Mooli",fontSize:"21px",letterSpacing:"3px"}}>Address : </Typography>


                                    </Stack>
                            
                                 
                                    <p className="address">1st & 2nd Floor, Vittiya Bhavan,</p>
                                    <p className="address">AFC Building, Md. Shah Road</p>
                                    <p className="address">Paltan Bazar, Guwahati - 781008</p>
                                   
                    </Grid>


                    <Grid item xs={12} sx={{mt:3,ml:6}}>

                        <Typography sx={{fontFamily:"Poppins",fontSize:"20px",letterSpacing:"3px"}}>Contacts : </Typography>

                        <Stack direction="row">
                            <span className="material-icons" style={{marginTop:"10px",marginRight:"10px",color:"blue"}}>call</span>  <p className="address">Phone : 0361-2730269</p>


                        </Stack>
                        <Stack direction="row">
                            <span className="material-icons" style={{marginTop:"10px",marginRight:"10px",color:"blue"}}>mail</span>  <p className="address">Email : pbtech@gmail.com</p>


                        </Stack>



                    </Grid>


                </Grid>

            </div>

        </MediaQuery>
    
    </>);

    return design;
}


export default Footer;
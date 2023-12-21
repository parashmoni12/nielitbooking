import {

    Grid,
    Stack,
    Button,
    TextField,
    Typography
 

} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import MediaQuery from "react-responsive";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { requestForgot ,changePassword} from "./Forgot.action";

import { useSelector,useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import "./Footer.css";

const Forgot = ()=>{


    const navigate  = useNavigate();

        const [input,setInput] = useState({

            email : "",
            code : "",
            password : ""

        });


        const handleInput = (e)=>{

            const input = e.target;
            const key = input.name;
            const value =input.value;

            return setInput((oldData)=>{

                return {
                    ...oldData,
                    [key]: value

                }

            });


        }


        const [error,setError] = useState({

            username : {
                state:false,
                message : ""
            },
            code : {

                state:false,
                message : ""
            }


        });
        const dispatch =  useDispatch();
        const {ForgotReducer} = useSelector(response=>response);
        const [verifyForm, setVerifyForm] = useState(false);


        const checkUser = ()=>{

            if(ForgotReducer.success){

                return setVerifyForm(true);
                
            }
            if(ForgotReducer.userNotFound){

                return setError((oldData)=>{

                    return {

                        ...oldData,
                        username : {
                            state : true,
                            message: "Username is not found !"
                        }

                    }

                });

            }


        }


    const checkForNewPassword = ()=>{

        if(ForgotReducer.passwordChange){

            return navigate("/login");

        }   
        if(ForgotReducer.invalidCode){

            return setError((oldData)=>{

                return {

                    ...oldData,
                    code:{
                        state : true,
                        message: "Invalid Code"
                    }


                }


            });

        }

    }


        useEffect(()=>{

            checkUser();
            checkForNewPassword();

        },[ForgotReducer]);

    const design = (

        <>

<Grid container >

                <Grid item sm={6} xs={12} sx={{ padding : { md:10,xs:0} }}> 

                    <MediaQuery maxWidth={1224}>

                        <img src="images/signup_user.png"   width="90%"/>

                    </MediaQuery>
                    <MediaQuery minWidth={1224}>

                        <img src="images/signup_user.png" width="80%" />

                    </MediaQuery>

                    

                </Grid>

                <Grid item sm={6} xs={12} sx={{ padding : { md:4,xs:3} }}> 

                
                <Typography variant="h6" sx={{
                            ml:{
                                md : 0,
                                xs:"28px"
                                },
                            mt:{
                                md:"30px"
                            },
                            mb:"30px",
                            fontWeight:"bold",
                            letterSpacing:{
                                md:"8px",
                                xs : "6px"
                            },
                            fontSize :  {
                                xs : "18px",
                                md : "25px"
                            },
                           
                                textTransform : "uppercase",

                                textAlign : {
                                    xs : "center",
                                    md : "left"

                                }
                            
                        
                            }}>

                        Forgot Password

                 </Typography>

                    {
                    
                    !verifyForm ?

                        <form onSubmit ={ (e)=>dispatch(requestForgot(e))}>

                            <Stack direction="column">

                            <TextField name="email" onChange={handleInput} value={input.email} error={error.username.state} helperText={error.username.message} label="Email" variant="outlined" sx={{mb:3,

                                width:{
                                
                                    md: "400px",
                                    xs: "280px"

                                },
                                
                            
                            }}/>
                            
                            <div>
                                <LoadingButton loading={ForgotReducer.isLoading} type="submit"
                                 sx={{  width:{
                                        md :"150px",
                                        xs : "90px"
                                        },
                                        height : {

                                            md : "50px",
                                            xs: "40px"

                                        },
                                        fontWeight: "bold",
                                        color : "white"
                                    }} variant="contained" color="secondary" > SUBMIT </LoadingButton>
                            </div>

                            </Stack>

                        </form>
                        :
                        <form onSubmit={(e)=>dispatch(changePassword(e,input))}>

                            <Stack direction="column">

                            <TextField name="code" error={error.code.state} helperText={error.code.message} onChange={handleInput} value={input.code} label="Verificaton Code" type="number" variant="outlined" sx={{mb:3,

                                width:{
                                
                                    md: "400px",
                                    xs: "280px"

                                },
                                
                            
                            }}/>

                            <TextField name="password" onChange={handleInput} value={input.password} label="New Password" type="password" variant="outlined" sx={{mb:3,

                            width:{

                                md: "400px",
                                xs: "280px"

                            },


                            }}/>
                                                        
                            <div>
                                <LoadingButton type="submit"
                                 sx={{  width:{
                                        md :"150px",
                                        xs : "90px"
                                        },
                                        height : {

                                            md : "50px",
                                            xs: "40px"

                                        },
                                        fontWeight: "bold",
                                        color : "white"
                                    }} variant="contained" color="secondary" loading={ForgotReducer.isLoading} > SUBMIT </LoadingButton>
                            </div>

                            </Stack>

                        </form>

                    }

                            
                            <Button sx={{mt:5}} component={Link} to="/login">
                      
                                        <span className="material-icons">arrow_back</span>  
                                          Back
                           </Button>

                </Grid>




 </Grid>
        






        </>



    );

    return design;


}


export default Forgot;
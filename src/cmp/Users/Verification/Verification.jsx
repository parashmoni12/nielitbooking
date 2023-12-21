import { Navigate, useNavigate,Link} from "react-router-dom";


import {
        Box , Card, CardContent,
        FormControl,
        Stack,TextField,
        Alert,
        Button
    } from "@mui/material";



import { useState, useEffect } from "react";


import useHttp from "../../../hooks/useHttp";

import { useDispatch, useSelector } from "react-redux";

import { LoadingButton } from "@mui/lab";

import Cookies from "universal-cookie";

import * as yup from "yup";




import { loginRequest,sendMail} from "./Verification.action";

const VerificationMail = ()=>{

    const cookie = new Cookies();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {OtpReducer} = useSelector(response=>response);

    const [testing,setTesting] = useState(null);


    const [disabled,setDisabled] = useState(true);

    const [ successAlert, setsuccessAlert] = useState(false);
    const [ errorAlert, seterrorAlert] = useState(false);
    const [successMessage,setSuccessMessage] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const [showBtn, setShowBtn] = useState(false);

    const [input, setInput] = useState({

        otp : ""
       

    });

    const [error,setError] = useState({
        otp: {
          state: false,
          message: ""
        }
    });

    const schema = yup.object().shape({
        
        otp: yup.string().required()

    });

    const validSubmit = async ()=>{

            const isValid = await schema.isValid(input);

            return setDisabled(!isValid);

    }


    const handleInput  = (e)=>{

            const input = e.target;
            const value = input.value;
            const key = input.name;

            return setInput((oldData)=>{
                
                return {

                    ...oldData,
                    [key] : value

                }

            });

    }


    const validateInput = async (e)=>{
        const key = e.target.name;
        try {
          await schema.validateAt(key,input);
          return setError((oldData)=>{
            return {
              ...oldData,
              [key]: {
                state: false,
                message: ""
              }
            }
          });
        }
        catch(err)
        {
          let message = err.errors[0];
          return setError((oldData)=>{
            return {
              ...oldData,
              [key]: {
                state: true,
                message: message
              }
            }
          });
        }
    }
    

    useEffect(() => {
      if (OtpReducer && OtpReducer.vSuccess) {
        
        setSuccessMessage("Verification Successful, Try to login");
        setsuccessAlert(true);
        // Navigate here if login is successful
        const userData = sessionStorage.getItem("user");
        const mainData = JSON.parse(userData);
        mainData["emailVerified"] = true;
        if(sessionStorage.getItem("user")){

          cookie.remove("sukdldtojken");
          sessionStorage.removeItem("user");
          //sessionStorage.setItem("user",JSON.stringify(mainData));
          
          setTimeout(() => {
            window.open("http://localhost:3000/login");
          }, 3000);
          
          

        }

     
       
         
      } else if (OtpReducer && OtpReducer.vFailed) {
        
        setErrorMessage("Invalid OTP!");
        seterrorAlert(true);
      }
    }, [OtpReducer]);


    const login = async (e)=>{

        e.preventDefault();   

        let tmp = sessionStorage.getItem("user");
        let userInfo = JSON.parse(tmp);
        input["email"] = userInfo.email;
        input["id"] = userInfo._id;

        try {
             dispatch(loginRequest(input));
  
        
            setTimeout(() => {
              setsuccessAlert(false);
              seterrorAlert(false);
            }, 2000);
          } catch (error) {
            // Handle any errors that occurred during the dispatch
 
            setErrorMessage("An error occurred. Please try again.");
            seterrorAlert(true);
          }



    }

    const checkEmailVerification = ()=>{

        let tmp = sessionStorage.getItem("user");
        let userInfo = JSON.parse(tmp);
      
        
        dispatch(sendMail(userInfo));

    }

   
    useEffect(()=>{
        checkEmailVerification();
    },[testing]);

   
    const design = (
        <>
        


       
          <div id="verification_box">
              <Box sx={{ maxWidth: 375 }}>
                <Card variant="outline">

                    <CardContent>

                    <center>
                        <span className="material-icons" style={{color:"#1DE9B6",fontSize:"40px"}}>mail</span>  
                        <h1 className="display-3" sx={{fontSize:"40px"}}>Verification Required !</h1>
                        <p style={{marginBottom:"20px",color:"red"}}> Hi ! one otp is send to mail</p>
                        <form onSubmit={login}>

                            
                                    <TextField  label = "Enter OTP" variant="outlined" error={error.otp.state} helperText={error.otp.message}
                                    name="otp" value={input.otp} style={{width:"100%",marginBottom:"20px"}}
                                    onChange={handleInput}
                                    onKeyDown={validSubmit}
                                    onInput={validateInput}
                                    onBlur={validateInput}
                                    />


    
   

    
  

    <Stack direction="row" justifyContent="space-between" alignItems="center">

      
        
        <LoadingButton loading={OtpReducer.isLoadingV} disabled={disabled} variant="contained" color="secondary" type="submit" sx={{px:3,py:1}} id="login_btn">  Verify</LoadingButton>


    </Stack>

    
                        </form>  
                        

                      
                    </center>

                    </CardContent>


                    </Card>
                </Box>  
            </div>
              
           
            {
        
        successAlert?<Stack sx={{ 

            width: {
                xs : '80%',
                md :  '30%'
            },
            marginTop: {

                xs : "500px",
                md : "500px"
            },
            marginLeft : {

                xs : "50px",
                md : "620px"
            }


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
            marginTop: {

                xs : "500px",
                md : "500px"
            },
            marginLeft : {

                xs : "50px",
                md : "620px"
            }
            

        }} spacing={2} >

        <Alert severity="error">{errorMessage}</Alert>

        </Stack> : null

    }
        
         


        </>
    );


   return design;
}

export default VerificationMail;
import {
  Button,
  Typography,
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Stack, Box

} from "@mui/material";

import { LoadingButton } from "@mui/lab";


import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import MediaQuery from "react-responsive";
import "./Signup.css";
import { CheckBox } from "@mui/icons-material";
import { useState , useEffect} from "react";
import userEvent from "@testing-library/user-event";
import useHttp from "../../../hooks/useHttp";
import SweetAlert from 'react-bootstrap-sweetalert';

import { CloudUpload } from '@mui/icons-material';

import { signupRequest } from "./Signup.action";

const Signup = ()=>{

  const dispatch = useDispatch();
  const { SignupReducer } = useSelector(response=>response);

  const signupForm = {
      
      fullname : "",
      mobile : "",
      email : "",
      password: "",
      
      
  }

  const signupError ={

      fullname : {

          state: false,
          message :""

      },
      mobile : {

          state: false,
          message :""

      },
      email : {

          state: false,
          message :""

      },
      password : {

          state: false,
          message :""

      },
      file : {

          state: false,
          message :""

      }


  }


  const [input,setInput] = useState(signupForm);
  const [error,setError] = useState(signupError);
  const [sweetalert,setSweetalert] =useState({

    state : false,
    icon : "default",
    title: 'Default Title',
    message : ""


  });

  const checkForSignup = ()=>{

        if(SignupReducer.error){

            return setSweetalert({

              state : true,
              icon : "error",
              title: 'Signup Failed',
              message : SignupReducer.error.message
          
          
            });

        }

        if(SignupReducer.data){

            return setSweetalert({

                state : true, 
                icon : "success",
                title : "Good job",
                message : "Signup is completed . Try to Login"

            });



        }



  }

  useEffect(checkForSignup,[SignupReducer]);


  const [uploadText,setUploadText] = useState({title:"Upload Profile Pic"});
  const [fileControl,setFileControl] = useState(true);

 

  
  const Alert = ()=>{

    const alert = (

      <>
      
        <SweetAlert
        
          show={sweetalert.state}
          title={sweetalert.title}
          type={sweetalert.icon}
          customButtons={
            <>
                <Button onClick={()=>setSweetalert({state:false})} variant="outlined" color="warning" sx={{py:1,mr:2}}>Cancel</Button>
               {SignupReducer.data? <Button variant="contained" color="success" sx={{py:1}} component={Link} to="/login">Login</Button> :null } 
            </>
          }
        
          onConfirm={()=>{}}
        >

              {sweetalert.message}
        </SweetAlert>
      
      
      </>

    );

    return alert;

  }
  
  const fullnameValidation = (e)=>{

      const input = e.target;
      const key = input.name;
      const isRequired =  required(input);
      
      return setError((oldData)=>{
          return {

              ...oldData,
              [key] : isRequired

          }
          
      });

  }

  const mobileValidation = (e)=>{

      const input = e.target;
      const key = input.name;
      const isRequired = required(input);
      const isMinLength = minLength(input,4);
      const isMaxLength = maxLength(input,13);
      return setError((oldData)=>{
        return {
          ...oldData,
          [key]: isRequired.state && isRequired ||
          isMinLength.state && isMinLength ||
          isMaxLength
        }
      });

  }
  const emailValidation = (e)=>{

      const input = e.target;
      const key = input.name;
      const isRequired = required(input);
      const isEmail = emailSyntax(input);
      return setError((oldData)=>{
        return {
          ...oldData,
          [key]: isRequired.state && isRequired || isEmail
        }
      });

  }


  const passwordValidation = (e)=>{

      const input = e.target;
      const key = input.name;
      const isRequired = required(input);
      const isMinLength = minLength(input,8);
      const isMaxLength = maxLength(input,15);
      const isStrong = strongPassword(input);
      return setError((oldData)=>{
        return {
          ...oldData,
          [key]: isRequired.state && isRequired ||
          isStrong.state && isStrong ||
          isMinLength.state && isMinLength ||
          isMaxLength
        }
      });

  }




  
  const required = (input)=>{

      const value = input.value.trim();
      if(value == 0){
          return {

              state : true,
              message : "the field is required"

          }
          
      } else{

          return {

              state : false,
              message : ""
          }

      }


  }

  const emailSyntax = (input)=>{
      const value = input.value.trim();
      const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if(regExp.test(value))
      {
      return {
          state: false,
          message: ""
      }
      }
      else {
      return {
          state: true,
          message: "Email is not valid"
      }
      }
  }

  const strongPassword = (input)=>{
      const value = input.value.trim();
      const regExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=)/g;
      if(regExp.test(value))
      {
        return {
          state: false,
          message: ""
        }
      }
      else {
        return {
          state: true,
          message: "Password contain uppercase, lowercase, symbols and numbers"
        }
      }
    }

  const minLength = (input,requiredLength)=>{
      const value = input.value.trim();
      if(value.length < requiredLength)
      {
        return {
          state: true,
          message: `Minimum ${requiredLength} characters required`
        }
      }
      else {
        return {
          state: false,
          message: ""
        }
      }
    }
  
    const maxLength = (input,requiredLength)=>{
      const value = input.value.trim();
      if(value.length > requiredLength)
      {
        return {
          state: true,
          message: `Maximum ${requiredLength} characters required`
        }
      }
      else {
        return {
          state: false,
          message: ""
        }
      }
    }

  const updateValue = (e)=>{

      const input = e.target;
      const key =input.name;
      const value = input.value;
      return setInput((oldData)=>{

          return {
              ...oldData,
              [key]:value


          }


      });


  }

  const validateOnSubmit = ()=>{
      let valid = true;
      for(let key in input)
      {
        if(input[key].length === 0) {
          valid = false;
          setError((oldData)=>{
            return {
              ...oldData,
              [key]: {
                state: true,
                message: "This field is required"
              }
            }
          });
        }
      }
      return valid;
    }
  
    const register = (e)=>{

      e.preventDefault();
    
      const isValid = validateOnSubmit();
      if(isValid)
      {
          dispatch(signupRequest(new FormData(e.target)));
      }
    }


    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      console.log(selectedFile.type);
     
        // You can perform further actions with the selected file here
        if(selectedFile.type=== "image/jpeg")
        {
         return [ setUploadText({title : "uploaded"}), setFileControl(false)];
          
        }else{

          alert("upload jpeg only ");
          return setUploadText({title:"Upload Profile Pic"}); 
          

        }
      
    }

  const design = (

      <>
      
          <Grid container>
              
              <Grid item sm={6} xs={12} sx={{p:{md:"50px"}}} >

                  <MediaQuery maxWidth={1224}>

                          <img src="images/signup_user.png"   width="90%"/>

                  </MediaQuery>
                  <MediaQuery minWidth={1224}>

                          <img src="images/signup_user_mobile.png" width="100%" />

                  </MediaQuery>



              </Grid> 

              <Grid item sm={6} xs={12}>

                      <Typography variant="h5" sx={{
                          ml:{
                               md : "62px",
                               xs:"32%"
                              },
                          mt:{
                              md:"30px"
                          },
                          mb:"30px",
                          fontSize:{ md : "30px"}
                         
                          }}>

                          REGISTER 

                      </Typography>

                      <div id="form-box">
                          <form onSubmit={register}>
                              
                              <Stack direction="column" spacing={3}>

                              
                                  <TextField  label="fullname" variant="outlined" 
                                  name="fullname" value={input.fullname}
                                  onChange={updateValue}
                                  error = {error.fullname.state}
                                  helperText = {error.fullname.message}
                                  onBlur={fullnameValidation}
                                  onInput={fullnameValidation}
                                  sx={{
                                    width:
                                    {
                                      xs:"275px",
                                      md : "460px"
                                    }
                                  }}
                                  /> 
                                  <TextField  label="Mobile no." variant="outlined" type="number"
                                   name="mobile" value={input.mobile}
                                   onChange={updateValue}
                                   error={error.mobile.state}
                                   helperText={error.mobile.message}
                                   onBlur={mobileValidation}
                                   onInput={mobileValidation}
                                   sx={{
                                    width:
                                    {
                                      xs:"275px",
                                      md : "460px"
                                    }
                                  }}
                                    
                                  
                                   /> 
                                  <TextField  label="email" variant="outlined" name="email"
                                   value={input.email}
                                   onChange={updateValue}
                                   error={error.email.state}
                                   helperText={error.email.message}
                                   onBlur={emailValidation}
                                   onInput={emailValidation}
                                   sx={{
                                    width:
                                    {
                                      xs:"275px",
                                      md : "460px"
                                    }
                                  }}
                                   /> 
                                  <TextField  label="password" variant="outlined" type="password" 
                                  name="password" value={input.password}
                                  onChange={updateValue}
                                  error={error.password.state}
                                  helperText={error.password.message}
                                  onBlur={passwordValidation}
                                  onInput={passwordValidation}
                                  sx={{
                                    width:
                                    {
                                      xs:"275px",
                                      md : "460px"
                                    }
                                  }}
                                  
                                  />
                                  
                                  <div>
                                  <Box>
                                      <input
                                        type="file"
                                        id="fileInput"
                                        accept="image/*" // Specify that only image files are allowed
                                        style={{ display: 'none' }} // Hide the input element
                                        name ="image"
                                        onChange={handleFileChange}
                                        
                                      />
                                      <label htmlFor="fileInput">
                                        <Button
                                          variant="outlined"
                                          component="span"
                                          startIcon={<CloudUpload />}
                                        >
                                          {uploadText.title}
                                        </Button>
                                      </label>
                                 </Box>
                                 </div>
                                  <MediaQuery maxWidth={1228}>
                                      <Stack direction="column" justifyContent="space-between" alignItems="center">
                                         
                                      <LoadingButton loading={SignupReducer.isLoading}
                                              disabled={
                                                  error.fullname.state ||
                                                  error.mobile.state ||
                                                  error.email.state ||
                                                  error.password.state ||
                                                  fileControl
                                                  
                                              }
                                              type="submit"
                                              sx={{py: 1}}
                                              variant="contained"
                                       >Signup</LoadingButton>

                                          <Button type="button" component={Link} to="/login"> Already have an Account</Button>

                                      </Stack>

                                  </MediaQuery>

                                  <MediaQuery minWidth={1228}>
                                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                    
                                      <Button
                                              disabled={
                                                  error.fullname.state ||
                                                  error.mobile.state ||
                                                  error.email.state ||
                                                  error.password.state ||
                                                  fileControl
                                                  
                                              }
                                              type="submit"
                                              sx={{py: 1}}
                                              variant="contained"
                                       >Signup</Button>

                                          <Button type="button" component={Link} to="/login"> Already have an Account</Button>

                                      </Stack>

                                  </MediaQuery>


                              </Stack>

                          </form>

                          <Alert />

                      </div>
                     


              </Grid>
              
          </Grid>     
      
      </>


  );


  return design;
}


export default Signup;
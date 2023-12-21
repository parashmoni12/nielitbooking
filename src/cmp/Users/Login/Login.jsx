import {

    Grid,
    Stack,
    Button,
    Container,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    InputAdornment,
    IconButton,
    OutlinedInput,
    FormControl,
    InputLabel

} from "@mui/material";

import { Link , useNavigate } from "react-router-dom";

import "./Login.css";

import MediaQuery from "react-responsive";

import { useState, useEffect } from "react";

import * as yup from "yup";

import {  useDispatch,useSelector } from "react-redux";

import { loginRequest } from "./Login.action";

import { LoadingButton } from "@mui/lab";

import Cookies from "universal-cookie";

const Login = ()=>{
  
    

    const cookie = new Cookies();

    const navigate = useNavigate();

    const [remember,setRemember] = useState(false);

    const[type, setType ] = useState("password")


    const dispatch = useDispatch();
    const { LoginReducer } = useSelector(response=>response);

    const checkForLogin = ()=>{

        if(LoginReducer.userNotFound){

            return setError((oldData)=>{
              
              return {

                ...oldData,
                email: {
                  state: true,
                  message: "User not Found !"
                },
                password: {
                  state: false,
                  message: ""
                }

              }


            });


        }
        
        if(LoginReducer.incorectPassword){

          return setError((oldData)=>{
            
            return {

              ...oldData,
              email: {
                state: false,
                message: ""
              },
              password: {
                state: true,
                message: "Incorrect password"
              }

            }


          });


        }

        if(LoginReducer.isLogged){

          if(cookie.get("sukdldtojken")){

            cookie.remove("sukdldtojken");

          }

          cookie.set("sukdldtojken",LoginReducer.data.token,{maxAge:86400});
          return navigate("/profile");

        }

    }

    const RememberMe =()=>{

      let checkUser = localStorage.getItem("user");

      if(checkUser){

        let user = JSON.parse(checkUser);

        return (
          setInput(user),
          setRemember(true),
          setDisabled(false)

        )
      }


    }

    useEffect(()=>{

      checkForLogin();
      RememberMe();

    },[LoginReducer]);

    const [input, setInput] = useState({

        email : "",
        password : ""

    });

    const [error,setError] = useState({
        email: {
          state: false,
          message: ""
        },
        password: {
          state: false,
          message: ""
        }
      });



    const [disabled,setDisabled] = useState(true);

    const schema = yup.object().shape({
             email: yup.string().required().email(),
             password: yup.string().required()

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
    
      



    const login = (e)=>{

        e.preventDefault();

        if(remember){

          let data = JSON.stringify(input);

          localStorage.setItem("user",data);

        }        


        dispatch(loginRequest(input));
        


        //navigate("/profile");



    }



    const  design = (

        <>
            
            
            
            <Grid container >

                <Grid item sm={6} xs={12} sx={{ padding : { md:12,xs:0} }}> 

                    <MediaQuery maxWidth={1224}>

                          <img src="images/signup_user.png"   width="90%"/>

                    </MediaQuery>
                    <MediaQuery minWidth={1224}>

                         <img src="images/signup_user_mobile.png" width="100%" />

                    </MediaQuery>

                    
                
                 </Grid>

                <Grid item sm={6} xs={12} > 

                 
                <Typography variant="h4" sx={{
                            ml:{
                                 md : 0,
                                 xs:"30%"
                                },
                            mt:{
                                md:"30px"
                            },
                            mb:"30px",
                            fontWeight:"bold",
                            letterSpacing:{
                                md:"3px",
                                xs : "8px"
                            }
                           
                            }}>

                           LOGIN

                        </Typography>

                        <form onSubmit={login}>

                            
                            
                            <Stack direction="column" spacing={3} >
                                
                                <div  id="loginbox" >

                                <TextField label = "Username" variant="outlined" error={error.email.state} helperText={error.email.message}
                                name="email" value={input.email} style={{width:"100%",marginBottom:"20px"}}
                                onChange={handleInput}
                                onKeyDown={validSubmit}
                                onInput={validateInput}
                                onBlur={validateInput}
                                />
        
                               <FormControl>

                                  <InputLabel htmlFor="outlined-adornment-password" style={{color:error.password.message && "red"}}>password</InputLabel>

                                  <OutlinedInput label = "Password" variant="outlined" name="password" type={type}
                                        value={input.password}  error={error.password.state} 
                                        onBlur={validateInput}  style={{width:"100%",marginBottom:"10px"}} onChange={handleInput} 
                                        onKeyDown={validSubmit} onInput={validateInput} id="password_field"
                                        endAdornment={

                                          <InputAdornment>

                                              <IconButton onClick={()=>type=="password"? setType("text"): setType("password")}>

                                                  <span className="material-icons-outlined">

                                                      {type == "password" ? "visibility" : "visibility_off" }

                                                  </span>

                                              </IconButton>

                                          </InputAdornment>

                                        }

                                        />

                                        <p style={{padding:0,margin:0,color:"red",fontSize:"14px"}}>{error&& error.password.message }</p>
                               </FormControl>
                                
                               

                                
                                <Stack direction="row" justifyContent="end">
                                    
                                    <Button id="f_btn" component={Link} to="/forgot-password"> Forgot Password</Button>
                                        
                                </Stack>

                                <Stack direction="row" justifyContent="space-between" alignItems="center">

                                    <FormGroup>

                                        <FormControlLabel control={<Checkbox onChange={()=>setRemember(!remember)}   checked={remember} />}  label="Remember Me !"/>

                                    </FormGroup>
                                    
                                    <LoadingButton loading={LoginReducer.isLoading} disabled={disabled} variant="contained" color="secondary" type="submit" sx={{px:3,py:1}} id="login_btn">Login</LoadingButton>


                                </Stack>

                                    <div style={{marginTop:"25px"}} id="c_link">

                                        <Link to="/signup" id="c_text">Create an Account </Link>    
                                        
                                    </div>                            

                                    

                                </div>

                               

                                
                               

                            </Stack>    
                            
                        </form>   
                              

                
                </Grid>



            </Grid>
        
           
        </>



    );

    return design;
}

export default Login;
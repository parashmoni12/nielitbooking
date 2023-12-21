import { Card, CardHeader, CardContent , CardActions ,Divider ,Chip, TextField, Stack, Button} from "@mui/material";
import { Link , useNavigate} from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import {  useDispatch,useSelector } from "react-redux";

import * as yup from "yup";

import "./adminLogin.css";

import { AdminloginRequest } from "./AdminLogin.action";

import Cookies from "universal-cookie";

const Login = ()=>{

    const cookie = new Cookies();

    const navigate = useNavigate();


    const [disabled,setDisabled] = useState(true);

    const dispatch = useDispatch();
    const { AdminLoginReducer } = useSelector(response=>response);


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

    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required()

    });

    const validSubmit = async ()=>{

      const isValid = await schema.isValid(input);

      return setDisabled(!isValid);

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
  

    const checkForLogin = ()=>{

      if(AdminLoginReducer.userNotFound){

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
      
      if(AdminLoginReducer.incorectPassword){

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

      if(AdminLoginReducer.isLogged){

       // console.log(AdminLoginReducer.data.token);
        cookie.set("authToken",AdminLoginReducer.data.token,{maxAge:86400});
        return navigate("/admin-panel");

      }

  }

  



    useEffect(()=>{

      checkForLogin();
     
     

    },[AdminLoginReducer]);


    const login = (e)=>{

      e.preventDefault();

      /*if(remember){

        let data = JSON.stringify(input);

        localStorage.setItem("user",data);

      }    */    


      dispatch(AdminloginRequest(input));
      


      //navigate("/profile");



  }



    const design = (

        <>

        <div id="main-div">
        
        <Card sx={{ maxWidth: 400}} id="card" >
            <center> <img src="../images/nielit_logo.jpg" width="200" height="80px" alt="brand-logo" /></center>
        
            <Divider variant="middle" >
                 <Chip label="LOGIN" color="primary" sx={{width:"80px"}} />
            </Divider>
            

            <CardContent>

            <form onSubmit={login}>

                <Stack direction="column" spacing={3} >
                    
                    

                        <TextField name="email" label="username" 
                         variant="outlined" onChange={handleInput}  value={input.email}
                         onKeyDown={validSubmit}   onInput={validateInput}  onBlur={validateInput} 
                         error={error.email.state} helperText={error.email.message}
                         />

                        <TextField name="password" type="password" label="password" variant="outlined" onChange={handleInput}
                         value={input.password} onKeyDown={validSubmit}   onInput={validateInput}  onBlur={validateInput}
                         error={error.password.state} helperText={error.password.message}
                         />

                        <div>
                        <LoadingButton loading={AdminLoginReducer.isLoading} disabled={disabled} variant="contained" color="secondary" type="submit" sx={{px:3,py:1}} >Login</LoadingButton>
                        </div>

                        <div >
                        <Link to="/forgot-password-admin" id="c_text">Forgot password ? </Link> 
                        </div>
                  
            
                
                </Stack>
            </form>

            </CardContent>
      <CardActions disableSpacing>
        
      </CardActions>
    
    </Card>
        

    </div> 
        
        </>


    );



    return design ;
}


export default Login;
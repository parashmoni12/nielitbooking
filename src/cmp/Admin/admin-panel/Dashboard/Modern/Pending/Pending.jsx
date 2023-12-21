
import { Card, CardContent, Typography, CardActions, Grid, Button,Avatar} from "@mui/material";
import { useEffect ,useState} from "react";
import { green, pink, cyan,blue } from '@mui/material/colors';

import useHttp from "../../../../../../hooks/useHttp";
import { Link } from "react-router-dom";


const Pending = ()=>{

    const [request,setRequest] = useState(null);
    const [count ,setCount] = useState(0);
    const [httpResponse,httpError,httpLoader] = useHttp(request);
    const [testing,setTesting ] = useState(null);

    const countTotal = async ()=>{


        return setRequest({
            method: "get",
            url: "http://localhost:8080/pendingBookingAdmin",
          });

    }

    useEffect(()=>{

        const fetchData = async ()=>{

           await countTotal();
        }
        fetchData();

    },[testing]);
       


    const countInfo = async ()=>{
        if(httpResponse != null){
            const length = httpResponse;
            return setCount(length);
        }
       
    }
    useEffect(()=>{
       
        const fetch = async ()=>{

          await countInfo();
        }
        fetch();

    });

    const design = (

        <>
        
            <Grid  item xs={12} sm={4} >

                 <Card sx={{width:{xs:"270px",md:"300px"},height:"120px",mt:4}}>

                        <CardContent>
                            
                            <Grid container alignItems="center">

                                <Grid item>
                                        <Avatar sx={{ bgcolor: pink[500], textDecoration:"none" }} component={Link} to="/admin-panel/pending">
                                        <span className="material-icons">account_circle </span>
                                        </Avatar>
                                </Grid>
                                <Grid item> <Typography sx={{fontFamily:"Mooli",ml:1}}> Pending </Typography></Grid>

                            </Grid>


                                
                                    <Avatar sx={{ bgcolor: pink[400], marginLeft:{xs:"200px",md:"220px"},marginTop:"15px",textDecoration:"none"}} component={Link} to="/admin-panel/pending">{count}</Avatar>
                                    


                        </CardContent>

                 </Card>
                
               
                
            </Grid> 
        
        
        </>


    );

    return design;
}

export default Pending;
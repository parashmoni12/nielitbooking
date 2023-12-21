import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Stack,Alert,TextField } from "@mui/material";
import { countConfirmBooking,pagination} from './Confirm.action';


import {  useDispatch,useSelector } from "react-redux";

const Confirm = ()=>{


    const {ConfirmBoookingReducer} = useSelector(response=>response);
    const [testing,setTesting ] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ItemsPerPage = 5; 
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [ successAlert, setsuccessAlert] = useState(false);
    const [ errorAlert, seterrorAlert] = useState(false);
    const [successMessage,setSuccessMessage] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    



     const ConfirmBooking = async () => {

        const user = JSON.parse(sessionStorage.getItem("user"));
        const id = user._id;
        
        dispatch(pagination(id,(currentPage - 1) * ItemsPerPage, ItemsPerPage));
      }
     
      const countData= () => {
  
        const user = JSON.parse(sessionStorage.getItem("user"));
        const id = user._id;


       dispatch(countConfirmBooking(id));


      }
  
      useEffect(()=>{
        
          
          const fetchData = async ()=>{
    
            await ConfirmBooking();
         }
         fetchData();
       
         
          countData();
    
        },[testing,currentPage]);

    
     const handleSearch = (event) => {
   
   
        setSearchText(event.target.value);
   
    }


    const filterData = () => {
        if (!ConfirmBoookingReducer  || !ConfirmBoookingReducer.countSuccess) {
            return [];
        }
    
        const filteredData = ConfirmBoookingReducer.dataPag.data.filter((item) =>
            item.email.toLowerCase().includes(searchText.toLowerCase()) ||
            item.bookingId.toLowerCase().includes(searchText.toLowerCase())
        );
    
        return filteredData;
    }

    const handlePageChange = (event, newPage) => {

        setCurrentPage(newPage);
}



const paymessage = (e,id)=>{

     
    setSuccessMessage("Booking Payment will be take offline (Institute)");
    setsuccessAlert(true);


setTimeout(() => {
    setsuccessAlert(false);
    seterrorAlert(false);
}, 2000);

}


    const EmptyBox = ()=>{

        const design = (

            <>

                <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{
                    p:{
                    xs :4,
                    md : 10}
                    }}>

                <img src="../images/empty.jpg" className="empty_img"/>
                    <Typography sx={{fontFamily:"Poppins", letterSpacing:"5px",marginLeft:{xs:"60px",md:"100px"},mt:2}}>No Booking Available!</Typography>

                </Stack>
            
            </>


        );

                 return design;

    }


    const design = (

        

        <>
              

{ ConfirmBoookingReducer  && ConfirmBoookingReducer.countSuccess && ConfirmBoookingReducer.data!=0?
    
   
    <div>
       <TextField
    label="Enter Booking Id Or Email  "
    variant="outlined"
    fullWidth
    value={searchText}
    onChange={handleSearch}
    sx={{ mt: 2 ,mb:4 , width:{ xs : "280px",md: "400px"}}} />

       <TableContainer component={Paper} className='animate__animated animate__fadeIn'>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Sr. No</TableCell>
          <TableCell align="left">Booking Id</TableCell>
          <TableCell align="left">Username</TableCell>
          <TableCell align="left">Booking Date</TableCell>
          <TableCell align="left">Booking Time</TableCell>
          <TableCell align="left">Payment</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {filterData().map((item, index) => {
              return (
                <TableRow key={item._id} className='animate__animated animate__fadeIn animate__slow'>
                  <TableCell>{(currentPage - 1) * ItemsPerPage + index + 1}</TableCell>
                  
                  <TableCell align="left">{item.bookingId}</TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="left">{item.date}</TableCell>
                  <TableCell align="left">{item.time}</TableCell>
                  <TableCell align="left">
                    
                    {
                        item.isPaid ? <Button variant='contained' disabled sx={{px:4}}>Paid</Button> : <Button variant="contained" color="error" data-value={item._id} onClick={paymessage}>Pending</Button>

                    }
                      
                
                  </TableCell>

                  
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  </TableContainer>
  <Pagination sx={{mt:5}} count={Math.ceil(ConfirmBoookingReducer.data/ ItemsPerPage)} page={currentPage} color="secondary" onChange={handlePageChange} />
    
    </div>
    
    
    
    
: <EmptyBox /> }
  


    
  {
        
        successAlert?<Stack sx={{ 

            width: {
                xs : '100%',
                md :  '50%'
            },


        }} spacing={2} >

        <Alert severity="success">{successMessage}</Alert>

        </Stack> : null

    }









 
        
        
         
        </>



    );

    return design;



}

export default Confirm;
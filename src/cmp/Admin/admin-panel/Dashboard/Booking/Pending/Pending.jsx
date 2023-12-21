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
import { countUser,pagination,confirmPending,cancelBooking} from './Pending.action';


import {  useDispatch,useSelector } from "react-redux";
import "./Pending.css";


const Pending = ()=>{

 
    const {AdminPendingReducer} = useSelector(response=>response);

    const [testing,setTesting ] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ItemsPerPage = 5; 
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [ successAlert, setsuccessAlert] = useState(false);
    const [ errorAlert, seterrorAlert] = useState(false);
    const [successMessage,setSuccessMessage] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    useEffect(()=>{

        if (AdminPendingReducer && AdminPendingReducer.failedBooking) {
            // Handle the error case
            setErrorMessage("Booking Failed. Slot not available !");
            seterrorAlert(true);

            setTimeout(() => {
                setsuccessAlert(false);
                seterrorAlert(false);
            }, 2000);
        

        } else if (AdminPendingReducer && AdminPendingReducer.confirmBooking) {
            setSuccessMessage("Booking Successfull");
            setsuccessAlert(true);

            setTimeout(() => {
                setsuccessAlert(false);
                seterrorAlert(false);
            }, 2000);
        
        }
    


    },[AdminPendingReducer]);


    const Pending = async () => {

      
      dispatch(pagination((currentPage - 1) * ItemsPerPage, ItemsPerPage));
    }
   
    const countData= () => {

      
        dispatch(countUser());
    }

    useEffect(()=>{
      
        
        const fetchData = async ()=>{
  
          await Pending();
       }
       fetchData();
     
       
        countData();
  
      },[testing,currentPage]);







    const confirmRequest = (e,id)=>{

        const button = e.target;
 
        const dataValue = button.getAttribute("data-value");
        const dataTime = button.getAttribute("data-time");
        const dataDate = button.getAttribute("data-date"); 
        
        
       

        dispatch(confirmPending(dataValue,dataTime,dataDate));

       const tr = button.parentElement.parentElement;
        
       tr.style.display = 'none';

      

      
   
        

    }


    const handlePageChange = (event, newPage) => {

        setCurrentPage(newPage);
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


    const handleSearch = (event) => {
   
   
        setSearchText(event.target.value);
   
    }


    const filterData = () => {
        if (!AdminPendingReducer || !AdminPendingReducer.countSuccess) {
            return [];
        }
    
        const filteredData = AdminPendingReducer.dataPag.data.filter((item) =>
            item.email.toLowerCase().includes(searchText.toLowerCase()) ||
            item.bookingId.toLowerCase().includes(searchText.toLowerCase())
        );
    
        return filteredData;
    }


    const cancelBookings = (e,id)=>{

        const button = e.target;
 
        const dataValue = button.getAttribute("data-value"); 
        
  


        dispatch(cancelBooking(dataValue));
 
        const tr = button.parentElement.parentElement;
         
        tr.style.display = 'none';
 
     
 
        if (AdminPendingReducer && AdminPendingReducer.cancelFailed) {
            // Handle the error case
            setErrorMessage("cancel Booking Failed. Internal Server error !");
            seterrorAlert(true);
        } else {
            setSuccessMessage("cancel Booking Successfull");
            setsuccessAlert(true);
        }

        setTimeout(() => {
            setsuccessAlert(false);
            seterrorAlert(false);
        }, 2000);
 
         



    }



    const design = (

        

        <>

    { AdminPendingReducer && AdminPendingReducer.countSuccess && AdminPendingReducer.data!=0?
        
       
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
              <TableCell align="left">Verification</TableCell>
              <TableCell align="left">Cancel</TableCell>
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
                     
                          <Button variant="outlined" color="error" onClick={confirmRequest}  data-value={item._id} data-time={item.time} data-date={item.date}>Pending</Button>
                    
                      </TableCell>

                      <TableCell align="left"><Button variant="outlined" color="error" data-value={item._id} onClick={cancelBookings}>Remove</Button></TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination sx={{mt:5}} count={Math.ceil(AdminPendingReducer.data/ ItemsPerPage)} page={currentPage} color="secondary" onChange={handlePageChange} />
        
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

        {

            errorAlert?<Stack sx={{ 

                width: {
                    xs : '100%',
                    md :  '50%'
                },


            }} spacing={2} >

            <Alert severity="error">{errorMessage}</Alert>

            </Stack> : null

        }









        
        </>



    );

    return design;



}

export default Pending;
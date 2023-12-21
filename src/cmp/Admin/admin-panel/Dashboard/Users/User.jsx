import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Stack,Typography, TextField ,Avatar,IconButton} from "@mui/material";
import { countUser,pagination } from './User.action';

import {  useDispatch,useSelector } from "react-redux";





const Users = ()=>{

    const { UserCountReducer } = useSelector(response=>response);
       
    const [testing,setTesting ] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ItemsPerPage = 5; 
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const serverUrl = "http://localhost:8080/";
   
    const Users = async () => {

      
      dispatch(pagination((currentPage - 1) * ItemsPerPage, ItemsPerPage));
    }
   

    const countData= () => {

      
        dispatch(countUser());
    }

    
    useEffect(()=>{
      
        
        const fetchData = async ()=>{
  
          await Users();
       }
       fetchData();
     
       
        countData();
  
      },[testing,currentPage]);
    
    
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
      if (!UserCountReducer || !UserCountReducer.countSuccess) {
        return [];
      }
  
      const filteredData = UserCountReducer.dataPag.data.filter((item) =>
        item.email.toLowerCase().includes(searchText.toLowerCase())
      );
      return filteredData;
    }
  
  





    const design = (

        <>

    { UserCountReducer && UserCountReducer.countSuccess && UserCountReducer.data!=0?
        
       
        <div>
           <TextField
        label="Enter email for Search "
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearch}
        sx={{ mt: 2 ,mb:4 , width:{ xs : "280px",md: "400px"}}} />

           <TableContainer component={Paper} className='animate__animated animate__fadeIn'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Pic</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Fullname</TableCell>
              <TableCell align="left">Mobile</TableCell>
              <TableCell align="left">Accounts</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
          {filterData().map((item, index) => {
                  return (
                    <TableRow key={item._id} className='animate__animated animate__fadeIn animate__slow'>
                      <TableCell>{(currentPage - 1) * ItemsPerPage + index + 1}</TableCell>
                      <TableCell align="left">

                      
                    
                            <IconButton color="inherit" >
                                            <Avatar src={serverUrl + item.image} alt="pic" sx={{width:"45px",height:"45px"}}/>
                                            </IconButton>
                                    


                      </TableCell>
                      <TableCell align="left">{item.email}</TableCell>
                      <TableCell align="left">{item.fullname}</TableCell>
                      <TableCell align="left">{item.mobile}</TableCell>
                      <TableCell align="left">
                        {item.emailVerified ?
                          <Button variant="outlined" color="primary"> Verified</Button>
                          :
                          <Button variant="outlined" color="error">Pending</Button>
                        }
                      </TableCell>
                      


                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination sx={{mt:5}} count={Math.ceil(UserCountReducer.data/ ItemsPerPage)} page={currentPage} color="secondary" onChange={handlePageChange} />
        
        </div>
        
        
        
        
    : <EmptyBox /> }
      
 
        
        </>


    );

    return design;
}

export default  Users;
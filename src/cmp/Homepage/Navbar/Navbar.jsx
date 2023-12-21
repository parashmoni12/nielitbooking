import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MediaQuery from "react-responsive";
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import { Menu,MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';

const Navbar = ()=>{

  const [parent,setParent] = useState(null);
  const open = Boolean(parent);

  const ShowDropDownMenu = (e)=>{

    

    const el = e.currentTarget;

    return setParent(el);


  }

  const closeDropDownMenu = ()=>{

  
    return setParent(null);

    
  }



  const design = (

    <>
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: 'transparent',borderBottom:"none",boxShadow:'none',paddingRight:"120px"}}>

            <Stack direction="row" justifyContent="space-between" alignItems="center">

            <Toolbar>
                
                
                    <img src="images/nielit.png" id='main_logo'/>
                    <MediaQuery maxWidth={1224}>
                            
                    <IconButton
                        size="large"
                        edge="start"
                        onClick={ShowDropDownMenu}
                        onClose={closeDropDownMenu}
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        style={{border: "2px solid white",marginLeft:"20px",borderRadius:"8px",boxShadow:"0px 0px 8px white"}}
                      >
                        <MenuIcon />

                      </IconButton>

                          
                    </MediaQuery>
          
            </Toolbar>


            <MediaQuery minWidth={1224} >
                <Toolbar>

                    <Stack direction="row" spacing={5}>
                            
                            <Typography component={Link} to="/" style={{ color:"black", fontFamily:'Mooli', fontSize:'18px',textDecoration:'none'}}> Home</Typography>
                            <Typography component={Link} to="/signup" style={{  color:"black", fontFamily:'Mooli', fontSize:'18px', textDecoration:'none'}}> Help</Typography>
                            <Typography component={Link} to="/signup" style={{  color:"black", fontFamily:'Kumbh Sans', fontSize:'18px',textDecoration:'none'}}> Register </Typography>
                            <Button  variant="contained" component={Link} to="/login" className="button-with-border-animation" startIcon={<LoginIcon />} style={{boxShadow:"0px 0px 12px white"}}> Login</Button>
                            <Button  colour="error" variant="contained" component={Link} to="/admin/login" className="button-with-border-animation" startIcon={<LockIcon />} style={{boxShadow:"0px 0px 12px white"}}> Admin</Button>

                    </Stack>


                


                </Toolbar>
            </MediaQuery>


            


            </Stack>

            
      </AppBar>

    </Box>
    
          
    <Menu anchorEl={parent} open={open} 
    onClick={closeDropDownMenu} onClose={closeDropDownMenu}
    PaperProps={{
      elevation: 0,
      sx: {
        width: "170px",
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.20))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >

          <MenuItem component={Link} to="/"> <span className='material-icons-outlined' style={{marginRight:"10px"}} >home</span> Home</MenuItem>
          <MenuItem component={Link} to="/signup"> <span className='material-icons-outlined' style={{marginRight:"10px"}} >call</span> Help</MenuItem>
          <MenuItem component={Link} to="/signup"> <span className='material-icons-outlined' style={{marginRight:"10px"}}>login</span>Register</MenuItem>
          <MenuItem component={Link} to="/login"> <span className='material-icons-outlined' style={{marginRight:"10px"}}>lock_open</span> Login</MenuItem>
    </Menu>
    </>



  );

    return design;

}

export default Navbar;

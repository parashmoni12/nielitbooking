import { Outlet, useResolvedPath, useMatch, useLocation, useNavigate} from "react-router-dom";

import { Drawer , Button,
        Box , Card, CardContent,
        List, ListItem, ListItemButton , ListItemIcon, ListItemText,
        Stack, AppBar,IconButton,Toolbar, ListSubheader, Collapse, Avatar, MenuItem, Menu, Breadcrumbs, Typography
    } from "@mui/material";



import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import UserMenu from "../../../json-api/UserMenu.json";

import { lightBlue } from '@mui/material/colors';

import MediaQuery from "react-responsive";

import { useDispatch, useSelector } from "react-redux";

import { logoutRequest } from "../Login/Login.action";

import useHttp from "../../../hooks/useHttp";

import Cookies from "universal-cookie";

import "./Profile.css";

const Profile = ()=>{

    const cookie = new Cookies();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {LoginReducer} = useSelector(response=>response);

    const checkForLogout = ()=>{
        if(LoginReducer.isLogout)
        {
          return navigate("/");
        }
      }
      useEffect(checkForLogout,[LoginReducer]);

     const serverUrl = 'http://localhost:8080';

    
      const [request,setRequest] = useState(null);
      const [httpResponse,httpError,httpLoader] = useHttp(request);


    const [active,setActive] = useState(true);
    const [activeOnMobile,setActiveOnMobile] = useState(false);
    const [width, setWidth ] = useState(250);
    const [collapsible, setCollapsible] = useState(false);
    const [parent,setParent] =useState(null);
    const [user,setUser] = useState(null);
    const [hide,setHide] = useState(false);
    const [testing,setTesting] = useState(null);

    const open = Boolean(parent);

    const location = useLocation();
    let routing = location.pathname.split("/");

  

    const showUserInfo = ()=>{
        if(!user)
        {
          let tmp = sessionStorage.getItem("user");
          let userInfo = JSON.parse(tmp);
          return setUser(userInfo);
        }
      }

    

      //email verification code  

      /*

    const checkEmailVerification = ()=>{

    

        if(!hide){
            let tmp = sessionStorage.getItem("user");
            let userInfo = JSON.parse(tmp);
            if(userInfo.emailVerified){

                return setHide(true);
            }
            else{
            
               //sendVerificatonLink();
                 
            }
        }
          

    }


    useEffect(()=>{
        checkEmailVerification();
    },[testing]);

    const sendVerificatonLink =()=>{

        let token = cookie.get("sukdldtojken");
        let tmp = sessionStorage.getItem("user");
        let userInfo = JSON.parse(tmp);

        return setRequest({
            method: "post",
            url: "http://localhost:8080/sendMail",
            data : {
                id : userInfo._id,
                username : userInfo.email,
                fullname : userInfo.fullname,
                subject : "Nielit Email Verification",
                message : "",
                token: token                

            }
          });


    }

    */
   
    const activeRoute = ()=>{
        
        if(sessionStorage.getItem("date")){

            return navigate("/profile/booking-slots");

        }else{
            return navigate("/profile/modern");

        }

        
    }

      useEffect(()=>{
        
        showUserInfo(); 
        activeRoute();
           
        
        
      },[user]);

    
      /*
      const verifyEmail = ()=>{

        let tmp = sessionStorage.getItem("user");
        let userInfo = JSON.parse(tmp);
        let emailServer = userInfo.email.split('@')[1];
        window.close();
        window.location = `https://${emailServer}`;
        

      }
    */

      //end email verification code 

    const controlDrawerOnDesktop = ()=>{

        return (

            setActive(!active),
            active?setWidth(0) :setWidth(250)

        );

    }
    const controlDrawerOnMobile = ()=>{

        return (

            setActiveOnMobile(!activeOnMobile),
            active?setWidth(250) :setWidth(0)

        );

    }

    const DesktopDrawer = ()=>{

        const temp = (

            <>

                <Drawer open={active} variant="persistent" sx={{
                    width:width,
                    "& .MuiDrawer-paper":{
                        width:width,
                        bgcolor:"white"
                    }
                    
                    }}>

                        <List  subheader={<ListSubheader><img src="../images/nielit.png" width="200" height="80px" alt="brand-logo" /></ListSubheader>} />


                        {

                                 UserMenu.map((item)=>{

                                    return <MenuList key={item.id} data={item} />

                                })

                        }

            




                </Drawer>
            
            
            </>

        );

        return temp

    }

    const MobileDrawer = ()=>{

        const temp = (

            <>

                <Drawer open={activeOnMobile} variant="temporary" sx={{
                    width:width,
                    "& .MuiDrawer-paper":{
                        width:width,
                        bgcolor:"white"
                    }
                    
                    }} onClose={controlDrawerOnMobile} onClick={controlDrawerOnMobile}>

                        <List  subheader={<ListSubheader><img src="../images/nielit.png" width="200" height="80px" alt="brand-logo" /></ListSubheader>} />


                        {

                                 UserMenu.map((item)=>{

                                    return <MenuList key={item.id} data={item} />

                                })

                        }

            




                </Drawer>
            
            
            </>

        );

        return temp

    }

    const Nav = ({data})=>{

        const resolved = useResolvedPath(data.link?data.link:false); 
        const activeLink = useMatch({path:resolved.pathname,end:true});
       

        const navDesign = (

            <>

                <ListItem >
                    <ListItemButton component={Link} to={data.link?data.link : false} onClick={data.isDropDown?()=>setCollapsible(!collapsible):null}
                     style={{backgroundColor:activeLink && data.link ?lightBlue[300]:null, color:activeLink && data.link ?"white":null}}
                     
                     
                     >
                    <ListItemIcon>
                    <span className="material-icons" style={{color:activeLink && data.link ?"white":null}}>{data.icon}</span>
                    </ListItemIcon>
                    <ListItemText primary={data.label} />
                        <span className="material-icons">
                            {
                                data.isDropDown?"expand_more" :null

                            }

                        </span>
                    </ListItemButton>
                </ListItem>

               {

                data.isDropDown? <Dropdown menu={data.dropDownMenu} />:null

               } 

            
            
            </>

        );
        
        return navDesign;

    }

    const MenuList = ({data})=>{

        const menuDesign = (

            <>
            
                <List subheader = {<ListSubheader>{data.cat}</ListSubheader>} >

                    {
                        data.menus.map((menu)=>{

                            return <Nav key={menu.id} data={menu} /> 

                        })

                    }

                </List>
            
            </>
        );

        return menuDesign;

    }

    const Dropdown = ({menu})=>{

        const dropdownDesign = (

            <>
                <Collapse in={collapsible} sx={{pl:4}}>
                        {

                            menu.map((data)=>{

                                return <Nav key={data.id} data={data} />


                            })

                        }               
                </Collapse>

            
            </>
        );
        return dropdownDesign;

    }

    const openProfileMenu = (e)=>{

        const el = e.currentTarget;
        return setParent(el);

    }

    const closeProfileMenu = (e)=>{

        return setParent(null);

    }

    const BreadLink = ({data})=>{

        return <Typography  style={{textTransform:"capitalize",
                    color: data.index ===data.length?lightBlue[500]:null
            }}>{data.item}</Typography>


    }


   
    const design = (
        <>
        
        
            
          
           <Stack>

                <MediaQuery minWidth={1224}>

                    <DesktopDrawer />

                </MediaQuery>
                <MediaQuery maxWidth={1224}>

                        <MobileDrawer />

                </MediaQuery>

                <AppBar position="fixed" sx={{
                     width:{
                        xs : "100%",
                        md :"calc(100% - "+width+"px)"
                     },transition:"0.1s"}}>

                    <Stack direction="row" justifyContent="space-between">

                            <Toolbar>
                                <MediaQuery minWidth={1224}>
                                        
                                    <IconButton color="inherit" onClick={controlDrawerOnDesktop}>
                                        <span className="material-icons">menu</span>
                                    </IconButton>

                                </MediaQuery>
                                <MediaQuery maxWidth={1224}>
                                        
                                    <IconButton color="inherit" onClick={controlDrawerOnMobile}>
                                        <span className="material-icons">menu</span>
                                    </IconButton>

                                </MediaQuery>
                            </Toolbar>
                            

                            <Toolbar>

                                <Stack direction="row" alignItems="center" spacing={2}>

                                    <IconButton color="inherit">
                                        <span className="material-icons">shopping_basket</span>
                                    </IconButton>

                                    <IconButton color="inherit">
                                        <span className="material-icons">notifications</span>
                                    </IconButton>

                                      {user && user.image ? (
                                            <IconButton color="inherit" onClick={openProfileMenu}>
                                            <Avatar src={serverUrl + "/" + user.image} />
                                            </IconButton>
                                        ) : null}

                                    <Menu anchorEl={parent}
                                             open={open} 
                                             onClose={closeProfileMenu} 
                                             onClick={closeProfileMenu}
                                             PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                  overflow: 'visible',
                                                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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

                                        <MenuItem style={{marginBottom:"6px"}}>
                                            <Avatar /> {user && user.fullname}
                                        </MenuItem>
                                      
                                        <MenuItem>
                                            <ListItemIcon>
                                                <span className="material-icons-outlined" style={{marginRight:"8px",marginBottom:"6px"}}>
                                                    password
                                                </span>
                                                Change Password
                                            </ListItemIcon>
                                        </MenuItem>
                                        <MenuItem onClick={()=>dispatch(logoutRequest())}>
                                            <ListItemIcon >
                                                <span className="material-icons-outlined" style={{marginRight:"8px",marginBottom:"6px"}}>
                                                    logout
                                                </span>
                                                Logout
                                            </ListItemIcon>
                                        </MenuItem>

                                    </Menu>


                                </Stack>
                                
                            </Toolbar>

                    </Stack>

                </AppBar>

                <Stack sx={{
                    ml:{

                        xs : 0,
                        md : `${width}px`

                    },
                    mt:4,
                    p:3,
                    transition: "0.1s",
                    background:"#f7f7f7",
                    height:"100vh"
                    }}>

                    <Breadcrumbs sx={{my:4}}>
                        {

                            routing.map((item,index)=>{

                                if(index>0){

                                    return <BreadLink key= {index} data={{

                                        index : index,
                                        item : item,
                                        length : routing.length-1

                                    }} />
                                }

                            })

                        }

                    </Breadcrumbs>
 
 
                    <Outlet />

                </Stack>


           </Stack>
        
         


        </>
    );


   return design;
}

export default Profile;
import { Stack,Typography } from "@mui/material";


const AddUser = ()=>{

  
 


    const EmptyBox = ()=>{

        const design = (

            <>

                <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{
                    p:{
                    xs :4,
                    md : 10}
                    }}>

                <img src="../images/empty.jpg" className="empty_img"/>
                    <Typography sx={{fontFamily:"Poppins", letterSpacing:"5px",marginLeft:{xs:"60px",md:"100px"},mt:2}}>Under construction</Typography>

                </Stack>
            
            </>


        );

                 return design;

    }


    const design = (

        

        <>
              

      
            
            
            
         <EmptyBox /> 
          
        
        
          </>


    );

    return design;



}

export default AddUser;
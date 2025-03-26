import { AppBar, Box, CssBaseline, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { LogoutOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';



export default function HeaderComp() {
 const navigate = useNavigate();

    const handleClearUserCred = () => {
        localStorage.removeItem("isValidUser");
        navigate('/signin');
    }
    return(
        <>
         <CssBaseline />
        <AppBar
        sx={{
            backgroundColor:'grey',
            display:'flex',
            // textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            height:'70px',
            width:'100%'
        }}
        >
           <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
            <Box></Box>
            <Box>
                <Typography variant="h4" sx={{flexWrap:'nowrap'}}>Realestate Website</Typography>
            </Box>
            <Box>
                    <Tooltip title='Logout'>
                        <IconButton onClick={() => handleClearUserCred()}>
                            <LogoutOutlined sx={{color:'white'}}/>
                        </IconButton>
                    </Tooltip>
            </Box>
           </Box>
            
        </AppBar>
        </>
    )
}
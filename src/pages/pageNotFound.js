import { Box, Typography } from "@mui/material";
import React from "react";

export default function Error404() {
    return (
        <>
       <Box sx={{
        width:'100%',
        textAlign:'center'
       }}>
       <Box>
            <Typography variant="h2">
                Page Not Found
            </Typography>
        </Box>
       </Box>
        </>
    )
}
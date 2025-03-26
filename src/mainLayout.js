import { Box } from "@mui/material";
import React from "react";
import HeaderComp from "./header";

export default function MainLayout ({children}) {
    return (
       <>
        <Box  sx={{ display: 'flex' }}>
            <HeaderComp/>
        </Box>
        <Box sx={{ p: 3,mt: 8  }}>
            {children}
        </Box>
       </>
    )
}
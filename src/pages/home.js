import React, { useEffect, useState } from "react";
import { Box, Button, Container,  Menu, MenuItem, Typography,Paper } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios'; //if we use fetch method we need to process the output data to convert json form but axios gives the output in json format
import { setStaticHomePageData } from "../redux/action/staticData";
import { FavoriteBorder, KeyboardArrowDownSharp } from "@mui/icons-material";
import OptmizedImageComp from "../components/optimizedImage";


export default function HomePage() {
 const navigate = useNavigate();
 const dispatch = useDispatch()
 const location = useLocation()
 const userValidation = localStorage.getItem("isValidUser");
 const [currentData,setCurrentData] = useState([])

console.log("staticUserData",userValidation);


 const getAllData = () => {
        axios.get('https://mira-strapi-dev.q.starberry.com/api/properties/?_limit=50')
        .then((response) => {
            console.log("getAllData",response);
            dispatch(setStaticHomePageData(response.data.data))
            setCurrentData([...response.data.data])
        })
        .catch((error) => {
            console.log("getAllData error",error);
            
        })
 }

 useEffect(() => {
     console.log("home userValidation:", userValidation);
     getAllData();
    //  if (userValidation === "true") {
    // } else {
    //     navigate('/');
    // }
}, []);


    return(
        <> {/*shorthand property for react fragment which is used for fast rendering*/}
              <Box>
                 <Box sx={{
                    height:'60px',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                 }}>
                    <Typography variant="h4">Property For Sales</Typography>
                </Box>
              </Box>
              <Box sx={{display:'flex',alignItems:'center',flexDirection:'row',flex:1,mb:2,mt:1,py:1,borderTop:'1px solid grey',borderBottom:'1px solid grey'}}>
              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                    <Box>
                        <Button
                        sx={{color:'black',fontSize:'16px',textTransform:'none'}}
                            endIcon={<KeyboardArrowDownSharp />}
                            >
                                All Bedrooms
                            </Button>
                    </Box>
                    <Box>
                        <Button
                        sx={{color:'black',fontSize:'16px',textTransform:'none'}}
                            endIcon={<KeyboardArrowDownSharp />}
                            >
                                Any Neighbourhood
                            </Button>
                    </Box>
                    <Box>
                        <Button
                        sx={{color:'black',fontSize:'16px',textTransform:'none'}}
                            endIcon={<KeyboardArrowDownSharp />}
                            >
                                Min Price
                            </Button>
                    </Box>
                    <Box>
                        <Button
                        sx={{color:'black',fontSize:'16px',textTransform:'none'}}
                            endIcon={<KeyboardArrowDownSharp />}
                            >
                                Max Price
                            </Button>
                    </Box>
                    <Box>
                        <Button
                        sx={{color:'black',fontSize:'16px',textTransform:'none'}}
                            endIcon={<KeyboardArrowDownSharp />}
                            >
                                Sort by
                            </Button>
                    </Box>
                    <Box>
                    <Typography sx={{fontSize:'16px'}}>57 Results</Typography>
                    </Box>
              </Box>
              </Box>
{/* loop data */}
               <Grid container spacing={3}>
                    {
                        currentData.map((data,idx) => (
                            <Grid size={{ xs: 6, md: 4 }}>
                                {console.log("jjjjj",data?.attributes)
                                }
                                    <Box sx={{textAlign:'center'}}>
                                    <Box sx={{
                                        position:'relative',
                                        display: 'inline-block',
                                        width: '100%',
                                        minHeight:'300px',
                                        height: '400px',
                                        maxHeight:'450px',
                                        overflow:'hidden'
  
                                    }}>
                                    <OptmizedImageComp
                                     src={data?.attributes?.thumbnail} 
                                     alt={data?.attributes?.title} 
                                     id={data.id}
                                     placeholder={'https://i0.wp.com/reviveyouthandfamily.org/wp-content/uploads/2016/11/house-placeholder.jpg?ssl=1'} 
                                    />
                                    <Box sx={{
                                        position:'absolute',
                                        top:'12px',
                                        right:'10px',
                                        backgroundColor:'#485a62',
                                        padding:'10px',
                                        borderRadius:'50%',
                                        fontSize:'24px',
                                        cursor: 'pointer',
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                        <FavoriteBorder sx={{color:'white'}}/>
                                    </Box>
                                    </Box>
                                   <Box sx={{ height:'100px'}}> {/* adding fixed height here to fix the alignment issue if any property related data is empty */}
                                   <Typography>
                                        {data?.attributes?.building[0]?.toUpperCase()}
                                    </Typography>
                                    <Typography>
                                        {data?.attributes?.title}
                                    </Typography>
                                    <Typography sx={{fontWeight:'bold'}}>
                                        {data?.attributes?.price} &#8364;
                                    </Typography>
                                   </Box>
                                    </Box>
                             </Grid>
                        ))
                    }
               </Grid>
        </> 
    )
}
import { Avatar, Box, Button, CircularProgress, Link, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Grid from '@mui/material/Grid2';
import { useSelector, useDispatch } from 'react-redux';
import { FavoriteBorder, HomeRounded, ShareOutlined, ShareRounded } from "@mui/icons-material";
import { useParams,useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import OptimizedSliderImage from "../components/optimizedSliderImage";
import OptimizedThumbnailImage from "../components/optimizedThumbnail";


export default function DynamicPropertyPage() {
     const navigate = useNavigate();
    const { id } = useParams();
    const [showMore,setShowMore] = useState(false)

    const slider1 = useRef(null); 
  const slider2 = useRef(null); 
 const userValidation = localStorage.getItem("isValidUser");


 const [singleData,setSingleData] = useState(null)
 const [mainSlider, setMainSlider] = useState(null);
console.log("params",id);

// useEffect(() => {
//     getAllData()
// },[])

 useEffect(() => {
     console.log("home userValidation:", userValidation);

    if (userValidation === "true") {
        getAllData();
    } else {
        navigate('/signin');
    }
}, [userValidation]);

//here again I'm calling the function to get allData because if someone reload the page the redux get cleared and went to the initial state.
const getAllData = () => {
    let paramsId = Number(id) // we get that id from url so its a string
    axios.get('https://mira-strapi-dev.q.starberry.com/api/properties/?_limit=50')
    .then((response) => {
        console.log("getAllData",response);
        let filteredData = response.data.data.filter((data) => data.id === paramsId)
        console.log("filteredData",filteredData);
        if(filteredData.length !== 0) {
            setSingleData({...filteredData[0]})
        }
    })
    .catch((error) => {
        console.log("getAllData error",error);
    })
}


 const mainSliderSettings = {
    arrows: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, 
    adaptiveHeight: true,
    beforeChange: (current, next) => setMainSlider(next) 
  };

  const thumbnailSliderSettings = {
    slidesToShow: 2, 
    slidesToScroll: 1, 
    focusOnSelect: true, 
    centerMode: true, 
    adaptiveHeight: true,
    infinite: true,
    asNavFor: slider1.current, 
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3, 
        }
      }
    ]
  };

  const handleThumbnailClick = (index) => {
    if (slider1.current) {
        slider1.current.slickGoTo(index); 
      }
  };
console.log("singleData",singleData);

    return (
        <>
        <Grid container spacing={3} sx={{display:'flex',alignItems:'flex-start'}}>
            <Grid size={{ xs: 12, md: 6 }} sx={{
                position:'sticky',
                top:'90px',
            }}>
                {
                    singleData === null ?
                    <Box sx={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        height:'80vh'
                    }}>
                        <CircularProgress />
                    </Box>
                    :
                    <Box>
                    <Slider {...mainSliderSettings} ref={slider1}> {/* Main Slider */}
                            {singleData?.attributes?.images?.map((image, index) => (
                            <Box key={index} sx={{width:'300px'}}>
                                <OptimizedSliderImage
                                src={image.srcUrl}
                                alt={`Image ${index}`}
                                idx={index}
                                placeholder={'https://i0.wp.com/reviveyouthandfamily.org/wp-content/uploads/2016/11/house-placeholder.jpg?ssl=1'} 
                                />
                                {/* <img src={image.srcUrl} alt={`Image ${index}`} style={{ width: '100%', height: 'auto' }} /> */}
                            </Box>
                            ))}
                        </Slider>
    
                        <Slider {...thumbnailSliderSettings} ref={slider2}> {/* Thumbnail Slider */}
                            {singleData?.attributes?.images?.map((image, index) => (
                            <Box key={index} sx={{px:1,pt:1,width:'220px'}} onClick={() => handleThumbnailClick(index)}>
                                <OptimizedThumbnailImage
                                src={image.srcUrl}
                                idx={index}
                                mainSliderIdx={mainSlider}
                                placeholder={'https://i0.wp.com/reviveyouthandfamily.org/wp-content/uploads/2016/11/house-placeholder.jpg?ssl=1'} 
                                />
                            </Box>
                            ))}
                        </Slider>
                    </Box>
                }
               
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{pr:5,pl:2,}}>
                <Box sx={{display:'flex',justifyContent:'flex-end',borderBottom:'1px solid grey',p:2}}>
                    <Box>
                        <ShareRounded sx={{mr:2}}/>
                        <FavoriteBorder />
                    </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-end'}}>
                    <Box sx={{mt:2}}>
                    <Typography variant="h3" sx={{fontWeight:'400',mr:1}}>
                    {/* JavaScript's Intl.NumberFormat to format the number with commas as thousands separators */}
                     &#8364;{new Intl.NumberFormat('en-GB').format(singleData?.attributes?.price)}
                    </Typography>
                    </Box>
                    <Box >
                        {
                          ( singleData?.attributes?.algoliaData?.bedroom && singleData?.attributes?.floorarea_max ) ?
                          <Typography variant="h6" sx={{pb:1}}>
                            {singleData?.attributes?.algoliaData?.bedroom} bed | {singleData?.attributes?.floorarea_max} sqm
                        </Typography>
                        :''
                        }
                        
                    </Box>
                </Box>
                <Box sx={{my:2}}>
                     <Typography>
                    {singleData?.attributes?.slug.replace(/-/g, " ")}
                </Typography>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-end',my:2}}>
                    <HomeRounded  sx={{mr:'3px',color:'#d2b375 !important'}} />
                    <Link  href="#" sx={{color:'#d2b375',textDecorationColor:'#d2b375'}}>
                    Please contact us
                    </Link>
                </Box>
                <Box sx={{my:2}}>
                    <Button sx={{
                        height:'40px',
                        backgroundColor:'black',
                        width:'100%',
                        color:'white',
                        borderRadius:'0px'
                    }}>
                        CONTACT AGENT
                    </Button>
                </Box>
                <Box sx={{
                    borderBottom:'1px solid grey',
                    pb:2
                }}>
                    <Typography variant="h5" sx={{fontWeight:'normal'}}>
                        FACTS & FEATURES
                    </Typography>
                </Box>
                <Box sx={{display:'flex',my:2}}>
                    <Box sx={{width:'250px'}}>
                        <Typography sx={{fontWeight:'bold'}}>Neighbourhood:</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{textDecoration:'underline'}}>Fontvieille</Typography>
                    </Box>
                </Box>
                <Box sx={{display:'flex',my:2}}>
                    <Box sx={{width:'250px'}}>
                        <Typography sx={{fontWeight:'bold'}}>Price per sqm:</Typography>
                    </Box>
                    <Box>
                        <Typography>&#8364;37,931</Typography>
                    </Box>
                </Box>
                <Box sx={{display:'flex',my:2}}>
                    <Box sx={{width:'250px'}}>
                        <Typography sx={{fontWeight:'bold'}}>Brochure:</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{textDecoration:'underline'}}>Download Brochure</Typography>
                    </Box>
                </Box>
                <Box sx={{display:'flex',my:2}}>
                    <Box sx={{width:'250px'}}>
                        <Typography sx={{fontWeight:'bold'}}>Floor Plan:</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{textDecoration:'underline'}}>View Floorplan</Typography>
                    </Box>
                </Box>
                <Box sx={{mt:3,
                }}>
                   <Box sx={{
                    height: showMore ? 'auto':'195px',
                    overflow:'hidden'
                   }}>
                   <Typography variant="body1">
                       {
                        singleData?.attributes?.long_description.replace(/(<br\s*\/?>|\*)/gi, '')
                       }
                    </Typography>
                   </Box>
                   <Box sx={{textAlign:'center',mt:2}}>
                    <Button sx={{backgroundColor:'black',borderRadius:'50px',width:'200px',height:'40px',color:'white',textTransform:'none'}} onClick={() => setShowMore((pre) => !pre)}>
                       {
                        showMore ? 'Show Less' : ' Show More'
                       }
                    </Button>
                   </Box>
                </Box>
                <Box sx={{display:'flex'}}>
                    <Box sx={{
                        width:'80px',
                        height:'100px'
                    }}>
                        <Avatar
                          alt="Profile Picture"
                          src={'#'}  
                          sx={{ width: 56, height: 56 }}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{fontWeight:'bold'}}>Reka Demeter</Typography>
                        <Typography sx={{fontSize:'14px'}}>Real Estate Broker</Typography>
                        <Typography >+377 93 25 86 66 | Email</Typography>
                    </Box>
                </Box>
                <Box>
                    {/* here i'm just one dummy google link to cover the design */}
                    <iframe src={'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d12005.562663362187!2d77.34355289715052!3d11.115342436241953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDA2JzU5LjYiTiA3N8KwMjAnNTcuMiJF!5e0!3m2!1sen!2sin!4v1691400749922!5m2!1sen!2sinhttps://www.google.com/maps/place/Valasaravakkam,+Chennai,+Tamil+Nadu+600087/@13.0402924,80.1527859,4988m/data=!3m2!1e3!4b1!4m9!1m2!2m1!1spink+womens+hostel+chennai!3m5!1s0x3a526130ee5d7a2b:0x2e22e53ce9c67720!8m2!3d13.0402725!4d80.1722913!16zL20vMGY2bGtn?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D'} height="200" width="100%" title="property location"></iframe>
                </Box>
            </Grid>
        </Grid>
        </>
    )
}
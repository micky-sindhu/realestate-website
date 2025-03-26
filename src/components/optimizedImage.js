import React ,{useState} from "react";
import { useNavigate } from 'react-router-dom';


export default function OptmizedImageComp({ src, alt, placeholder,id }) {
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(placeholder);  
  };

  const handleDynamicContent = (propertyId) => {
    navigate(`/details/${propertyId}`)
  }
    return(
        <img
        src={imgSrc}
        alt={alt}
        id={id}
        onError={handleError}  //this will handle the error part if the source code not working like that
        style={{ width: '100%', height: '100%',objectFit: 'cover',cursor:'pointer' }} 
        loading="lazy" //images are only loaded when they come into view.
        onClick={(e) => {handleDynamicContent(e.target.id)}}
      />
    )
}
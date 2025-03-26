import React ,{useState} from "react";
import { useNavigate } from 'react-router-dom';


export default function OptimizedSliderImage({ src, alt, placeholder,idx }) {
        const [imgSrc, setImgSrc] = useState(src);
    
      const handleError = () => {
        setImgSrc(placeholder);  
      };
  return (
<img src={imgSrc} alt={`Image ${idx}`} style={{ width: '100%', height: 'auto',objectFit: 'cover' }} onError={handleError} />
  )
}
import React ,{useState} from "react";
import { useNavigate } from 'react-router-dom';


export default function OptimizedThumbnailImage({ src, alt, placeholder,idx ,mainSliderIdx}) {
        const [imgSrc, setImgSrc] = useState(src);
    
      const handleError = () => {
        setImgSrc(placeholder);  
      };
  return (
    <img
    src={imgSrc}
    alt={`Thumbnail ${idx}`}
    style={{
        width: '100%',
        height: 'auto',
        cursor: 'pointer',
        borderRadius:'10px',
        border: mainSliderIdx === idx ? '2px solid #000' : 'none', 
    }}
    onError={handleError} 
    />
  )
}
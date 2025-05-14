import React, {useEffect} from 'react'
import './Shopbyage_card.css'
import { useNavigate } from 'react-router-dom'

const Shopbyage_card = ({txt, txt_color}) => {
  
 //to scroll page up
 useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  
  const navigate = useNavigate();
  const goToProduct = () => {
    navigate(`/product/${txt}`)
    console.log("Navigating to:", `/product/:${txt}`)
  }

  return (
    <div className="shopagecard" onClick={goToProduct} style={{cursor: 'pointer'}}>
        <div  style={{color:txt_color, fontFamily: "Matemasie"}}>{txt}</div>
    </div>
  )
}

export default Shopbyage_card;

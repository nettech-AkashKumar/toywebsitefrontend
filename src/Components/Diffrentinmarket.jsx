import React from 'react';
import './Diffrentinmarket.css';


const Diffrentinmarket = ({ bg, circle_bg, icon, txt }) => {
    return (


        <div className="diffrent-in-matket-card " style={{ backgroundColor: bg }}>
            <div class="differenticoncontainer" style={{backgroundColor:circle_bg}} >
                <img className='img-fluid diffrentmarketimg' src={icon} alt="diffrentmarketimg" />
            </div>
            <div><h4 className='m-0'>{txt}</h4></div>
        </div>


    )
}

export default Diffrentinmarket

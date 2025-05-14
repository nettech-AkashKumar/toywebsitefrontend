import React from 'react';
import '../SwiperCart/SwiperCart.css';
import { LuHeart } from "react-icons/lu";

const SwiperCart = ({ imageUrl }) => {
    return (
        <div className="swipercard">
            {/* Heart Icon */}
            <LuHeart className="swipercard-heart" />

            {/* Image Container */}
            <div className="swiperimg-container">
                <img src={imageUrl} alt="" className="swipercardimg" />
            </div>

        </div>
    );
};

export default SwiperCart;
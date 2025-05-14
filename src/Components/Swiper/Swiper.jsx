import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import '../Swiper/Swiper.css'
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from 'swiper/modules';
import SwiperCart from "./SwiperCart/SwiperCart";
import swipercartdata from '../Swiper/Swiperdata.json';


const Swipers = () => {
    return (
        <>
            <div className="swiper-container">
                <Swiper pagination={true} modules={[Pagination]} className="mySwiper d-lg-none d-md-none">
                    {swipercartdata.map((item, index) => (
                        <SwiperSlide key={index}>
                            <SwiperCart imageUrl={item.image_url} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default Swipers;
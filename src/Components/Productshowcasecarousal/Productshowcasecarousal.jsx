import React, { useState, useEffect } from "react";
import "./ProductshowcaseCarousal.css";
import { Link } from "react-router-dom";
import crazy from '../../../src/Assets/Image/crazy.jpg'
import boys from '../../../src/Assets/Image/boys.jpg'

const images = [
    {
        image: "https://i.postimg.cc/fRvVbBrg/front-view-cute-child-adorable-sweet-holding-paper-plane-blue-desk.jpg",
        title: "Trendy Kids' Wear!",
        desc: `Latest trendy outfits for your kids.`,
        shopnowbtn: '/product/kids/Topwear'
    },
    {
        image: "https://i.postimg.cc/yN1cxYZC/little-football-player-woman-isolated-white-wall-celebrating-victory.jpg",
        title: "Gear Up for Victory!",
        desc: `Shop now and take your game to the next level.`,
        shopnowbtn: '/product/Girls/SportsWear'
    },
    {
        image: "https://i.postimg.cc/pdB75ZXc/young-girl-red-t-shirt-jean-jacket-showing-rock-n-roll-gesture-looking-cute-front-view.jpg",
        title: "Style Meets Comfort!",
        desc: `Trendy collection of top wear.`,
        shopnowbtn: '/product/Girls/Topwear'
    },
    {
        image: "https://i.postimg.cc/KjyW3Mr8/baby-boy-6-months-old-blu-clothes-smiling-sitting-white-bed-home.jpg",
        title: "Adorable Outfits for Your Little One!.",
        desc: `Comfort meets style.`,
        shopnowbtn: '/product/kids/Topwear'
    },
    {
        image: "https://i.postimg.cc/C18tKN82/attractive-boy-with-colorful-toy-parrot.jpg",
        title: `Unlimited Fun with Amazing Toys!`,
        desc: "Discover a world of joy.",
        shopnowbtn: '/product/toy'
    },
    {
        image: boys,
        title: "Unleash Your Fashion Game!",
        desc: `Stay stylish.`,
        shopnowbtn: '/product/Boys/Topwear'
    },
    {
        image: crazy,
        title: "Modern Looks for Every Occasion!",
        desc: `From chic casuals to statement pieces.`,
        shopnowbtn: '/product/Boys/sportswear'
    },
    {
        image: "https://i.postimg.cc/1z22PT86/close-up-view-little-female-girl-lying-bed-looking-camera.jpg",
        title: "Chic & Trendy Hair Accessories!",
        desc: `Perfect for any occasion.`,
        shopnowbtn: '/product/Hairaccess'
    }
];

const ProductCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 3000);
        return () => clearInterval(interval)
    }, [])


    return (
        <div>
            <div className="carousel-container">
                <div className="carouselshowcase">
                    <div className="slide-content-cont">
                        <div className="slider-content" style={{ backgroundImage: `url(${images[currentIndex].image})` }}>
                        </div>
                        <div className="content">
                            <div className="animated-title" data-text={images[currentIndex].title}>{images[currentIndex].title}</div>
                            <div className="carousel-desc">{images[currentIndex].desc}</div>
                            {images[currentIndex].shopnowbtn && (
                                <Link to={images[currentIndex].shopnowbtn} className="shop-now-btn">Shop Now</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;

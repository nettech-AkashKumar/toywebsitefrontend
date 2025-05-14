import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Multicarousal.css'
import kids from '../../../src/Assets/Image/1.jpg'
import Topwear from '../../../src/Assets/Image/boytopwear.jpg'
import kidd from '../../../src/Assets/Image/kids.jpg'
import Sports from '../../../src/Assets/Image/sportsgirl.jpg'
import boy from '../../../src/Assets/Image/boy.jpg'

const Multicarousal = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <>
            <div className='multicarousel-container'>
                <h2 className='multicarousal-title'>Trending Product</h2>
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={1000}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                >
                    <div className='multiproduct-card'>
                        <img className='multiproduct-image' src={Sports} alt="firstcardimg" />
                        <h2 className='sportstitle'>Sports T-shirt's</h2>
                        {/* <p className='price'>$20.99</p>
                        <p className='multiproductaddtocart'><button>Add to Cart</button></p> */}
                    </div>
                    <div className='multiproduct-card'>
                        <img className='multiproduct-image' src={Topwear} alt="firstcardimg" />
                        <h2 className='sportstitle'> Top Wear's</h2>
                        {/* <p className='price'>$35.66</p>
                        <p className='multiproductaddtocart'><button>Add to Cart</button></p> */}
                    </div>
                    <div className='multiproduct-card'>
                        <img className='multiproduct-image' src={kids} alt="firstcardimg" />
                        <h2 className='sportstitle'>kids wear's</h2>
                        {/* <p className='price'>$24.55</p>
                        <p className='multiproductaddtocart'><button>Add to Cart</button></p> */}
                    </div>
                    <div className='multiproduct-card'>
                        <img className='multiproduct-image' src={kidd} alt="firstcardimg" />
                        <h2 className='sportstitle'>Kids Shoes</h2>
                        {/* <p className='price'>$12.44</p>
                        <p className='multiproductaddtocart'><button>Add to Cart</button></p> */}
                    </div>
                    <div className='multiproduct-card'>
                        <img className='multiproduct-image' src={boy} alt="firstcardimg" />
                        <h2 className='sportstitle'>Boys T-shirt's</h2>
                        {/* <p className='price'>$12.44</p>
                        <p className='multiproductaddtocart'><button>Add to Cart</button></p> */}
                    </div>
                </Carousel>
            </div>
        </>
    )
}

export default Multicarousal

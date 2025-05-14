// import React from 'react';
// import { useSelector } from 'react-redux';
// import "../../Pages/Whishlist/Whishlist.css";
// import Whishlist_Card from './Whishlist_Card';
// import Heroallpages2 from '../../Components/Heroallpages2/Heroallpages2';
// import SidebarAllpages from '../../Components/SidebarAllpages/SidebarAllpages';

// const Whislist = () => {
//     const wishlist = useSelector((state) => state.wishlist.wishlist);

//     return (
//         <div>
//             <Heroallpages2 profile_nav="Whishlist" />
//             <div className="whishlit-sidebar section-padding pt-0">
//                 <div className='whishlit-sidebar-container bg-white d-flex justify-content-evenly align-items-center' style={{ padding: "20px 30px",color:"var(--text-color)",background:"var(--background)!important",border:"1px solid black" ,borderRadius:"15px" }}>
//                     <div className="leftwhishlist-sideb">
//                         <SidebarAllpages />
//                     </div>
//                     <div className="righttwhishlist-product-card d-flex gap-5 flex-wrap">
//                         {wishlist.length > 0 ? (
//                             wishlist.map((product,index) => (
//                                 <Whishlist_Card
//                                 key={index}
//                                 _id={product._id}
//                                  title={product.title}
//                                  subtitle={product.subtitle}
//                                  oldPrice={product.old_price}
//                                  newPrice={product.new_price}
//                                  levelRange={product.level_range}
//                                  imageUrl={`http://localhost:8081${product.image  ? product.image[0]?.url : "https://wallpapers-clan.com/wp-content/uploads/2022/12/funny-spongebob-gif-pfp-1.gif"}`}
//                                 />
//                             ))
//                         ) : (
//                             <p style={{margin:"0 auto"}}>No items in wishlist</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Whislist;



import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import "../../Pages/Whishlist/Whishlist.css";
import Whishlist_Card from './Whishlist_Card';
import Heroallpages2 from '../../Components/Heroallpages2/Heroallpages2';
import SidebarAllpages from '../../Components/SidebarAllpages/SidebarAllpages';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Whislist = () => {
    const wishlist = useSelector((state) => state.wishlist.wishlist, shallowEqual);
    console.log('wishlist state via wishlist page', wishlist)

    useEffect(() => {
        console.log("Wishlist Updated:", wishlist);
    }, [wishlist]);


    const token = localStorage.getItem("token")?.trim();
    let userId = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.id
        } catch (error) {
            console.error('Error decoding token', error)
        }
    }
    console.log('UserId from token', userId)

    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/wishlist/get`, {
                    params: { userId },
                });
                const fetchedData = response.data.data;
                console.log("API Response Data:", fetchedData); // Log data
                setWishlistItems(fetchedData); // Update state
                console.log("State Updated:", wishlistItems); // Check after setting state
            } catch (error) {
                console.error("Error fetching wishlist data:", error);
            }
        };
        fetchWishlist();
    }, [userId]);


    useEffect(() => {
        console.log("Wishlist Items Updated in State:", wishlistItems);
    }, [wishlistItems]);

    const removeItemFromState = (id) => {
        setWishlistItems(prevItems => prevItems.filter(item => item._id !== id))
    }
    useEffect(() => {
        console.log("Wishlist Items Updated in Statews:", wishlistItems);
    }, [wishlistItems]);
    
    
    return (
        <div>
            <Heroallpages2 profile_nav="Whishlist" />
            <div className="whishlit-sidebar section-padding pt-0">
                <div className='whishlit-sidebar-container bg-white d-flex justify-content-evenly align-items-center' style={{ padding: "20px 30px", color: "var(--text-color)", background: "var(--background)!important", border: "1px solid black", borderRadius: "15px" }}>
                    <div className="leftwhishlist-sideb">
                        <SidebarAllpages />
                    </div>
                    <div className="righttwhishlist-product-card d-flex gap-5 flex-wrap">
                        {console.log('wishlist items from wishlist.jsx', wishlistItems)}
                        {wishlistItems.length > 0 ? (
                            wishlistItems.map((product, index) => {
                                console.log('product from wishlist.jsx', product)
                                return (
                                    <Whishlist_Card
                                        key={index}
                                        _id={product._id} //wishlist id
                                        productId={product.productId?._id} // actual product ID
                                        title={product.title}
                                        subtitle={product.subtitle}
                                        oldPrice={product.old_price}
                                        newPrice={product.new_price}
                                        levelRange={product.level_range}
                                        imageUrl={`http://localhost:8081${product.image ? product.image[0]?.url : "https://wallpapers-clan.com/wp-content/uploads/2022/12/funny-spongebob-gif-pfp-1.gif"}`}
                                        removeItemFromState={removeItemFromState}
                                    />
                                    // console.log('wishlisrtid', product._id) 
                                )
                            })
                        ) : (
                            <p style={{ margin: "0 auto" }}>No items in wishlist</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Whislist;






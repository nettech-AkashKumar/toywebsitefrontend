import React, { useEffect, useState } from 'react';
import Heroallpages2 from '../../Components/Heroallpages2/Heroallpages2';
import { FaCheck } from "react-icons/fa6";
import '../../Pages/Address_book/Address_book.css'
import SidebarAllpages from '../../Components/SidebarAllpages/SidebarAllpages';
import Whishlist_Card from "../../Pages/Whishlist/Whishlist_Card";
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config/config';

const RecentActivity = () => {

    //for recent activity
    const [recentProducts, setRecentProducts] = useState([])
    useEffect(() => {
      const storedProducts = JSON.parse(localStorage.getItem("recentActivity")) || []
      setRecentProducts(storedProducts)
    }, []);

    //remove wishlist items from page
    const removeItemFromState = (_id) => {
      const updatedProducts = recentProducts.filter(product => product._id !== _id)
      setRecentProducts(updatedProducts)
      localStorage.setItem("recentActivity", JSON.stringify(updatedProducts))
    }
    

  return (
    <div>
      <Heroallpages2 profile_nav="Recent Activity"/>
      <div className="whishlit-sidebar section-padding pt-0">
           <div className='whishlit-sidebar-container bg-white d-flex justify-content-evenly' style={{padding:"20px 30px"}}>
           <div className="leftwhishlist-sideb">
            <SidebarAllpages/>
           </div>
           <div className="righttwhishlist-product-card d-flex gap-5">

         <div >
         <div className='' style={{marginLeft: '40px'}}>
         <div className='d-flex flex-row gap-2 py-4'>
            <button style={{backgroundColor:"#8565d1", color:"white", border:"none", borderRadius:"2px", padding:"4px 10px", borderRadius:"5px"}}><FaCheck /> Browsing History</button>
          </div>
          <div className='d-flex gap-5 flex-wrap'>
          {recentProducts?.map((product, index) => (
         <Whishlist_Card
        key={index} // Unique key for React
        productId={product._id} // actual product ID
        title={product.title}
        subtitle={product.subtitle}
        oldPrice={product.old_price}
        newPrice={product.new_price}
        levelRange={product.level_range}
        imageUrl={`${BASE_URL}${product.image ? product.image[0]?.url : "https://wallpapers-clan.com/wp-content/uploads/2022/12/funny-spongebob-gif-pfp-1.gif"}`}
        removeItemFromState={() => removeItemFromState(product._id)}
       />
      ))}
          </div>
         </div>

         </div>
           </div>
           </div>
           
          </div>

    </div>
    
  );
}

export default RecentActivity;

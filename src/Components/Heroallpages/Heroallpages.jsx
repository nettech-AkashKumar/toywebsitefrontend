// // import React from 'react';
// // import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// // import { Link } from 'react-router-dom';

// // const Heroallpages = ({ hero_nav, heroallpageimg, link}) => {
// //   return (
// //     <div>
// //       <div className='toys-hero-section section-padding'>
// //         <div className="herotext d-flex align-items-center gap-2">
// //          <Link to='/' style={{color:"#212529"}}><p>Home<MdOutlineKeyboardArrowRight /></p></Link>
// //           <p>Categories<MdOutlineKeyboardArrowRight /></p>
// //           <Link to={link}><p style={{textDecoration:"underline"}}>{hero_nav}<MdOutlineKeyboardArrowRight /></p></Link>
// //         </div>
// //         <div>
// //           <img className='w-100' src={heroallpageimg} alt="herotoysimage" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Heroallpages;



// import React from "react";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import { Link } from "react-router-dom";
// import Boysfootwearbanner from "../../Assets/Banner/boysfootwearbanner.png";
// import Boyssportwearbanner from "../../Assets/Banner/boyssportswearbanner.png";
// import Girlsfootwearbanner from "../../Assets/Banner/girlsFootWearBanner.png";
// import Girlssportwearbanner from "../../Assets/Banner/girlsSportsWearBanner.png";
// import Girlstopwearbanner from "../../Assets/Banner/girlsTopWearBanner.png";
// import BoysTopWearBanner from "../../Assets/Banner/boysTopWearBanner.png";
// import KidsTopWearBanner from "../../Assets/Banner/kidsTopWearBanner.png";
// import KidsToysBanner from "../../Assets/Banner/kidsToysBanner.png";
// import KidsFootWearBanner from "../../Assets/Banner/kidsFootWearBanner.png";
// import HairPageBanner from "../../Assets/Banner/hairpagebanner.png";
// import StationaryBanner from "../../Assets/Banner/stationarybanner.png";
// import ToysBanner from "../../Assets/Banner/toysbanner.png";
// import FootBanner from "../../Assets/Banner/Footwearbanner.jpeg"


// const Heroallpages = ({ hero_nav, myBanner, link }) => {
//   console.log(hero_nav, myBanner, link);

//   const componentMap = {
//     boysfootwear: Boysfootwearbanner,
//     boyssportswear: Boyssportwearbanner,
//     girlsfootwear: Girlsfootwearbanner,
//     girlssportwear: Girlssportwearbanner,
//     girlstopwear: Girlstopwearbanner,
//     boystopwear: BoysTopWearBanner,
//     kidstopwear: KidsTopWearBanner,
//     kidstoyswear: KidsToysBanner,
//     kidsfootWear: KidsFootWearBanner,
//     hairpagewear: HairPageBanner,
//     "ToysBanner": ToysBanner,
//     Stationary: StationaryBanner,
//     hairaccess: HairPageBanner,
//     footwear: FootBanner,
//     kidswear: KidsTopWearBanner,
//     "hair access": HairPageBanner,
//     toy: ToysBanner
    
//   };
//   console.log("componentMap", componentMap);

//   console.log("myBanner", myBanner);
//   console.log();
//   return (
//     <div>
//       <div className="toys-hero-section section-padding">
//         <div className="herotext d-flex align-items-center gap-2">
//           <Link to="/" style={{ color: "#212529" }}>
//             <p>
//               Home
//               <MdOutlineKeyboardArrowRight />
//             </p>
//           </Link>
//           <p>
//             Categories
//             <MdOutlineKeyboardArrowRight />
//           </p>
//           <Link to={link}>
//             <p style={{ textDecoration: "underline" }}>
//               {hero_nav}
//               <MdOutlineKeyboardArrowRight />
//             </p>
//           </Link>
//         </div>
//         <div>
//           <img
//             className="w-100"
//             src={componentMap[myBanner]}
//             alt="herotoysimage"
//             style={{ borderRadius: "8px" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Heroallpages;



import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Boysfootwearbanner from "../../Assets/Banner/boysfootwearbanner.png";
import Boyssportwearbanner from "../../Assets/Banner/boyssportswearbanner.png";
import Girlsfootwearbanner from "../../Assets/Banner/girlsFootWearBanner.png";
import Girlssportwearbanner from "../../Assets/Banner/girlsSportsWearBanner.png";
import Girlstopwearbanner from "../../Assets/Banner/girlsTopWearBanner.png";
import BoysTopWearBanner from "../../Assets/Banner/boysTopWearBanner.png";
import KidsTopWearBanner from "../../Assets/Banner/kidsTopWearBanner.png";
import KidsToysBanner from "../../Assets/Banner/kidsToysBanner.png";
import KidsFootWearBanner from "../../Assets/Banner/kidsFootWearBanner.png";
import HairPageBanner from "../../Assets/Banner/hairpagebanner.png";
import StationaryBanner from "../../Assets/Banner/stationarybanner.png";
import ToysBanner from "../../Assets/Banner/toysbanner.png";
import FootBanner from "../../Assets/Banner/Footwearbanner.jpeg";
import ZeroFive from "../../Assets/Banner/zerofive.png"
import Sixteen from "../../Assets/Banner/sixten.png"
import ElevenFiveteen from "../../Assets/Banner/elevenfifeteen.png"
import SixteenTwenty from "../../Assets/Banner/sixteentwenty.png"

const Heroallpages = ({ hero_nav, myBanner, link }) => {
  const componentMap = {
    boysfootwear: Boysfootwearbanner,
    boyssportswear: Boyssportwearbanner,
    girlsfootwear: Girlsfootwearbanner,
    girlssportwear: Girlssportwearbanner,
    girlstopwear: Girlstopwearbanner,
    boystopwear: BoysTopWearBanner,
    kidstopwear: KidsTopWearBanner,
    kidstoyswear: KidsToysBanner,
    kidsfootWear: KidsFootWearBanner,
    hairpagewear: HairPageBanner,
    ToysBanner: ToysBanner,
    Stationary: StationaryBanner,
    hairaccess: HairPageBanner,
    footwear: FootBanner,
    kidswear: KidsTopWearBanner,
    ZeroFive: ZeroFive,
    Sixteen: Sixteen,
    ElevenFiveteen: ElevenFiveteen,
    SixteenTwenty: SixteenTwenty,
    "hair access": HairPageBanner,
    toy: ToysBanner,
  };
  console.log('my Banner', myBanner)

  return (
    <div>
      <div className="toys-hero-section section-padding">
        <div className="herotext d-flex align-items-center gap-2">
          <Link to="/" style={{ color: "#212529" }}>
            <p>
              Home
              <MdOutlineKeyboardArrowRight />
            </p>
          </Link>
          <p>
            Categories
            <MdOutlineKeyboardArrowRight />
          </p>
          <Link to={link}>
            <p style={{ textDecoration: "underline" }}>
              {hero_nav}
              <MdOutlineKeyboardArrowRight />
            </p>
          </Link>
        </div>
        <div>
          <img
            className="w-100"
            src={componentMap[myBanner]}
            alt="herotoysimage"
            style={{ borderRadius: "8px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Heroallpages;



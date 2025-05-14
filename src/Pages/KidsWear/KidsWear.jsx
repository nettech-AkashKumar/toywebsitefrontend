import React from "react";
import Heroallpages from "../../Components/Heroallpages/Heroallpages";
import KidsWearbanner from "../../Assets/Banner/kidswearBanner.png";
import Kidsfilter from "../../Components/Kidswearfilter/Kidsfilter";
import Toyscuratedcarousel from "../Toys/Toyscuratedcarousel";

const KidsWear = () => {
  return (
    <div>
      <Heroallpages
        link="/stationary"
        hero_nav="Kids Wear"
        heroallpageimg={KidsWearbanner}
      />
      <div className="section-padding">
        <Kidsfilter />
        <div style={{ paddingBottom: "300px" }}>
          <Toyscuratedcarousel />
        </div>
      </div>
    </div>
  );
};

export default KidsWear;

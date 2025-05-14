import React, {useState, useEffect } from "react";
import Heroallpages from "../../Components/Heroallpages/Heroallpages";
import { useProductContext } from "../../context/Products/Product";
import { useParams } from "react-router-dom";
import FilterPAGE from "../../Components/Filter/FilterPAGE";
import NewArrivalsCarousel from "../../Components/NewArrivalsCarousel";
import ScrollButton from "../../Components/ScrollButton/ScrollButton";
import axios from "axios"



const Product = () => {

  const [storedProduct, setStoredProduct] = useState([])
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await axios.get("/")
        console.log('pdata', data)
        if(data.data.success) {
          setStoredProduct(data.data.data);
        }
      } catch(error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchProducts();
  }, []);

  const { getCategoryProduct, isSingleLoading, categoryProduct } =
    useProductContext();

  const { getTargetProduct, isTargetLoading, targetProduct } =
    useProductContext();

    const {getLevelRange, isLevelLoading, level_range} = useProductContext();

  const { category, target } = useParams();

  const normalizedCategory = category ? category.toLowerCase() : "";
  const normalizedTarget = target ? target.toLowerCase() : "";

  useEffect(() => {
    if (category && storedProduct) {
      getCategoryProduct(storedProduct, category.toLowerCase());
    }
  }, [storedProduct, category]);

  useEffect(() => {
    if (category && target && storedProduct) {
      getTargetProduct(storedProduct, target, category);
    }
  }, [storedProduct, category, target]);

  useEffect(() => {
    if(level_range && storedProduct) {

    }
  })

  console.log("CATEGORY", categoryProduct);
  console.log("TARGET", targetProduct);

  let categoryProductz = getCategoryProduct(storedProduct, category);
  // console.log('getCategoryProduct', categoryProductz)

  let targetProductz = getTargetProduct(storedProduct, target, category);
  // console.log('getTargetProduct', targetProductz)

  let levelrangez = getLevelRange(storedProduct,  category);

  const heroData = {
    boystopwear: { hero_nav: "Boys Topwear", myBanner: "boystopwear" },
    boyssportswear: { hero_nav: "Boys Sportswear", myBanner: "boyssportswear" },
    boysfootwear: { hero_nav: "Boys Footwear", myBanner: "boysfootwear" },
    girlstopwear: { hero_nav: "Girls Topwear", myBanner: "girlstopwear" },
    girlssportswear: {
      hero_nav: "Girls Sportwear",
      myBanner: "girlssportwear",
    },
    girlsfootwear: { hero_nav: "Girls Footwear", myBanner: "girlsfootwear" },
    kidstopwear: { hero_nav: "kidstopwear", myBanner: "kidstopwear" },
    kidstoy: { hero_nav: "kidstoys", myBanner: "kidstoyswear" },
    kidsfootwear: { hero_nav: "kidsfootWear", myBanner: "kidsfootWear" },
    toy: { hero_nav: "Toy", myBanner: "ToysBanner " },
    stationary: { hero_nav: "Stationary", myBanner: "Stationary" },
    hairaccess: { hero_nav: "Hair Accessories", myBanner: "hairaccess" },
    footwear: { hero_nav: "Foot Wear", myBanner: "footwear" },
    kidswear: { hero_nav: "kids Wear", myBanner: "kidswear" },
    "hair access": { hero_nav: "Hair Access", myBanner: "hair access" },
    toy: { hero_nav: "Toys", myBanner: "toy" },
    "0-5": {hero_nav: "0-5", myBanner: "ZeroFive"},
    "6-10": {hero_nav: "6-10", myBanner: "Sixteen"},
    "11-15": {hero_nav: " 11-15", myBanner: "ElevenFiveteen"},
    "16-20": {hero_nav: " 16-20", myBanner: "SixteenTwenty"}
  };

  const key = `${normalizedTarget + normalizedCategory}`;
  const { hero_nav, myBanner } = heroData[key] || {
    hero_nav: category || "default",
    myBanner: "default",
  };
  console.log("hero_nav", hero_nav);
  console.log("Key", key);

  return (
    <>
      {" "}
      <div>
        <Heroallpages hero_nav={hero_nav} myBanner={myBanner} />
        <div className="section-padding">
          {categoryProductz?.length > 0 && target === undefined ? (
            <FilterPAGE data={categoryProductz} />
          ) : targetProductz?.length > 0 ? (
            <FilterPAGE data={targetProductz} />
          ) : levelrangez?.length > 0 ? (
            <FilterPAGE data={levelrangez} isage={false}
            />
          ) :(
            <h1>LOADING</h1>
          )}
          <div style={{ paddingBottom: "300px" }}>
            {categoryProductz?.length > 0 && target === undefined ? (
            <NewArrivalsCarousel arrivaltitle={"Curated for you"} data={categoryProductz} />
            ) : targetProductz?.length > 0 ? (
              <NewArrivalsCarousel arrivaltitle={"Curated for you"} data={targetProductz} />
            )
          : (
            <p>Loading</p>
          )}
          </div>
        </div>
      </div>
      <div style={{position:"fixed", zIndex:"1" ,right:"40px", bottom:"100px"}}>
        <ScrollButton/>
      </div>
    </>
  );
};

export default Product;

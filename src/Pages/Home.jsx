import React, { useState, useEffect } from "react";
// import Footer from "../Components/Footer/Footer";
import Fun from "../Components/Fun/Fun";
import Categories from "../Components/Categories/Categories";
import Carousal from "../Components/Carousal/Carousal";
import Brandimg from "../Assets/Image/brandimg.png";
import "./Home.css";
import { FcGoogle } from "react-icons/fc";
import { FaStar } from "react-icons/fa6";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import reviewsimg from "../Assets/Image/reviewsimg.png";
import playimagereviwes from "../Assets/Image/reviewsrightimg.png";
import Diffrentinmarket from "../Components/Diffrentinmarket";
import "../Components/Diffrentinmarket.css";
import diffrentmarketimg from "../Assets/Image/differentmartketicon-1.png";
import diffrentmarketimg2 from "../Assets/Image/differentmartketicon-2.png";
import diffrentmarketimg3 from "../Assets/Image/differentmartketicon-3.png";
import diffrentmarketimg4 from "../Assets/Image/differentmartketicon-4.png";
import Shopbyage_card from "../Components/Shopbyage_card";
import "../Components/Shopbyage_card.css";
import NewArrivalsCarousel from "../Components/NewArrivalsCarousel";
import "../Components/NewArrivalsCarousel.css";
import Filter_Section from "../Components/Fillter_Section/Filter_Section";
import reviwe_rightimg from "../../src/Assets/Image/review-right-div-img.png";
import ScrollButton from "../Components/ScrollButton/ScrollButton";
import axios from "axios";

const Home = () => {
  const [newArrival, setNewArrival] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await axios.get("/");
        console.log("responsedata", data);
        if (data.data.success) {
          setNewArrival(data.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log("new arrival", newArrival);

  //filter product by current date
  const filteredProduct = newArrival.filter(productFilter).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  function productFilter(product) {
    const productDate = new Date(product.createdAt);
    const currentDate = new Date();

    const productLatestDays = new Date();
    productLatestDays.setDate(currentDate.getDate() - 2);

    return productDate >= productLatestDays;
  }

  console.log("filterproduct", filteredProduct);

  return (
    <div>
      {/* Fun-start-here */}
      <Fun />
      {/* Fun-end */}
      <div className="onmobile-reverse">
        {/* Categories-start-here */}
        <Categories />
        {/* Categories-end */}
        {/* Carousal-start-here */}
        <Carousal />
        {/* Carousal-end */}
      </div>
      {/* fillter-section-start */}
      <div className="section-padding filter-none">
        <Filter_Section />
      </div>
      {/* fillter-section-end */}
      {/* Shop by age?-start */}
      <div className="shop-by-age section-padding ">
        <div className="d-flex  justify-content-center  pb-5 shopbyagetxt">
          <h3>Shop by age</h3>
        </div>
        <div className="d-flex justify-content-evenly  gap-4 Shopbyage_card_none">
          <Shopbyage_card txt="0-5" txt_color="#7F3C9E" />
          <Shopbyage_card txt="6-10" txt_color="#503C9E" />
          <Shopbyage_card txt="11-15" txt_color="#5B9E3C" />
          <Shopbyage_card txt="16-20" txt_color="#3C8C9E" />
          {/* <Shopbyage_card txt="17-20" txt_color="#3C529E" /> */}
        </div>
      </div>
      {/* Shop by age?-end */}

      {/* new-arrival-section?-start */}
      <div className="NewArrivalsCarousel section-padding">
        <NewArrivalsCarousel arrivaltitle="New Arrival" data={filteredProduct} />
      </div>
      {/* new-arrival-section?-end */}

      {/* diffrent-in-market-section-start? */}
      <div className="different-in-market-section section-padding justify-content-between">
        <div className="d-flex justify-content-center pb-5">
          <h3 className="text-center">
            What makes us different in the market?
          </h3>
        </div>
        <div className="d-flex justify-content-evenly flex-wrap gap-3 diffrentmarketcard">
          <Diffrentinmarket
            bg="#F2F3E4"
            circle_bg="#EBEDCC"
            icon={diffrentmarketimg}
            txt="Affordable price"
          />
          <Diffrentinmarket
            bg="#EDE4F3"
            circle_bg="#E6D5F2"
            icon={diffrentmarketimg2}
            txt="Quality"
          />

          <Diffrentinmarket
            bg="#E4EDF3"
            circle_bg="#D3E5F2"
            icon={diffrentmarketimg3}
            txt="Kid Safety"
          />
          <Diffrentinmarket
            bg="#E4F2F3"
            circle_bg="#D1EFF1"
            icon={diffrentmarketimg4}
            txt="Offers"
          />
        </div>
      </div>

      {/* diffrent-in-market-section-end? */}
      {/* reviwes-section-start? */}
      <div
        className="reviwes-section section-padding d-flex 
       align-items-center position-relative gap-5"
      >
        <div>
          <div className="text-center pt-5 pb-5">
            <p>1.1K Happy customers</p>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <FcGoogle />
              <b>Latest reviews</b>
            </div>
          </div>
          <div className="reviews-wrapper-card d-flex gap-5">
            <div className="reviews-card 1">
              <div className="reviewesbx">
                <div className="reviewstar">
                  <FaStar /> <FaStar /> <FaStar />
                </div>
                <div className="VerifiedPurchase">
                  <IoCheckmarkOutline /> Verified Purchase
                </div>
                <div>
                  <b>Amazing</b>
                </div>
                <div>
                  <p className="m-0" style={{ fontSize: "15px" }}>
                    I brought for my 6 years old girl..{" "}
                  </p>
                  <p>
                    <a
                      href="#"
                      className="text-decoration-none text-secondary showmoretxt m-0"
                    >
                      Show more
                      <RiArrowDropDownLine />
                    </a>
                  </p>
                </div>
                <div className="d-flex gap-3">
                  <div>
                    <img src={reviewsimg} alt="reviewsimg" />
                  </div>
                  <div style={{ lineHeight: "22px" }}>
                    <b className="reviewname">Harshvardhan Singh</b>
                    <p className="reviewdate">3/9/2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reviews-card 2">
              <div className="reviewesbx">
                <div className="reviewstar">
                  <FaStar /> <FaStar /> <FaStar />
                </div>
                <div className="VerifiedPurchase">
                  <IoCheckmarkOutline /> Verified Purchase
                </div>
                <div>
                  <b>Awesome</b>
                </div>
                <div>
                  <p className="m-0" style={{ fontSize: "15px" }}>
                    I brought for my 6 years old girl..{" "}
                  </p>
                  <p>
                    <a
                      href="#"
                      className="text-decoration-none text-secondary showmoretxt m-0"
                    >
                      Show more
                      <RiArrowDropDownLine />
                    </a>
                  </p>
                </div>
                <div className="d-flex gap-3">
                  <div>
                    <img src={reviewsimg} alt="reviewsimg" />
                  </div>
                  <div style={{ lineHeight: "22px" }}>
                    <b className="reviewname">Sumit</b>
                    <p className="reviewdate">5/9/2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reviews-card 3">
              <div className="reviewesbx">
                <div className="reviewstar">
                  <FaStar /> <FaStar /> <FaStar />
                </div>
                <div className="VerifiedPurchase">
                  <IoCheckmarkOutline /> Verified Purchase
                </div>
                <div>
                  <b>Best</b>
                </div>
                <div>
                  <p className="m-0" style={{ fontSize: "15px" }}>
                    I want to thank toy owner{" "}
                  </p>
                  <p>
                    <a
                      href="#"
                      className="text-decoration-none text-secondary showmoretxt m-0"
                    >
                      Show more
                      <RiArrowDropDownLine />
                    </a>
                  </p>
                </div>
                <div className="d-flex gap-3">
                  <div>
                    <img src={reviewsimg} alt="reviewsimg" />
                  </div>
                  <div style={{ lineHeight: "22px" }}>
                    <b className="reviewname">Ilma sheikh</b>
                    <p className="reviewdate">6/9/2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="review-right-div">
          <img className="" src={reviwe_rightimg} alt="reviwe-rightimg" />
        </div>
      </div>
      {/* reviwes-section-end? */}
      {/* brand-story-section-start? */}
      <div className="brand-story-section section-padding d-flex align-items-center">
        <div>
          <h3 className="text-center  pt-5 pb-5 brandstorytxt">Brand Story</h3>

          <div className="brandstorypara">
            <p className=" pt-2 pb-2 fs-6">
              At PlayPlooza, we believe that play is the heart of childhood and
              the foundation of lifelong memories. Founded with a passion for
              bringing joy and creativity into the lives of children, PlayPlooza
              began as a small idea inspired by a family’s love for quality,
              imaginative play.
            </p>
            <p className=" pt-1 pb-1 fs-6">
              Our journey started with a simple goal: to create a space where
              kids could explore, learn, and grow through play. We envisioned a
              toy store that offered more than just products, but an experience
              that nurtures curiosity and sparks imagination. From our carefully
              curated collection of educational toys to our commitment to safe
              and sustainable materials, every item at PlayPlooza is chosen with
              love and care.
            </p>
            <p className=" pt-1 pb-1 fs-6">
              As we’ve grown, so has our commitment to excellence. We take pride
              in offering a diverse range of toys that cater to every age and
              interest, all while maintaining a focus on quality and
              affordability. Our mission is to be a trusted partner in your
              child’s developmental journey, providing them with the tools to
              dream big and explore boldly.
            </p>
            <p className=" pt-1 pb-1 fs-6">
              At PlayPlooza, we’re more than just a toy store—we’re a
              destination where every playtime is an adventure waiting to
              unfold. Join us in celebrating the magic of childhood, one toy at
              a time.
            </p>
          </div>
        </div>
        <div className="brandimg">
          <img src={Brandimg} alt="brandimg" />
        </div>
      </div>
      {/* brand-story-section-end? */}
      {/* <Footer /> */}

      <div
        style={{
          position: "fixed",
          zIndex: "1",
          right: "40px",
          bottom: "100px",
        }}
      >
        <ScrollButton />
      </div>
    </div>
  );
};

export default Home;

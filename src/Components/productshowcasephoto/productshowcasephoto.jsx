import React from "react";
import "./productshowcasephoto.css";
import dirgirl from '../../../src/Assets/Image/dir1.jpg'
import crazy from '../../../src/Assets/Image/crazy.jpg'

const Productshowcasephoto = () => {
  return (
    <div className="productshowcasephoto">
      {/* 1st card */}
      <div className="showcase-card">
        <div className="showcase-text">
          <h2>Exclusive Fashion Picks!</h2>
          <p>Explore the latest trends and must-have styles.</p>
          <p>Find the perfect outfit for any occasion.</p>
          <p>Shop now and stay ahead in fashion!</p>
          <button className="explore-btn">Shop Now</button>
        </div>
        <div className="showcase-image">
          <img
            src="https://i.postimg.cc/1z22PT86/close-up-view-little-female-girl-lying-bed-looking-camera.jpg"
            alt="Avatar"
          />
        </div>
      </div>

      {/* 2nd card */}
      <div className="showcase-card">
        <div className="showcase-text">
          <h2>Exciting Deals Await!</h2>
          <p>Up to 50% off on your favorite products.</p>
          <p>Limited-time offers you don't want to miss!</p>
          <p>Hurry, shop now!</p>
          <button className="explore-btn">Grab the Deal</button>
        </div>
        <div className="showcase-image">
          <img
            src={dirgirl}
            alt="Avatar"
          />
        </div>
      </div>

      {/* 3rd card */}
      <div className="showcase-card">
        <div className="showcase-text">
          <h2>Shop with Confidence</h2>
          <p>Trusted by thousands of happy customers.</p>
          <p>Fast delivery, easy returns, and secure payments.</p>
          <p>Your satisfaction is our priority!</p>
          <button className="explore-btn">Start Shopping</button>
        </div>
        <div className="showcase-image">
          <img
            src="https://i.postimg.cc/HLZjwjHw/front-view-cute-little-kid-pink-dress-smiling-posing.jpg"
            alt="Avatar"
          />
        </div>
      </div>
      {/* 4th card */}
      <div className="showcase-card">
        <div className="showcase-text">
          <h2>Welcome to ShopEase!</h2>
          <p>Your one-stop destination for all your shopping needs.</p>
          <p>Discover amazing deals, top brands, and exclusive discounts.</p>
          <p>Shop anytime, anywhere!</p>
          <button class="explore-btn">Explore Now</button>
        </div>
        <div className="showcase-image">
          <img
            src={crazy}
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Productshowcasephoto;

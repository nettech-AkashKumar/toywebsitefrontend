import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProductShowcase.css";
import { data, useNavigate } from "react-router-dom";
import NewArrivalsCarousel from "../../Components/NewArrivalsCarousel";
import Productshowcasephoto from "../../Components/productshowcasephoto/productshowcasephoto";
import ProductCarousel from "../../Components/Productshowcasecarousal/Productshowcasecarousal";
import Multicarousal from "../../Components/Multicarousal/Multicarousal";

const API =
  "https://gist.githubusercontent.com/abhishekpathaknetario/b986efa9e9f3f8c4d7a91e6c41fa025a/raw/productData.json";

const response = await axios.get(API);
const products = response.data.record.products;
console.log("response", products);

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(API);
      setProducts(response.data.record.products);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const goToProduct = (id) => {
    navigate(`/addtocart/${id}`);
    console.log("Navigating to:", `/addtocart/${id}`);
  };

  return (
    <div>
      <ProductCarousel />
      <Productshowcasephoto />
      <Multicarousal />
      <div className="mt-2">
        <span className="shoppingzone"><span className="hrline">|</span>Big Saving Zone</span>
        <div className="product-showcase">
          {products
            .filter((product) => product.featured)
            .map((product) => (
              <div key={product.id} className="product-card">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => goToProduct(product.id)}
                >
                  <img
                    key={product.id}
                    src={product.image_url[0]}
                    alt={`${product.title} ${product.index + 1}`}
                    style={{ width: "250px", margin: "5px" }}
                  />
                </div>
                {/* <a href={`#product-${product.id}`}>Buy Now</a> */}
                <p>{product.title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;

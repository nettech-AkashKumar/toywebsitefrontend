import React, { useState, useEffect } from "react";
import { useProductContext } from "../../../src/context/Products/Product";
import "./Filter_Section.css";
// import Cardhome from "../Cardhomefilter/Cardhome";
import CardLoader from "../Loader/CardLoader";
import Card from "../Card/Card";
import axios from "axios"
import BASE_URL from "../../config/config";

const Filter_Section = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
  useProductContext();

  const { isLoading, featureProducts } = useProductContext();
  console.log("featurproducts", featureProducts);

  const [storedProduct, setStoredProduct] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await axios.get("/")
        // const data = await axios.get(`${BASE_URL}`)
        console.log('pdata', data)
        if (data.data.success) {
          setStoredProduct(data.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchProducts();
  }, []);

  const categories = [...new Set(storedProduct?.map((item) => item.category))];
  const color = [...new Set(storedProduct?.map((item) => item.color))];
  const age = [...new Set(storedProduct?.map((item) => item.level_range))];

  console.log(storedProduct);

  const [filters, setFilters] = useState({
    category: "",
    color: "",
    age: "",
    sortBy: "",
  });

  // featureProducts.forEach((e) => { console.log("PRODUCT", e.level_range) })

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProducts = storedProduct
    .filter((product) => {
      if (filters.category && filters.category !== "all") {
        return (
          // product?.category.toLowerCase() === filters.category.toLowerCase()
           typeof product?.category === "string" &&
        product.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      return true;
    })
    .filter((product) => {
      if (filters.color) {
        return (
          // product?.color.toLowerCase() ===
          // filters.color.toLowerCase()
           typeof product?.color === "string" &&
        product.color.toLowerCase() === filters.color.toLowerCase()
        );
      }
      return true;
    })
    .filter((product) => {
      if (filters.age) {
        return (
          // product.level_range.toLowerCase() === filters.age.toLowerCase();
           typeof product?.level_range === "string" &&
        product.level_range.toLowerCase() === filters.age.toLowerCase()
        )
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.new_price - b.new_price;
      if (filters.sortBy === "price-desc") return b.new_price - a.new_price;
      return 0;
    });

  if (isLoading) {
    return <CardLoader />;
  }
  return (
    <div>
      <div className="filter-bar">
        <div className="filtertype">
          <select name="category" onChange={handleFilterChange}>
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select name="color" onChange={handleFilterChange}>
          <option value="">Color</option>
            {color.map((color) => (
              <option key={color} value={color}>
                {color}
                </option>
            ))}
          </select>

          <select name="age" onChange={handleFilterChange}>
            <option value="">Age</option>
            {age.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        <select name="sortBy" onChange={handleFilterChange}>
          <option value="new">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="d-flex justify-content-between gap-4 flex-wrap gaptype">
        {filteredProducts.map((product, index) => (
          <Card
            key={product.$id} // Unique key for React
            {...product}
            id={product.$id}
          />
        ))}
      </div>
      {/* <Pagination/> */}
    </div>
  );
};

export default Filter_Section;



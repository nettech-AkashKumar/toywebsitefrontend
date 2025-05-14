import React, {useState} from 'react';
// import StationaryCard from '../Stationaryfilter/StationaryCard';
import Card from "../Card/Card";
// import '../Card/Card.css'
import Productdata from "../../../src/newproductdetails.json"
import StationaryCard from './StationaryCard';


const Staionaryfilter = () => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    age: "",
    gender: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProducts = Productdata.stationary
    .filter((product) => {
      if (filters.category && filters.category !== "all") {
        return product.category.toLowerCase() === filters.category.toLowerCase();
      }
      return true;
    })
    .filter((product) => {
      if (filters.price) {
        return parseInt(product.new_price, 10) <= parseInt(filters.price, 10);
      }
      return true;
    })
    .filter((product) => {
      if (filters.age) {
        return product.level_range === filters.age;
      }
      return true;
    })
    .filter((product) => {
      if (filters.gender && filters.gender !== "all") {
        return product.gender?.toLowerCase() === filters.gender.toLowerCase();
      }
      return true;
    });

  return (
  <div>
    <div className="filter-bar justify-content-start overflow-auto">
     <select name="category" onChange={handleFilterChange}>
          <option value="all">Category</option>
          <option value="Car">Car</option>
          <option value="Game">Game</option>
          <option value="Book">Book</option>
        </select>

        <select name="price" onChange={handleFilterChange}>
          <option value="">Max Price</option>
          <option value="200">200</option>
          <option value="500">500</option>
          <option value="700">700</option>
        </select>

        <select name="age" onChange={handleFilterChange}>
          <option value="">Age</option>
          <option value="0-3">0-3 years</option>
          <option value="4-7">4-7 years</option>
          <option value="8-12">8-12 years</option>
        </select>

        <select name="gender" onChange={handleFilterChange}>
          <option value="all">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        </div>
      <div className="d-flex justify-content-between gap-4 flex-wrap py-5 stationaryfiltermap">
        {filteredProducts.map((stationary, index) => (
          <StationaryCard
            id={stationary.id}
            key={index}
            title={stationary.title}
            subtitle={stationary.subtitle}
            oldPrice={stationary.old_price}
            newPrice={stationary.new_price}
            levelRange={stationary.level_range}
            imageUrl={stationary.image_url}
            // key={product.id} // Unique key for React
            // {...product}
          />
        ))}
      </div>
  </div>
    
  )
}

export default Staionaryfilter;


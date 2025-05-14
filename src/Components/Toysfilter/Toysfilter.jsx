// import React, {useState} from 'react'
// // import ToysCard from "../Toysfilter/ToysCard";
// import Card from "../Card/Card";
// import '../../Components/Toysfilter/Toysfilter.css'
// // import Producttoysdata from "../../Producttoysdata.json"
// import Producttoysdata from "../../newproductdetails.json";

// const Toysfilter = () => {
//   const [filters, setFilters] = useState({
//     category: "",
//     price: "",
//     age: "",
//     gender: "",
//   });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const filteredProducts = Producttoysdata.products
//     .filter((product) => {
//       if (filters.category && filters.category !== "all") {
//         return product.category.toLowerCase() === filters.category.toLowerCase();
//       }
//       return true;
//     })
//     .filter((product) => {
//       if (filters.price) {
//         return parseInt(product.new_price, 10) <= parseInt(filters.price, 10);
//       }
//       return true;
//     })
//     .filter((product) => {
//       if (filters.age) {
//         return product.level_range === filters.age;
//       }
//       return true;
//     })
//     .filter((product) => {
//       if (filters.gender && filters.gender !== "all") {
//         return product.gender?.toLowerCase() === filters.gender.toLowerCase();
//       }
//       return true;
//     });

//   return (
//   <div>
//     <div className="filter-bar toys-filter-bar justify-content-start">
//     <select name="category" onChange={handleFilterChange}>
//           <option value="all">Category</option>
//           <option value="Car">Toy</option>
//           <option value="Game">Arts & Crafts</option>
//           <option value="Book">Action Figure</option>
//         </select>

//         <select name="price" onChange={handleFilterChange}>
//           <option value="">Max Price</option>
//           <option value="200">200</option>
//           <option value="500">500</option>
//           <option value="700">700</option>
//         </select>

//         <select name="age" onChange={handleFilterChange}>
//           <option value="">Age</option>
//           <option value="0-3">0-3 years</option>
//           <option value="4-7">4-7 years</option>
//           <option value="8-12">8-12 years</option>
//         </select>

//         <select name="gender" onChange={handleFilterChange}>
//           <option value="all">Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//         </div>
//       <div className="d-flex justify-content-between gap-4 flex-wrap py-5 toysmapcard">
//         {filteredProducts.map((product, index) => (
//           <Card
//           id={product.id}
//             key={index}
//             title={product.title}
//             subtitle={product.subtitle}
//             oldPrice={product.old_price}
//             newPrice={product.new_price}
//             levelRange={product.level_range}
//             imageUrl={product.image_url[0]}
//           />
//         ))}
//       </div>
//   </div> 
//   )
// }

// export default Toysfilter;


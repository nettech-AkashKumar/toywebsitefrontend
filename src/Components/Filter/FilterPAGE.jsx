// import React, { useState } from "react";
// import Card from "../Card/Card";

// const FilterPAGE = ({ data  }) => {
//   const [filters, setFilters] = useState({
//     category: "",
//     price: "",
//     age: "",
//   });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };
//   const filteredProducts = data
//     .filter((product) => {
//       if (filters.category && filters.category !== "all") {
//         return (
//           product?.category.toLowerCase() === filters.category.toLowerCase()
//         );
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

//     .sort((a, b) => {
//       if (filters.sortBy === "price-asc") return a.new_price - b.new_price;
//       if (filters.sortBy === "price-desc") return b.new_price - a.new_price;
//       return 0;
//     });

//   return (
//     <div>
//       <div className="filter-bar justify-content-start">
//         <select name="category" onChange={handleFilterChange}>
//           <option value="all">Category</option>
//           <option value="Car">Toy</option>
//           <option value="Game">Arts & Crafts</option>
//           <option value="Book">Action Figure</option>
//         </select>

//         <select name="age" onChange={handleFilterChange}>
//           <option value="">Age</option>
//           <option value="0-3">0-3 years</option>
//           <option value="4-7">4-7 years</option>
//           <option value="8-12">8-12 years</option>
//         </select>

//         <select name="sortBy" onChange={handleFilterChange}>
//           <option value="">Sort by</option>
//           <option value="price-asc">Price: Low to High</option>
//           <option value="price-desc">Price: High to Low</option>
//         </select>

//       </div>

//       <div className="d-flex justify-content-between gap-5 flex-wrap py-5">
//         {filteredProducts.map((product, index) => (
//           <Card
//           key={product.id} // Unique key for React
//           {...product}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FilterPAGE;





// import React, { useState, useEffect } from "react";
// import Card from "../Card/Card";
// import { filter } from "framer-motion/m";

// const FilterPAGE = ({ data = [], isage = true }) => {
//   console.log("daataa", isage);

//   const color = [...new Set(data?.map((item) => item.color))];
//   const age = [...new Set(data?.map((item) => item.level_range))];
//   const gender = [...new Set(data?.map((item) => item.target))];

//   console.log("col", color, age, gender);


//   const [filters, setFilters] = useState({
//     age: "",
//     color: "",
//     sortBy: "",
//     gender: "",
//   });

//   useEffect(() => {
//     setFilters({
//       age: "",
//       color: "",
//       sortBy: "",
//       gender: "",
//     })
//   }, [data])



//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: typeof value === "string" ? value.trim().toLowerCase() : value
//     }));
//   };

//   const filterByCategory = (products, category) => {
//     if (!category || category === "all") return products;
//     return products.filter((product) => product?.category?.toLowerCase() === category.toLowerCase());
//   };
  
//   // Function to filter products by color
//   const filterByColor = (products, color) => {
//     if (!color || color.trim() === "") return products;
//     return products.filter((product) => product?.color?.trim().toLowerCase().includes(color.toLowerCase()));
//   };
  
//   // Function to filter products by age
//   const filterByAge = (products, age) => {
//     if (!age) return products;
//     return products.filter((product) => product?.level_range?.toLowerCase().includes(age.toLowerCase()));
//   };

//   const filterByGender = (products, target) => {
//     console.log("prrroduct", products[0].target, target);
//     if(!Array.isArray(products)) return [];
//     if (!target || target.trim() === "") return products;
//     return products.filter((product) =>
//       // product?.target?.trim().toLowerCase().includes(target.toLowerCase())
//     typeof product?.target === "string" &&
//       product.target.trim().toLowerCase().includes(target.toLowerCase())
//     );
//   }
  
//   // Function to sort products by price
//   const sortByPrice = (products, sortBy) => {
//     if (!sortBy) return products;
//     const sortedProducts = [...products];
//     if (sortBy === "price-asc") {
//       sortedProducts.sort((a, b) => (Number(a.new_price) || 0) - (Number(b.new_price) || 0));
//     } else if (sortBy === "price-desc") {
//       sortedProducts.sort((a, b) => (Number(b.new_price) || 0) - (Number(a.new_price) || 0));
//     }
//     return sortedProducts;
//   };
  
//   // Main function to get displayed products
//   const getDisplayedProducts = (data, filters) => {
//     let filteredProducts = filterByCategory(data, filters.category);
//     filteredProducts = filterByColor(filteredProducts, filters.color);
//     filteredProducts = filterByAge(filteredProducts, filters.age);
//     console.log("filtereeed", filteredProducts, filters.gender);
//     // filteredProducts = filterByGender(data, filters.gender);
//     filteredProducts = filterByGender(filteredProducts, filters.gender);
//     // Sorting logic
//     const sortedProducts = sortByPrice(filteredProducts, filters.sortBy);
    
//     // Show all products if no filter is applied
//     const showAllProducts = !filters.age && !filters.color && !filters.gender && !filters.sortBy;
//     console.log("filtergennder", !filter.gender);
//     return showAllProducts ? data : sortedProducts;
//   };
  
 
//   const displayedProducts = getDisplayedProducts(data, filters);
  
//   return (
//     <div>
//       <div className="filter-bar justify-content-start">
       
//         <select name="color" value={filters.color} onChange={handleFilterChange}>
//         <option value="">Color</option>
//           {color.map((color) => (
//             <option key={color} value={color}>
//               {color}
//             </option>
//           ))}
//         </select>
//         {isage ? (
//         <select name="age" value={filters.age} onChange={handleFilterChange}>
//           <option value="">Age</option>
//           {age.map((age) => (
//             <option key={age} value={age}>
//               {age}
//               </option>
//           ))}
//         </select>
//         ) : (
//           <select name="gender" value={filters.gender} onChange={handleFilterChange}>
//           <option value="">Gender</option>
//           {gender.map((gender) => (
//             <option key={gender} value={gender}>
//               {gender}
//             </option>
//           ))}
//         </select>
//         )}
//         <select name="sortBy" onChange={handleFilterChange}>
//           <option value="">Sort by</option>
//           <option value="price-asc">Price: Low to High</option>
//           <option value="price-desc">Price: High to Low</option>
//         </select> 
//       </div>

//       <div className="d-flex justify-content-between gap-5 flex-wrap py-5">
//         {displayedProducts.length > 0 ? (
//           displayedProducts.map((product, index) => (
//             <Card
//               key={product.$id}
//               {...product}
//               id={product.$id}
//             />
//           ))
//         ) : (
//           <p>No products match the selected filters.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilterPAGE;





import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { filter } from "framer-motion/m";

const FilterPAGE = ({ data = [], isage = true }) => {
  console.log("daataa", isage);

  const color = [...new Set(data?.map((item) => item.color))];
  const age = [...new Set(data?.map((item) => item.level_range))];
  const gender = [...new Set(data?.map((item) => item.target))];

  console.log("col", color, age, gender);


  const [filters, setFilters] = useState({
    age: "",
    color: "",
    sortBy: "",
    gender: "",
  });

  useEffect(() => {
    setFilters({
      age: "",
      color: "",
      sortBy: "",
      gender: "",
    })
  }, [data])



  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: typeof value === "string" ? value.trim().toLowerCase() : value
    }));
  };

  const filterByCategory = (products, category) => {
    if (!category || category === "all") return products;
    return products.filter((product) => product?.category?.toLowerCase() === category.toLowerCase());
  };
  
  // Function to filter products by color
  const filterByColor = (products, color) => {
    if (!color || color.trim() === "") return products;
    return products.filter((product) => product?.color?.trim().toLowerCase().includes(color.toLowerCase()));
     
  };
  
  // Function to filter products by age
  const filterByAge = (products, age) => {
    if (!age) return products;
    return products.filter((product) => product?.level_range?.toLowerCase().includes(age.toLowerCase()));
  };

  const filterByGender = (products, target) => {
    // console.log("prrroduct", products[0].target, target);
    // if (!target || target.trim() === "") return products;
    // return products.filter((product) =>
    //   product?.target?.trim().toLowerCase().includes(target.toLowerCase())
    // );
     if (!Array.isArray(products)) return []; // ✅ extra safety
  if (!target || target.trim() === "") return products;

  return products.filter(
    (product) =>
      typeof product?.target === "string" &&
      product.target.trim().toLowerCase().includes(target.toLowerCase())
  );
   
  }
  
  // Function to sort products by price
  const sortByPrice = (products, sortBy) => {
    if (!sortBy) return products;
    const sortedProducts = [...products];
    if (sortBy === "price-asc") {
      sortedProducts.sort((a, b) => (Number(a.new_price) || 0) - (Number(b.new_price) || 0));
    } else if (sortBy === "price-desc") {
      sortedProducts.sort((a, b) => (Number(b.new_price) || 0) - (Number(a.new_price) || 0));
    }
    return sortedProducts;
  };
  
  // Main function to get displayed products
  const getDisplayedProducts = (data, filters) => {
    let filteredProducts = filterByCategory(data, filters.category);
    filteredProducts = filterByColor(filteredProducts, filters.color);
    filteredProducts = filterByAge(filteredProducts, filters.age);
    console.log("filtereeed", filteredProducts, filters.gender);
    //  filteredProducts = filterByGender(data, filters.gender);
        filteredProducts = filterByGender(filteredProducts, filters.gender);
      
    // Sorting logic
    const sortedProducts = sortByPrice(filteredProducts, filters.sortBy);
    
    
    // Show all products if no filter is applied
    const showAllProducts = !filters.age && !filters.color && !filters.gender && !filters.sortBy;
    console.log("filtergennder", !filter.gender);
    return showAllProducts ? data : sortedProducts;
  };
  
 
  const displayedProducts = getDisplayedProducts(data, filters);
  
  return (
    <div>
      <div className="filter-bar justify-content-start">
       
        <select name="color" value={filters.color} onChange={handleFilterChange}>
        <option value="">Color</option>
          {color.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        {isage ? (
        <select name="age" value={filters.age} onChange={handleFilterChange}>
          <option value="">Age</option>
          {age.map((age) => (
            <option key={age} value={age}>
              {age}
              </option>
          ))}
        </select>
        ) : (
          <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">Gender</option>
          {gender.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        )}
        <select name="sortBy" onChange={handleFilterChange}>
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select> 
      </div>

      <div className="d-flex justify-content-between gap-5 flex-wrap py-5">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product, index) => (
            <Card
              key={product.$id}
              {...product}
              id={product.$id}
            />
          ))
        ) : (
          <p>No products match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default FilterPAGE;
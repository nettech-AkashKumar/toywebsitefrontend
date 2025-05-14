import React, {useState, useEffect} from "react";
import axios from "axios";
import { createContext, useContext,  useReducer } from "react";

import reducer from "../Reducer/productReducer";

const ProductContext = createContext();

const storedProduct = await axios.get("/");
console.log("sdeeef", storedProduct);

const intitialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
  categoryProduct: {},
  //empty object
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intitialState);

  // const getProducts = async (API) => {
  //   dispatch({ type: "SET_LOADING" });

  //   try {
  //     const response = await axios.get(API);
  //     // console.log(response);
  //     const products = await response.data.record.products;
  //     console.log("Product Data", products);

  //     dispatch({ type: "SET_API_DATA", payload: products });
  //   } catch (error) {
  //     dispatch({ type: "API_ERROR" });
  //   }
  // };



  // 2nd api call for single product
  const getSingleProduct = (allproduct, productId) => {
    console.log("allpd", allproduct);
    console.log("pdid", productId);
    const singleProduct = allproduct.find((product) => product._id.toString() === productId.toString())
    console.log("singleproduct", singleProduct);
    return singleProduct;
  }

  const getCategoryProduct =  (allproduct, category) => {
      const categoryProduct = allproduct.filter(
        (product) =>
          product?.category && product.category.toString().toLowerCase() ===
          category?.toLowerCase()
      );
      console.log("category product", categoryProduct);
      return categoryProduct;
    }


    const getTargetProduct = (allproduct, target, category) => {
      if (!allproduct || !Array.isArray(allproduct)) {
        return [];
      }
  
      // Filter products by category first
      const targetProduct = allproduct
        .filter(
          (product) =>
            product?.category?.toString().toLowerCase() ===
            category?.toLowerCase()
        )
        .filter(
          (product) =>
            product?.target?.toString().toLowerCase() === target?.toLowerCase()
        );
  
      return targetProduct;
    };

    const getLevelRange = (allproduct, range) => {
      const levelrange = allproduct.filter(
        (product) =>
          product?.level_range?.toString().toLowerCase() === range?.toLowerCase()
      );
      console.log(range);
      // console.log("level_range", levelrange);
      return levelrange;
    };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        getSingleProduct,
        getCategoryProduct,
        getTargetProduct,
        getLevelRange,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook

const  useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, ProductContext, useProductContext };

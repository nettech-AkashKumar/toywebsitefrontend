import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import PageRouter from "./PageRouter";
import Context from "./context/Context";
import { ProductProvider } from "./context/Products/Product";
import { Provider } from "react-redux";
import store from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ProductProvider>
        <Context>
          <PageRouter />
        </Context>
      </ProductProvider>
    </React.StrictMode>
  </Provider>
);

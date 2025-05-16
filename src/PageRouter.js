import React, { useState } from "react";
// Navbar Before Login
import Navbar from "../src/Components/Navbar/Navbar";
import DashboardComp from "../src/Pages/DashboardComp/DashboardComp";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Stationary from "./Pages/Stationary/Stationary";
import AddToCart from "./Components/AddToCart/AddToCart";
import Home from "./Pages/Home";
import Toys from "./Pages/Toys/Toys";
import Footer from "./Components/Footer/Footer";
import HairAccessories from "./Pages/HairAccessories/HairAccessories";
import Refreshpage from "./Pages/RefreshPage/Refreshpage";
import Whislist from "./Pages/Whishlist/Whislist";
import Address_book from "./Pages/Address_book/Address_book";
import AccountsDetails from "./Pages/AccountsDetails/AccountsDetails";
import HelpSupport from "./Pages/HelpSupport/HelpSupport";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import Policy from "./Pages/Policy/Policy";
import FAQ from "./Pages/FAQ/Faq";
import RecentActivity from "./Pages/RecentActivity/RecentActivity";
import ReviewsPage from "../src/Pages/ReviewsPage/ReviewsPage";
import QuickCheckOut from "../src/Pages/QuickCheckOut/QuickCheckOut";
import CheckOut from "./Pages/CheckOut/CheckOut";
import OrderTracking from "../src/Pages/OrderTracking/DeliveryProgress";
import Cart from "../src/Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Logout from "../src/Components/Logout/LogoutModal";
import ProductPage from "./Pages/Productpages/ProductPage";
import KidsWear from "./Pages/KidsWear/KidsWear";
import FootWear from "./Pages/FootWear/FootWear";
import SizeSelector from "./Components/SizeSelector/SizeSelector";
import ProductShowcase from "./Pages/ProductShowcase/ProductShowcase";
import Productshowcasephoto from "./Components/productshowcasephoto/productshowcasephoto";
import Users from "./Pages/Users/Users";
import Notifications from "./Pages/Notifications/Notifications";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Anlytics from "./Pages/Anlytics/Anlytics";
import AdminLayouts from "./Components/Layouts/AdminLayouts";

import Productpanel from "./Pages/Productpanel/Productpanel";
import VerifyOTP from "./Pages/VerifyOTP";
import Success from "./Components/Paymentcancelsuccess/Success";
import Cancel from "./Components/Paymentcancelsuccess/Cancel";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ForgotPassword/ResetPassword";
import CategoriesAdd from "./Pages/Categories/CategoryAdmin"
import NewOfferProduct from "./Pages/NewOfferProduct/NewOfferProduct ";
import Protected from "./Protected";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import Sales from "./Pages/Sales/TotalSales"
import Stocks from "./Pages/Stocks";
import UpdateComponent from "./Components/UpdateComponent";


// import Register from "./Pages/register";
// import Login from "./Pages/login"

const PageRouter = () => {
  const user = useSelector((state) => state.auth.user); // Redux se user ka data lena
  const router = createBrowserRouter([
    {
      path: "/home",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/sizeselector",
      element: (
        <>
          <Navbar />
          <SizeSelector />
          <Footer />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar />
          <Cart />
          <Footer />
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <Navbar />

          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/toys",
      element: (
        <>
          <Navbar />
          <Toys />
          <Footer />
        </>
      ),
    },
    {
      path: "/stationary",
      element: (
        <>
          <Navbar />
          <Stationary />
          <Footer />
        </>
      ),
    },
    {
      path: "/kidswear",
      element: (
        <>
          <Navbar />
          <KidsWear />
          <Footer />
        </>
      ),
    },
    {
      path: "/footwear",
      element: (
        <>
          <Navbar />
          <FootWear />
          <Footer />
        </>
      ),
    },
    {
      path: "/addtocart/:id",
      element: (
        <>
          {" "}
          <Navbar />
          <AddToCart />
          <Footer />
        </>
      ),
    },
    {
      path: "/quickcheckout",
      element: (
        <>
          {" "}
          <Navbar />
          <QuickCheckOut />
          <Footer />
        </>
      ),
    },
    {
      path: "/checkout",
      element: (
        <>
          {" "}
          <Navbar />
          <CheckOut />
          <Footer />
        </>
      ),
    },
    {
      path: "/hairpage",
      element: (
        <>
          {" "}
          <Navbar />
          <HairAccessories />
          <Footer />
        </>
      ),
    },
    {
      path: "/*",
      element: (
        <>
          {" "}
          <Navbar />
          <Refreshpage />
          <Footer />
        </>
      ),
    },
    {
      path: "/whislist",
      element: (
        <>
          {" "}
          <Navbar />
          <Whislist />
          <Footer />
        </>
      ),
    },
    {
      path: "/address_book",
      element: (
        <>
          {" "}
          <Navbar />
          <Address_book />
          <Footer />
        </>
      ),
    },
    {
      path: "/recentactivtiy",
      element: (
        <>
          {" "}
          <Navbar />
          <RecentActivity />
          <Footer />
        </>
      ),
    },
    {
      path: "/account_details",
      element: (
        <>
          {" "}
          <Navbar />
          <AccountsDetails />
          <Footer />
        </>
      ),
    },
    {
      path: "/help_support",
      element: (
        <>
          {" "}
          <Navbar />
          <HelpSupport />
          <Footer />
        </>
      ),
    },
    {
      path: "/ordertracking",
      element: (
        <>
          {" "}
          <Navbar />
          <OrderTracking />
          <Footer />
        </>
      ),
    },
    {
      path: "/delivery-progress/:orderId",
      element: (
        <>
          <Navbar />
          <OrderTracking />
          <Footer />
        </>
      )
    },
    {
      path: "/reviewrating",
      element: (
        <>
          {" "}
          <Navbar />
          <ReviewsPage />
          <Footer />
        </>
      ),
    },
    {
      path: "/order_history",
      element: (
        <>
          {" "}
          <Navbar />
          <OrderHistory />
          <Footer />
        </>
      ),
    },
    {
      path: "/policy",
      element: (
        <>
          {" "}
          <Navbar />
          <Policy />
          <Footer />
        </>
      ),
    },
    {
      path: "/faq",
      element: (
        <>
          <Navbar />
          <FAQ />
          <Footer />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Navbar />
          <Register />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
          <Footer />
        </>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <>
          <Navbar />
          <ForgotPassword />
          <Footer />
        </>
      ),
    },
    {
      path: "/reset-password/:token",
      element: (
        <>
          <Navbar />
          <ResetPassword />
          <Footer />
        </>
      ),
    },
    {
      path: "/logout",
      element: (
        <>
          <Logout />
        </>
      ),
    },
    {
      path: "/product/:category",
      element: (
        <>
          <Navbar />
          <ProductPage />
          <Footer />
        </>
      ),
    },
    {
      path: "/product/:target/:category",
      element: (
        <>
          <Navbar />
          <ProductPage />
          <Footer />
        </>
      ),
    },

    {
      path: "/productshowcase",
      element: (
        <>
          <Navbar />
          <ProductShowcase />
          <Footer />
        </>
      ),
    },
    {
      path: "/productshowcasephoto",
      element: (
        <>
          <Navbar />
          <Productshowcasephoto />
          <Footer />
        </>
      ),
    },
    {
      // <Protected Component = {AdminLayouts} />
      path: "/admin",
      element: <AdminLayouts />,
      children: [
        {
          path: "dashboard",
          element: <DashboardComp />,
        },
        {
          path: "products",
          element: <Productpanel />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "categories",
          element: <CategoriesAdd />,
        },
        {
          path: "orderspage",
          element: <OrdersPage/>,
        },
        {
          path: "analytics",
          element: <Anlytics />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "newofferprouct",
          element: <NewOfferProduct/>,
        },
        {
          path: "sales",
          element: <Sales/>,
        },
        {
          path: "stocks",
          element: <Stocks/>,
        },
      ],
    },

    // {
    //     path: "/admin",
    //     element:
    //     <Protected Component={AdminLayouts} />,
    //     children: [
    //       {
    //         path: "dashboard",
    //         element: <DashboardComp />,
    //       },
    //       {
    //         path: "products",
    //         element: <Productpanel />,
    //       },
    //       {
    //         path: "users",
    //         element: <Users />,
    //       },
    //       {
    //         path: "analytics",
    //         element: <Anlytics />,
    //       },
    //       {
    //         path: "notifications",
    //         element: <Notifications />,
    //       },
    //       {
    //         path: "newofferprouct",
    //         element: <NewOfferProduct/>,
    //       },
    //     ],
     
    //   },

    //verify-otp
    {
      path: "/verify-otp",
      element: (
        <>
          <Navbar />
          <VerifyOTP />
          <Footer />
        </>
      ),
    },
    {
      path: "/updatecomponent",
      element: (
        <>
          <Navbar />
          <UpdateComponent/>
          {/* <Footer /> */}
        </>
      ),
    },
    {
      path: "/cancel",
      element: (
        <>
          <Navbar />
          <Cancel />
          <Footer />
        </>
      ),
    },
    {
      path: "/success",
      element: (
        <>
          <Navbar />
          <Success />
          <Footer />
        </>
      ),
    },
  ]);
  return (
    <>
      <Auth0Provider
        domain="dev-fl1of3jkpiat3tta.us.auth0.com"
        clientId="sa6G0kkqNTfBLWc0HBVx5UHtokhFw0gL"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </>
  );
};

export default PageRouter;

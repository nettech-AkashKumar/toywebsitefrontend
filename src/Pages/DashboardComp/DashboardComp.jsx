import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../DashboardComp/DashboardComp.css"
import AnalyticsReport from '../../Components/AdminPanels/AnalyticsReport';
import CategorySalesReport from '../../Components/AdminPanels/CategorySalesReport';
import MyAccount from '../../Components/AdminPanels/MyAccount';
import DashboardWidget from '../../Components/AdminPanels/DashboardWidget';
import { monthNames } from './dateUtils';
import BASE_URL from '../../config/config';


const DashboardComp = () => {
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/all-orders`
        );
        setOrders(response.data);
        console.log("response order from component", response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchAllOrders();
  }, []);
  //get total sales
  useEffect(() => {
    const getTotalSales = async () => {
      try {
        const res = await axios.get(`/api/transactions/all`);
        setSales(res.data);
        console.log('response sales from dashboard comp', res.data)
      }
      catch (error) {
        console.log('Error fetching sales', error)
      }
    };
    getTotalSales();
  }, []);
  //get all users in customer available
  useEffect(() => {
    const getCustomerAvailable = async () => {
      try {
        const customerresponse = await axios.get(`${BASE_URL}/api/users/all`)
        setCustomers(customerresponse.data);
        console.log('successfully fetch customer', customerresponse.data)
      }
      catch (error) {
        console.log('Failed to get customer', error)
      }
    }
    getCustomerAvailable();
  }, []);

  //fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(`${BASE_URL}/`)
        setProducts(productResponse.data.data)
        console.log('fetched products successfully', productResponse.data.data)
      }
      catch (error) {
        console.log('Failed to fetch products')
      }
    }
    fetchProducts();
  }, []);
  const currentMonth = new Date().getMonth();
//  const analyticsData = [
//   {
//     month: monthNames[currentMonth],
//     day: 1, 
//     TotalOrders: orders.length,
//     TotalSales: sales.length,
//     TotalProducts: products.length,
//     TotalCustomersAvailable: customers.length,
//   },
// ];

const analyticsData = [];
orders.forEach(order => {
  const orderDate = new Date(order.createdAt);
  const orderDay = orderDate.getDate();
  const orderWeek = Math.ceil(orderDay / 7);
  const orderMonth = monthNames[orderDate.getMonth()];
  const orderYear = orderDate.getFullYear();
  let existingEntry = analyticsData.find(entry => entry.day === orderDay && entry.month === orderMonth  && entry.week === orderWeek && entry.year === orderYear)
  if(!existingEntry) {
    existingEntry = {
      day: orderDay,
      week: orderWeek,
      month: orderMonth,
      year: orderYear,
      TotalOrders: 0,
      TotalSales: 0,
      TotalProducts: 0,
      TotalCustomersAvailable: 0,
    };
    analyticsData.push(existingEntry)
  }
  existingEntry.TotalOrders += 1;
});
sales.forEach(sale => {
  const saleDate = new Date(sale.createdAt);
  const saleDay = saleDate.getDate();
  const saleWeek =Math.ceil(saleDay / 7);
  const saleMonth = monthNames[saleDate.getMonth()]
  const saleYear = saleDate.getFullYear()
  let existingEntry = analyticsData.find(entry => entry.day === saleDay &&  entry.week === saleWeek &&  entry.month === saleMonth && entry.year === saleYear)
  if(!existingEntry) {
    existingEntry = {
      day: saleDay,
      week: saleWeek,
      month: saleMonth,
      year: saleYear,
      TotalOrders: 0,
      TotalSales: 0,
      TotalProducts: 0,
      TotalCustomersAvailable: 0,
    }
    analyticsData.push(existingEntry)
  }
  existingEntry.TotalSales += 1;
})

products.forEach(product => {
  const productDate = new Date(product.createdAt);
  const productDay = productDate.getDate();
  const productWeek = Math.ceil(productDay / 7);
  const productMonth = monthNames[productDate.getMonth()]
  const productYear = productDate.getUTCFullYear();

  let existingEntry = analyticsData.find(entry => entry.day === productDay && entry.week === productWeek &&  entry.month === productMonth &&   entry.year === productYear)
  if(!existingEntry) {
    existingEntry = {
      day: productDay,
      week: productWeek,
      month: productMonth,
      year: productYear,
      TotalOrders: 0,
      TotalSales: 0,
      TotalProducts: 0,
      TotalCustomersAvailable: 0,
    }
    analyticsData.push(existingEntry)
  }
  existingEntry.TotalProducts += 1;
})

customers.forEach(customer => {
  const customerDate = new Date(customer.createdAt)
  const customerDay = customerDate.getDate();
  const customerWeek = Math.ceil(customerDay / 7);
  const customerMonth = monthNames[customerDate.getMonth()]
  const customerYear = customerDate.getFullYear();

  let existingEntry = analyticsData.find(entry => entry.day === customerDay && entry.week === customerWeek &&  entry.month === customerMonth && entry.year === customerYear)
  if(!existingEntry) {
    existingEntry ={
       day: customerDay,
       week: customerWeek,
      month: customerMonth,
      year: customerYear,
      TotalOrders: 0,
      TotalSales: 0,
      TotalProducts: 0,
      TotalCustomersAvailable: 0,
    }
    analyticsData.push(existingEntry)
  }
  existingEntry.TotalCustomersAvailable += 1;
})

console.log("Constructed Analytics Data:", analyticsData)

  return (
    <div>
      <div class="container">
        <div className="row dhashboardcontent" >
          <div className="col-md-12 wheathercomp">
            <DashboardWidget />
          </div>
          <div className="col-md-8 d-flex flex-column gap-4 dashboard-main">
            <div className='d-flex gap-4 dashbaordsales-card'>
              <div className="total-orders-card">
                <span style={{ fontSize: "13px" }}>Total Orders</span>
                <p style={{ fontSize: "20px" }}>{orders?.length}</p>
              </div>
              <div className="total-sales-card">
                <span style={{ fontSize: "13px" }}>Total Sales</span>
                <p style={{ fontSize: "20px" }}>{sales?.length}</p>
              </div>
              <div className="items-purchased-card">
                <span style={{ fontSize: "13px" }}>Total Products</span>
                <p style={{ fontSize: "20px" }}>{products?.length}</p>
              </div>
              <div className="total-customers-overview-card">
                <span style={{ fontSize: "13px" }}>Total Customers</span>
                <p style={{ fontSize: "20px" }}>{customers?.length}</p>
              </div>
            </div>
            <AnalyticsReport data={analyticsData} />
            <CategorySalesReport />
          </div>
          <div className="col-md-4 myaccount">
            <MyAccount />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComp;

import { useState } from "react";
import TotalSalesCard from "../../Components/AdminPanels/TotalSalesCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend } from "recharts";

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState("last30days");

  // 🟢 Dummy Data (Replace with API later)
  const data = {
    totalSales: 12000,
    totalOrders: 345,
    totalUsers: 220,
    productsSold: 980,
    salesByCategory: [
      { category: "Toys", sales: 4000 },
      { category: "Mens", sales: 3000 },
      { category: "Girls", sales: 2500 },
      { category: "Stationery", sales: 2000 }
    ],
    salesTrends: [
      { month: "Jan", sales: 2000 },
      { month: "Feb", sales: 2500 },
      { month: "Mar", sales: 3000 },
      { month: "Apr", sales: 2800 }
    ],
    topSellingProducts: [
      { name: "Toy Car", sales: 300 },
      { name: "Doll House", sales: 250 },
      { name: "Lego Set", sales: 200 }
    ],
    recentOrders: [
      { id: 1, user: "John Doe", total: 50, status: "Shipped" },
      { id: 2, user: "Jane Smith", total: 75, status: "Processing" },
      { id: 3, user: "Alice Brown", total: 120, status: "Delivered" }
    ]
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Analytics</h2>

      {/* 🚀 Total Metrics */}
      <div className="row">
        <div className="col-md-3"><TotalSalesCard totalSales={data.totalSales} /></div>
        <div className="col-md-3"><TotalSalesCard totalSales={data.totalOrders} title="Total Orders" /></div>
        <div className="col-md-3"><TotalSalesCard totalSales={data.totalUsers} title="Total Users" /></div>
        <div className="col-md-3"><TotalSalesCard totalSales={data.productsSold} title="Products Sold" /></div>
      </div>

      {/* 🔄 Date Range Filter */}
      <div className="text-center my-3">
        <label>Select Date Range: </label>
        <select className="mx-2" onChange={(e) => setDateRange(e.target.value)}>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days" selected>Last 30 Days</option>
          <option value="thisYear">This Year</option>
        </select>
      </div>

       <div className="d-flex">
          {/* 📊 Sales by Category */}
     
     <div>
     <h4> Sales By Category</h4>
     <BarChart width={600} height={300} data={data.salesByCategory}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
     </div>

        <div>
           {/* 📈 Sales Trends */}
      <h4>Sales Trends</h4>
      <LineChart width={600} height={300} data={data.salesTrends}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
      </LineChart>
        </div>
       </div>

      {/* 🏆 Top Selling Products */}
      <h4>Top Selling Products</h4>
      <table className="table">
        <thead>
          <tr><th>Product</th><th>Sales</th></tr>
        </thead>
        <tbody>
          {data.topSellingProducts.map((product, index) => (
            <tr key={index}><td>{product.name}</td><td>{product.sales}</td></tr>
          ))}
        </tbody>
      </table>

      {/* 🛒 Recent Orders */}
      <h4>Recent Orders</h4>
      <table className="table">
        <thead>
          <tr><th>Order ID</th><th>User</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody>
          {data.recentOrders.map((order, index) => (
            <tr key={index}><td>{order.id}</td><td>{order.user}</td><td>${order.total}</td><td>{order.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAnalytics;

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const CategorySalesReport = () => {
  // const [salesData, setSalesData] = useState([]);
  const [categories, setCategories] = useState([])


  const fetchSalesData = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/transactions/all");
      const transactions = res.data;
      //aggregate sales data by category
      const aggregatedData = transactions.reduce((acc, transaction) => {
        transaction.products.forEach((product) => {
          const { category, quantity, new_price } = product;
          if (!acc[category]) {
            acc[category] = { name: category, quantity: 0, orders: 0, revenue: 0 };
          }
          acc[category].quantity += quantity;
          acc[category].orders += 1;
          acc[category].revenue += quantity * new_price;
        });
        return acc;
      }, {});

      const dataArray = Object.values(aggregatedData)
      setCategories(dataArray)
      console.log('responsereportSales', dataArray)
    }
    catch (error) {
      console.error('Error fetching sales data', error)
    }
  }
  useEffect(() => {
    fetchSalesData();
  }, [])



  return (
    <div className="p-6 bg-white shadow-lg rounded-xl" style={{ padding: "1.5rem", borderRadius: "10px", boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px" }}>
      <h2 className="text-2xl font-semibold mb-4" style={{ fontSize: "20px" }}>Category-wise Sales Report</h2>
      <div className="w-full h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categories}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Category</th>
            <th className="border p-2">Total Sales</th>
            <th className="border p-2">Orders</th>
            <th className="border p-2">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) && categories.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{item.name}</td>
              {console.log('categories from sales report', item.name)}
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.orders}</td>
              <td className="border p-2">{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategorySalesReport;

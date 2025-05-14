import axios from "axios";
import React, { useEffect, useState } from "react";
import "../AdminPanels/TotalSalesComp.css"
const TotalSalesComp = () => {
  const [sales, setSales] = useState([]);
  const [datalist, setDataList] = useState("")

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/transactions/all");
        const data = await res.json();
        console.log('Fetched sales data:', data); 
        setSales(data);
      } catch (error) {
        console.error('Fetch error', error);
      }
    };
    fetchSales();
  }, []);

  const aggregatedSales = sales.reduce((acc, transaction) => {
    transaction.products.forEach((product) => {
      if (acc[product.title]) {
       acc[product.title].quantity += product.quantity;
       acc[product.title].revenue += product.quantity * product.new_price
      } else {
        acc[product.title] = {
          title: product.title,
          new_price: product.new_price,
          quantity: product.quantity,
          revenue: product.quantity * product.new_price,
          category: product.category,
          stock: product.stock
        }
      }
    });
    return acc;
  }, {});
  
  return (
    <div className="sales-section-container">
      <h2 className="section-title">Total Sales</h2>
        <table className="sales-table">
          <thead>
            <tr>
              <td className="sales-table-heading">S.no</td>
            <th className="sales-table-heading">Product Name</th>
            <th className="sales-table-heading">Category</th>
              <th className="sales-table-heading">Unit Price</th>
              <th className="sales-table-heading">Total Units Sold</th>
              <th className="sales-table-heading">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {/* {sales?.map((item, index) => (
              item.products.map((products, pIndex) => ( */}
              {Object.values(aggregatedSales).map((product, index) => (
                  console.log('aggrgatedSales', aggregatedSales),
              <tr key={index.id} className="sales-table-row">
                <td className="sales-table-data">{index + 1}</td>
                    <td className="sales-table-data">{product.title}</td>
                     <td className="sales-table-data">{product.category}</td>
                <td className="sales-table-data">₹{product.new_price}</td>
                <td className="sales-table-data">{product.quantity}</td>
                <td className="sales-table-data">₹{product.revenue}</td>
                {/* <td className="py-2 px-4 border">{product.stock}</td> */}
                {/* <td className="py-2 px-4 border">{new Date(index.createdAt).toLocaleDateString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default TotalSalesComp;

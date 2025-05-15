import React, {useState, useEffect} from "react";
import axios from "axios";

import {LineChart,Line,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer,CartesianGrid} from "recharts";
import BASE_URL from "../../config/config";

const data = [
  { month: "JAN", users: 3000, sales: 4000 },
  { month: "FEB", users: 2000, sales: 3000 },
   { month: "MAR", users: 2500, sales: 2800 },
  { month: "APRIL", users: 5000, sales: 2700 },
  { month: "MAY", users: 6000, sales: 2900 },
  { month: "JUNE", users: 4500, sales: 3200 },
  { month: "JULY", users: 5800, sales: 4000 },
  { month: "AUG", users: 4300, sales: 4200 },
  { month: "SEPT", users: 8500, sales: 4300 },
  { month: "OCT", users: 9200, sales: 4400 },
  { month: "NOV", users: 3300, sales: 4500 },
  { month: "DEC", users: 2500, sales: 4600 },
];

const Analytics = () => {
  const [chartData, setChartData] = useState([]);

  const initializeMonthlyData = () => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const data = {};
  
  months.forEach(month => {
    data[month] = {
      month,
      sales: 0,
      users: 0,
    };
  });

  return data;
};


  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const usersRes = await axios.get(`${BASE_URL}/api/users/all`);
         const salesRes = await axios.get(`/api/transactions/all`);

         const monthlyData = initializeMonthlyData();

         //process sales data
         salesRes.data.forEach((sale) => {
          const date = new Date(sale.date);
          // const month = date.toLocaleString("default", {month: "short"}).toUpperCase();
            const month = new Date(sale.createdAt).toLocaleString("default", { month: "short" }).toUpperCase();

          if(!monthlyData[month]) {
            monthlyData[month] = {
              month,
              sales: 0,
              users: 0,
            }
          }
          monthlyData[month].sales += sale.amount || 0;
          if(!monthlyData[month].uniqueUsers) {
            monthlyData[month].uniqueUsers = new Set();
          }
          monthlyData[month].uniqueUsers.add(sale.users);
         });

         //calculate users per month
         const userCountsByMonth = {};
         //process users data
         usersRes.data.forEach((user) => {
          const monthJoined =  new Date(user.createdAt).toLocaleString("default", { month: "short" }).toUpperCase();
          if(!userCountsByMonth[monthJoined]) {
            userCountsByMonth[monthJoined]  = 0;
            }
          //count users for the month
          userCountsByMonth[monthJoined]++;
         });
         Object.keys(monthlyData).forEach((month) => {
          monthlyData[month].users = userCountsByMonth[month] || 0;
         })
         //convert the object to an array for the chart
         const formattedData = Object.values(monthlyData)
         setChartData(formattedData)
         console.log('Formatted Data', formattedData);
          }catch(error) {
        console.error("Error fetching data", error)
      }
    }
    fetchAnalyticsData();
  }, []);


  return (
    <div style={{backgroundColor:"white", width:"100%", height:"100%", padding: "20px 20px"}}>
      <h3>Analytics Data</h3>
      <div className="flex justify-between items-center mb-4">
       
        <div className="flex space-x-4">
          <div className="d-flex gap-3">
          <div className="d-flex">
            <span className="bg-danger" style={{backgroundColor:"green"}}></span>
            <span className="" style={{color:"green"}}>Total Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className=""></span>
            <span className="" style={{color:"#8b5cf6"}}>Total Sales</span>
          </div>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={550}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;




// import React from "react";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import { Calendar, BarChart2 } from "lucide-react";

// const monthNames = [
//   "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

// const getCurrentMonth = () => {
//   const currentMonthIndex = new Date().getMonth();
//   return monthNames[currentMonthIndex];
// };

// const AnalyticsReport = ({ data }) => {
//   const currentMonth = getCurrentMonth();
//   const filteredData = data.filter(item => item.month === currentMonth);

//   return (
//     <div
//       className="p-4 bg-white shadow-md rounded-lg"
//       style={{
//         borderRadius: "10px",
//         boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"
//       }}
//     >
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div className="d-flex gap-2">
//           <h2 className="text-lg font-semibold" style={{ fontSize: "20px" }}>
//             Analytics Report
//           </h2>
//           <BarChart2 className="w-5 h-5 text-gray-500 cursor-pointer" />
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="flex items-center border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer">
//             <Calendar className="w-4 h-4 text-gray-500 mr-1" />
//             <span>{`${currentMonth} 2025`}</span>
//           </div>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={200}>
//         <AreaChart data={filteredData}>
//           <defs>
//             <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#f7931a" stopOpacity={0.4} />
//               <stop offset="95%" stopColor="#f7931a" stopOpacity={0} />
//             </linearGradient>
//             <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#16764f" stopOpacity={0.4} />
//               <stop offset="95%" stopColor="#16764f" stopOpacity={0} />
//             </linearGradient>
//             <linearGradient id="colorItems" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#0052cc" stopOpacity={0.4} />
//               <stop offset="95%" stopColor="#0052cc" stopOpacity={0} />
//             </linearGradient>
//             <linearGradient id="totalcustomers" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#da3e0e" stopOpacity={0.4} />
//               <stop offset="95%" stopColor="#da3e0e" stopOpacity={0} />
//             </linearGradient>
//           </defs>

//           <XAxis dataKey="day" tickFormatter={(tick) => `Day ${tick}`} />
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip />

//           <Area type="monotone" dataKey="TotalOrders" stroke="#f7931a" fill="url(#colorGross)" />
//           <Area type="monotone" dataKey="TotalSales" stroke="#16764f" fill="url(#colorNet)" />
//           <Area type="monotone" dataKey="TotalProducts" stroke="#0052cc" fill="url(#colorItems)" />
//           <Area type="monotone" dataKey="TotalCustomers" stroke="#da3e0e" fill="url(#totalcustomers)" />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default AnalyticsReport;



import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Calendar, BarChart2 } from "lucide-react";
import DatePicker from "react-datepicker"
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";






const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const getCurrentMonth = () => {
  const currentMonthIndex = new Date().getMonth();
  return monthNames[currentMonthIndex];
};

const COLORS = ["#1bb61b", "#8989e3", "#ff0000", "#f69707"];

const AnalyticsReport = ({ data }) => {
  console.log("Initial Data Array:", data);

  const [filterType, setFilterType] = useState("custom")
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDay = selectedDate.getDate();
  const selectedWeek = Math.ceil(selectedDay / 7)
  const selectedMonth = monthNames[selectedDate.getMonth()]
  const selectedYear = selectedDate.getFullYear();

  const today = new Date();
  const lastWeekDate = new Date(today);
  lastWeekDate.setDate(today.getDate() - 7);

  const lastMonthDate = new Date(today);
  lastMonthDate.setMonth(today.getMonth() - 1);

  const lastYearDate = new Date(today)
  lastYearDate.setFullYear(today.getFullYear() - 1)

  console.log('selected day, week, month, year', selectedDay, selectedWeek, selectedMonth, selectedYear)
  
  const filteredData = data.filter((item) => {
    const itemDate = item.createdAt ? new Date(item.createdAt) : null;
    if(!itemDate) return false;
    itemDate.setHours(0,0,0,0); //normalize time to midnight for accurate date comparision
    const itemDay = itemDate.getDate();
    const itemWeek = Math.ceil(itemDay / 7);
    const itemMonth = monthNames[itemDate.getMonth()]
    const itemYear = itemDate.getFullYear();

    today.setHours(0,0,0,0);
    lastWeekDate.setHours(0,0,0,0);
    lastMonthDate.setHours(0,0,0,0);
    lastYearDate.setHours(0,0,0,0);

    switch(filterType) {
      case "lastWeek" :
        return itemDate >= lastWeekDate && itemDate <= today;
        case "lastMonth": 
        return itemDate >= lastMonthDate && itemDate <= today;
        case "lastYear" : 
        return itemDate >= lastYearDate && itemDate <= today;

        case "custom": 
        default:
          return (
            itemMonth === selectedMonth && itemYear === selectedYear
          )
    }
  })

  console.log("Filtered Data for", filterType, filteredData)

  const handleFilterChange = (type) => {
    setFilterType(type);
  }

  // const filteredData = data.filter(item => item.month === selectedMonth);

  // const filteredData = data.filter(item => {
  //   let itemMonthName = "";

  //       if (item.createdAt) {
  //         const itemDate = new Date(item.createdAt);
  //         if (isNaN(itemDate)) {
  //           console.warn("Invalid date detected:", item.createdAt);
  //           return false;
  //         } 
  //          itemMonthName = monthNames[itemDate.getMonth()];
  //       }
  //          else if(item.month) {
  //         itemMonthName = item.month;
  //          } else {
  //           console.warn("Skipping item due to missing createdAt and month:", item);
  //           return false;
  //          }
  //          return itemMonthName === selectedMonth;
  // });

//  const filteredData = data.filter(item => {
//   let itemMonthName = "";

//   if (item.createdAt) {
//     const itemDate = new Date(item.createdAt);

//     if (isNaN(itemDate)) {
//       console.warn("Invalid date detected (createdAt):", item.createdAt);
//       return false;
//     }

//     itemMonthName = monthNames[itemDate.getMonth()];
//     console.log(`Item with createdAt: ${item.createdAt} - Extracted Month: ${itemMonthName}`);
//   } 
//   else if (item.month) {
//     itemMonthName = item.month;
//     console.log(`Item with month: ${item.month} - Processed Month: ${itemMonthName}`);
//   } 
//   else {
//     console.warn("Skipping item due to missing createdAt and month:", item);
//     return false;
//   }

//   const isMatch = itemMonthName === selectedMonth;
//   console.log(`Item month: ${itemMonthName}, Selected month: ${selectedMonth}, Match: ${isMatch}`);

//   return isMatch;
// });


// const filteredData = data.filter((item) => {
//   return (
//     item.day === selectedDay,
//     item.week === selectedWeek,
//     item.month === selectedMonth,
//     item.year === selectedYear
//   )
// })

console.log("Filtered Data:", filteredData);


//  const filteredData = data.filter(item => {
// try {
//        const itemDate = new Date(item.createdAt);
//        const itemMonth = itemDate.getMonth();
//      return itemMonth === selectedMonth || item.month === selectedMonth;
//     } catch(error) {
//       console.error("Error parsing date:", error, item)
//     }
//   });
//   console.log('filtered Data', filteredData)
  


  // Aggregate data for the pie chart
  const TotalOrders = filteredData.reduce((sum, item) => sum + item.TotalOrders, 0);
  const TotalSales = filteredData.reduce((sum, item) => sum + item.TotalSales, 0);
  const TotalProducts = filteredData.reduce((sum, item) => sum + item.TotalProducts, 0);
  const TotalCustomersAvailable = filteredData.reduce((sum, item) => sum + item.TotalCustomersAvailable, 0);

  const pieData = [

    { name: "Total Sales", value: TotalSales },
    { name: "Total Products", value: TotalProducts },
    { name: "Total Customers", value: TotalCustomersAvailable },
    { name: "Total Orders", value: TotalOrders },
  ];

  return (
    <div
      className="p-4 bg-white shadow-md rounded-lg"
      style={{
        borderRadius: "10px",
        boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <h2 className="text-lg font-semibold" style={{ fontSize: "20px" }}>
            Analytics Report
          </h2>
          <BarChart2 className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer" style={{display:'flex', gap:'10px'}}>
            {/* <Calendar className="w-4 h-4 text-gray-500 mr-1" /> */}
            <button className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer" style={{gap:'10px'}} onClick={() => handleFilterChange("lastWeek")}>Last Week</button>
            <button className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer" style={{gap:'10px'}} onClick={() => handleFilterChange("lastMonth")}>Last Month</button>
            <button className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer" style={{gap:'10px'}} onClick={() => handleFilterChange("lastYear")}>Last year</button>
            <DatePicker selected={selectedDate} onChange={(date) =>{setSelectedDate(date); setFilterType("custom")}} dateFormat="MMM yyyy" showFullMonthYearPicker className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer"/>
            {/* <span>{`${currentMonth} 2025`}</span> */}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}`}
            // sx={{margin: '20px'}}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsReport;

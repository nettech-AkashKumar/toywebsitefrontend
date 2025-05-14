// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from "@mui/material";

// const StocksTable = () => {
//   const [datalist, setDataList] = useState([]);
//   const [stocks, setStocks] = useState("");
//   const [open, setOpen] = useState(false);
//   const [newStock, setNewStock] = useState({ name: "", stock: "" });
  


//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setNewStock({ name: "", stock: "" });
//   };
//   console.log("setStocks", stocks);

//   //getproduct title
//   const getFetchData = async () => {
//     const data = await axios.get("/");
//     console.log("fetchdata", data);
//     if (data.data.success) {
//       setDataList([...data.data.data].reverse());
//       // alert(data.data.message)
//     }
//   };
//   useEffect(() => {
//     getFetchData();
//   }, []);
//   console.log("datalist from stock page", datalist, stocks);


//   const handleUpdateStocks = async (id, stock) => {
//     try {
//         console.log("id, Stocks:", id, stock);
//         const res = await axios.put("/update",stocks, {
//             _id: id,
//             stock: stock,
//         }, {
//             headers: {
//                 "Content-Type": "application/json",
//               }, 
//         }      
//           );
//           if(res.status === 200) {
//             console.log("Data updated successfully!")
//               getFetchData();
//               alert(res.data.message);
//           }
//     }
//     catch (error)  {
//         console.log("Error updating stocks", error)
//     }
//   };
 

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//             <TableRow>
//               <TableCell>No.</TableCell>
//               <TableCell>Product Name</TableCell>
//               <TableCell>Stock</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {datalist.map((stock, index) => (
//               <TableRow key={stock.id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{stock.title}</TableCell>
//                 <TableCell>{stock.stock}</TableCell>
//                 <TableCell>
//                   <div style={{ marginTop: 4 }}>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => {
//                         handleOpen(stock.id);
//                         setStocks(stock.stock);
//                       }}
//                       sx={{ marginTop: "4px" }}
//                     >
//                       Add
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add Stock Modal */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Stock</DialogTitle>
//         <DialogContent sx={{ minWidth: 300 }}>
//           <TextField
//             margin="dense"
//             label="Stock"
//             type="number"
//             fullWidth
//             variant="outlined"
//             value={stocks}
//             onChange={(e) => setStocks(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button variant="contained" onClick={() => handleUpdateStocks()}>Add</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default StocksTable;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import "./StocksTable.css"
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StocksTable = () => {
  const [datalist, setDataList] = useState([]);
  const [stocks, setStocks] = useState("");
  const [open, setOpen] = useState(false);
  const [currentStockId, setCurrentStockId] = useState(null);  // Track the stock ID being updated

  const handleOpen = (id, currentStock) => {
    setCurrentStockId(id);  // Set the ID of the stock to be updated
    setStocks(currentStock);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setStocks("");
  };

  // Fetch stock data
  const getFetchData = async () => {
    const data = await axios.get("/");  // Adjust the endpoint to match your backend
    if (data.data.success) {
      setDataList(data.data.data.reverse());
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  // Update stock function
  // Handle stock update
const handleUpdateStocks = async () => {
  try {
    const updatedData = {
      _id: currentStockId,  // Use the ID we stored in state
      stock: stocks,
    };

    // Make the PUT request with the correct data
    const response = await axios.put("http://localhost:8081/update", updatedData);
    
    if (response.data.success) {
      const updatedStock = datalist.map((stock) =>
        stock._id === currentStockId
          ? { ...stock, stock: response.data.data.stock }
          : stock
      );
      setDataList(updatedStock);
      setOpen(false);
      // alert("Stock updated successfully!");
      toast.success("Stock updated successfully!", {
                  position: 'top-center',
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
    }
  } catch (error) {
    console.error("Error updating stock", error);
    // alert("Failed to update stock.");
     toast.error("Failed to update stock.!", {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
  }
};

//for pagination
const [itemOffset, setItemOffset] = useState(0)
const itemsPerPage = 10;

const endOffset = itemOffset + itemsPerPage;
const currentItems = datalist.slice(itemOffset, endOffset)
const pageCount = Math.ceil(datalist.length / itemsPerPage)

const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % datalist.length;
  setItemOffset(newOffset)
}

  return (
    <>
    <div className="stocks-section-container">
      <h2 className="section-title">Stocks Management</h2>
      <table className="stocks-table">
        <thead>
          <tr>
            <td className="stocks-table-heading">S.no</td>
            <th className="stocks-table-heading">Product Name</th>
            <th className="stocks-table-heading">Stock</th>
            <th className="stocks-table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((stock, index) => (
           <tr key={stock._id} className="stocks-table-row">
            <td className="stocks-table-data">{index + 1}</td>
            <td className="stocks-table-data">{stock.title}</td>
            <td className="stocks-table-data">{stock.stock}</td>
            <td className="stocks-table-data"><button className="edit-btn" style={{backgroundColor: "transparent",}} onClick={() => handleOpen(stock._id, stock.stock)}><FaEdit className="" style={{fontSize:"20px",  color: "#6941c6"}}/></button></td>
           </tr>
           
          ))}
        </tbody>
      </table>
    <ReactPaginate
  breakLabel="..."
  onPageChange={handlePageClick}
  pageRangeDisplayed={3}
  pageCount={pageCount}
  containerClassName="pagination"
  pageClassName=""
  pageLinkClassName="page-link-no-box"
  activeClassName="active"
  previousLabelClassName="previous"
  nextLabelClassName="next"
/>
</div>
      {/* Add Stock Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Stock</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            variant="outlined"
            value={stocks}
            onChange={(e) => setStocks(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <div className="edit-modal-buttons" style={{marginTop:'50px', display:"flex", justifyContent:"space-between", width:"100%", padding:"0px 20px"}}>
          <Button style={{backgroundColor:"#6941c6", color:"white"}} onClick={handleUpdateStocks}>Add</Button>
          <Button style={{backgroundColor:"#6941c6", color:"white"}} onClick={handleClose}>Cancel</Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StocksTable;



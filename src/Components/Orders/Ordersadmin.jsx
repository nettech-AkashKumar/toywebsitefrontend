import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, ModalHeader, ModalBody } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";

import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./Ordersadmin.css";
import { sendTrackingToSheet, generateTrackingId } from "../../generateTrackingIdUtilities/GenerateTrackingId"
import { FaEdit } from "react-icons/fa";

const TabButton = styled.button`
  color: black;
  border: none;
  padding: 8px 16px;
  margin: 4px;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &.active {
  }
`;

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  //state for view product order
  const [viewOrderProducts, setViewOrderProducts] = useState([])
  const [showViewModal, setShowViewModal] = useState(false)
  const [trackingId, setTrackingId] = useState([]);
  const [showTrackingInput, setShowTrackingInput] = useState([])

  //for checkout data
  const [checkoutdata, setCheckoutData] = useState([]);
  const [loading, setLoading] = useState(true);

  //function to handle view
  const handleView = (orders) => {
    console.log('orders1force', orders)
    setViewOrderProducts(orders.cartItems)
    console.log('orders2force', orders.cartItems)
    setShowViewModal(true);
  }

  //fetch checkout address specially name and address
  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/checkoutform/get"
        );
        const data = await response.json();
        setCheckoutData(data.checkoutdata);
        console.log("data in order admin", data.checkoutdata);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch checkout data:", error);
        setLoading(false);
      }
    };
    fetchCheckoutData();
  }, []);

  //all address and name fetching through 

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/all-orders`
        );
        setOrders(response.data);
        console.log("response order from component", response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchAllOrders();
  }, []);

  const handleEdit = (order) => {
    setEditOrder(order);
    //very very important state managed
    setShowTrackingInput(order.status === "Dispatch");
    setTrackingId(order.trackingId || "")
    setShowModal(true);
  };

  // const handleSaveChanges = async () => {
  //   try {
  //     const response = await axios.put(`http://localhost:8081/api/update-order/${editOrder._id}`, editOrder)
  //     console.log('response through ordersadmin', response.data)
  //     setOrders((prevOrders) =>
  //       prevOrders.map((order) =>
  //         order._id === editOrder._id ? { ...order, ...editOrder } : order)
  //     );
  //     //send data to google sheet
  //     await sendTrackingToSheet(response.data.order)
  //     setShowModal(false)
  //   } catch (error) {
  //     console.error("Failed to update order:", error)
  //   }
  // }

   const handleSaveChanges = async () => {
    try {
      const payload = {status: editOrder.status};
      if(editOrder.status === "Dispatch" && trackingId) {
        payload.trackingId = trackingId;
      }
      const response = await axios.put(`http://localhost:8081/api/update-order/${editOrder._id}`, payload)
      console.log('response through ordersadmin', response.data)
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === editOrder._id ? { ...order, ...editOrder } : order)
      );
      //send data to google sheet
      await sendTrackingToSheet(response.data.order)
      setShowModal(false)
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }


  const handleChange = (e) => {
    const {name, value} = e.target;

    setEditOrder({
      ...editOrder,
      [e.target.name]: e.target.value,
    });
    //these lines are added for dispatch
    if(name === "status") {
      setShowTrackingInput(value === "Dispatch");
    }
     //these lines are added for dispatch
    if(name === "trackingId") {
      setTrackingId(value);
    }
  };

  //for pagination

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const indexofLastOrder = currentPage * ordersPerPage;
  const indexofFirstOrder = indexofLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexofFirstOrder,
    indexofLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const statusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span
            className="badge text-warning text-dark bg-transparent"
            style={{ backgroundColor: "#8565d1" }}
          >
            Pending
          </span>
        );
      case "Dispatch":
        return (
          <span
            className="badge text-primary bg-transparent"
            style={{ backgroundColor: "#8565d1" }}
          >
            Dispatch
          </span>
        );
      case "Delivered":
        return (
          <span
            className="badge text-success bg-transparent"
            style={{ backgroundColor: "#8565d1" }}
          >
            Delivered
          </span>
        );
      default:
        return (
          <span
            className="badge text-secondary bg-transparent"
            style={{ backgroundColor: "#8565d1" }}
          >
            {status}
          </span>
        );
    }
  };

  return (
    <div className="container-fluid py-1" style={{ width: "1250px" }}>
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="mb-4">
          <h4 className="fw-bold" style={{ textAlign: "center" }}>
            Customers Orders
          </h4>
        </div>

        <ul className="nav nav-pills mb-3">
          {["All", "Dispatch", "Pending", "Delivered"].map((tab) => (
            <li className="nav-item" key={tab}>
              <TabButton
                className={activeTab === tab ? "active" : ""}
                style={{ background: activeTab === tab ? "#442a81" : "#8565d1", color: "white" }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </TabButton>
            </li>
          ))}
        </ul>

        <div className="table-responsive">
          <table className="table align-middle" style={{ width: "100%" }}>
            <thead className="table-light">
              <tr>
                <th>Order Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                {activeTab === "Dispatch" && <th>Tracking Id</th>}
                <th>View</th>
                {activeTab === "All" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {console.log("order admin through component", orders)}
              {currentOrders.map((order, index) => {
                // const normalizedOrderEmail = order?.userEmail
                //   ?.trim()
                //   .toLowerCase();
                // const checkoutEntry = checkoutdata?.find(
                //   (entry) =>
                //     entry?.email?.trim().toLowerCase() === normalizedOrderEmail
                // );
                const fullName = `${order.firstName} ${order.lastName}`

                const fullAddress = `${order.address1}, ${order.address2}, ${order.city}, ${order.state}, ${order.zip}`

                return (
                  <tr
                    key={index + 1}
                    className={
                      selectedOrderId === order._id ? "table-primary" : ""
                    }
                    onClick={() => setSelectedOrderId(order._id)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "transparent !important",
                    }}
                  >
                    <td>{order._id.slice(0, 10).toUpperCase()}</td>
                    <td>{fullName}</td>
                    <td>{fullAddress}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>₹{order.amount_Total}</td>
                    <td>{statusBadge(order.status)}</td>
                     {activeTab === "Dispatch" && (
                      <td>{order.trackingId}</td>
)} 
                    <td><button className="btn btn-sm btn-info" onClick={() => handleView(order)}>view</button></td>
                    {activeTab === "All" && (
                      <td
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          className="btn btn-sm me-2"
                          style={{ color: "#6941c6", backgroundColor: "transparent" }}
                          onClick={() => handleEdit(order)}
                        >
                          <FaEdit style={{ fontSize: "20px", fontWeight: "bold", color: "#6941c6" }} />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal for Edit */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          backdrop="static"
          dialogClassName="custom-modal"
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <h5 className="text-center mb-4" style={{ fontWeight: "bold" }}>
              Edit Orders
            </h5>
            <Form>
              <Form.Group className="" style={{ marginBottom: "30px" }}>
                <Form.Label>
                  <strong>Order Status:</strong>
                </Form.Label>
                <Form.Select
                  name="status"
                  value={editOrder?.status}
                  onChange={(e) => {handleChange(e); setShowTrackingInput(e.target.value === "Dispatch");

                  }}
                >
                  <option>Pending</option>
                  <option>Dispatch</option>
                  <option>Delivered</option>
                </Form.Select>
              </Form.Group>
            {/* Conditional Tracking ID Input */}
            {showTrackingInput && (
              <Form.Group style={{marginBottom: "30px"}}>
                <Form.Label>
                  <strong>Tracking ID:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text" placeholder="Enter tracking ID" name="trackingId" value={trackingId}  maxLength="10"
                    // onChange={(e) => setTrackingId(e.target.value)}
                    onChange={handleChange}
                    >
                  </Form.Control>
              </Form.Group>
            )}
            </Form>

            <div
              className="d-flex justify-content-between mt-4"
              style={{ marginTop: "20px" }}
            >
              <Button variant="primary" onClick={handleSaveChanges}>
                Update
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        {/* modal for view product */}
        <Modal
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          size="xl"
          centered
        >
          {/* custom close button */}
          <div style={{ position: 'absolute', top: '10px', right: '15px', zIndex: 1 }}>
            <button onClick={() => setShowViewModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', color: 'black', cursor: 'pointer' }}>&times;</button>
          </div>
          <ModalHeader style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <Modal.Title style={{ textAlign: 'center' }}>Order Product Details</Modal.Title>
          </ModalHeader>
          <ModalBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Array.isArray(viewOrderProducts) && viewOrderProducts.length > 0 ? (
              <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>

                {viewOrderProducts.map((product, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <div className="card ordercard" style={{ height: '200px', width: '200px' }}>
                      <img src={`http://localhost:8081${product?.image}`} alt={product.title} className="card-img-top" style={{ height: '80px', objectFit: 'contain' }} />
                      <div className="card-body">
                        <div className="card-title" style={{ fontWeight: 'bold' }}>{product.title}</div>
                        <p style={{ marginBottom: '0px' }} className="card-text">Price: ₹{product.new_price}</p>
                        <p style={{ marginBottom: '0px' }} className="card-text">Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products details available for this order</p>
            )}
          </ModalBody>
        </Modal>

        {/* Static Pagination */}
        <nav className="mt-4" style={{ border: "none !important" }}>
          <ul
            className="pagination justify-content-center"
            style={{ border: "none !important" }}
          >
            <li
              className={`page-items ${currentPage === 1 ? "disabled" : ""}`}
              style={{ border: "none !important" }}
            >
              <button
                className="page-links"
                style={{ display: "none" }}
                onClick={() =>
                  setCurrentPage((prev) => Math.max((prev - 1, 1)))
                }
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                style={{ border: "none !important" }}
              >
                <button
                  className="page-links"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-items ${currentPage === totalPages ? "disabled" : ""
                }`}
              style={{ border: "none !important" }}
            >
              <button
                className="page-links"
                style={{ display: "none", border: "none" }}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

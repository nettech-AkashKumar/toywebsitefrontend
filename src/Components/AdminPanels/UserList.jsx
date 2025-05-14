// import React from "react";
// import "./UserList.css";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// const users = [
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", date: "2024-02-01" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", date: "2024-01-15" },
//   { id: 3, name: "Michael Brown", email: "michael@example.com", role: "User", date: "2024-01-20" },
//   { id: 4, name: "Emily Johnson", email: "emily@example.com", role: "Moderator", date: "2024-02-05" }
// ];

// const UserList = () => {
//   return (
//     <div className="user-list-container">
//       <h2 className="user-list-title">Registered Users</h2>
//       <table className="user-table">
//         <thead className="user-table-header">
//           <tr>
//             <th className="user-table-heading">Name</th>
//             <th className="user-table-heading">Email</th>
//             <th className="user-table-heading">Role</th>
//             <th className="user-table-heading">Registration Date</th>
//             <th className="user-table-heading">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="user-table-body">
//           {users.map((user) => (
//             <tr key={user.id} className="user-table-row">
//               <td className="user-table-data">{user.name}</td>
//               <td className="user-table-data">{user.email}</td>
//               <td className="user-table-data">{user.role}</td>
//               <td className="user-table-data">{user.date}</td>
//               <td className="user-table-actions d-flex">
//                 <button className="edit-btn"><FaEdit/></button>
//                 <button className="delete-btn"><MdDelete/></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../../Redux/userSlice";
import { Table, Button, Form, Spinner, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UsersSection = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.usersData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers()); // API Se Users Fetch Karna
    }
  }, [status, dispatch]);

  // Delete User
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  // Open Edit Modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditData({ name: user.name, email: user.email });
    setShowModal(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save Edited User
  const handleSave = () => {
    dispatch(updateUser({ id: selectedUser.id, ...editData }));
    setShowModal(false);
  };

  // Search Function
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" mt-4" style={{borderRadius:"10px"}}>
      <h2 style={{fontSize:"20px"}}>Users List</h2>
      <Form.Control 
        type="text" 
        placeholder="Search Users" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="mb-3 users_search" style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)!important"}}
      />

      {/* Loading Spinner */}
      {status === "loading" && <Spinner animation="border" />}

      {/* Error Message */}
      {status === "failed" && <p className="text-danger">{error}</p>}

      {status === "succeeded" && (
        <Table striped bordered hover>
          <thead>
            <tr >
              <th style={{backgroundColor:"var(--section-color)!important"}}>ID</th>
              <th style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>Name</th>
              <th style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>Email</th>
              <th style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>Role</th>
              <th style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>Status</th>
              <th style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>
                <td style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>{user.id}</td>
                <td style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>{user.name}</td>
                <td style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>{user.email}</td>
                <td style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>{user.role}</td>
                <td style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}>{user.status}</td>
                <td className="d-flex gap-2" style={{backgroundColor:"var(--section-color)!important",color:"var(--label-color)"}}> 
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="ms-2"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit/>
                  </Button>

                  <Button className="bg-danger"
                    variant="danger" size="sm" onClick={() => handleDelete(user.id)}
                  >
                    <MdDelete/>
                  </Button>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersSection;




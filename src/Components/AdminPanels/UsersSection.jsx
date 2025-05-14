import React, { useEffect, useState } from "react";
import "./UsersSection.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios"
import Modal from "react-modal"
import ReactPaginate from "react-paginate"



const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null)
  const [newRole, setNewRole] = useState("User")
  const [isModalOpen, setIsModalOpen] = useState(false)


  //fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/users/all")
        setUsers(res.data)
      } catch (error) {
        console.error("Error fetching users", error)
      }
    }
    fetchUsers();
  }, [])

  //role changed
  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:8081/api/users/role/${id}`, { role: newRole });
      setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user))
    } catch (error) {
      console.log('Failed to updated role', error)
    }
  };

  //delete user
  const handleDeleteUser = async (id) => {
    console.log('id from user', id)
    try {
      await axios.delete(`http://localhost:8081/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id))
    } catch (error) {
      console.error("Failed to delete user", error)
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //for pagination
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 7;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset)
  }


  return (
    <div className="users-section-container">
      <h2 className="section-title">Users Management</h2>
      <input
        type="text"
        className="search-bar"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ backgroundColor: "var(--section-color)!important", color: "var(--label-color)" }}
      />
      <table className="users-table">
        <thead className="users-table-header">
          <tr style={{ fontWeight: '400px' }}>
            <th className="users-table-heading">Name</th>
            <th className="users-table-heading">Email</th>
            <th className="users-table-heading">Role</th>
            <th className="users-table-heading">Registration Date</th>
            <th className="users-table-heading">Actions</th>
          </tr>
        </thead>
        <tbody className="users-table-body" style={{ textAlign: 'center' }}>
          {currentItems.map((user) => (
            <tr key={user._id} className="users-table-row">
              <td className="users-table-data">{user.name}</td>
              <td className="users-table-data">{user.email}</td>
              <td className="users-table-data">
                <button style={{ background: 'none' }} className={`role-btn ${user.role === 'Admin' ? 'admin' : 'general'}`} onClick={() => { setSelectedUser(user); setNewRole(user.role || 'User'); }}>{user.role === 'Admin' ? 'Admin' : 'General'}</button>
              </td>
              <td className="users-table-data">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="users-table-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                <button className="edit-btn2" style={{ background: 'none' }} onClick={() => { setSelectedUser(user); setNewRole(user.role); setIsModalOpen(true) }}><FaEdit /></button>
                <button className="delete-btn2" style={{ background: 'none' }} onClick={() => handleDeleteUser(user._id)}><MdDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{ content: { background: 'transparent', border: 'none', padding: 0 } }}
      >
        <div className="edit-modal-container">
          <h2 className="edit-modal-title">Edit Role</h2>
          {selectedUser && (
            <div className="edit-modal-body">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <button value={newRole} onChange={(e) => setNewRole(e.target.value)}></button>
              <label htmlFor="role">Select Role:</label>
              <select
                id="role"
                className="edit-modal-select"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="User">General</option>
              </select>
              <div className="edit-modal-buttons" style={{ marginTop: '50px' }}>
                <button className="edit-modal-update-btn"
                  onClick={() => {
                    handleRoleChange(selectedUser._id, newRole);
                    setIsModalOpen(false);
                  }}
                >
                  Update
                </button>
                <button className="edit-modal-cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UsersSection;



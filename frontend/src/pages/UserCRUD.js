import React, { useState, useEffect } from 'react';
import '../styles/UserCRUD.css';  // Import custom styles for the modal

const API_URL = 'http://localhost/api/users_api.php';

const UserCRUD = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nama: '',
    alamat: '',
    nomorTelepon: '',
    level: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user data
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}?action=read`);
      const data = await response.json();
      if (data.status === 'success') {
        setUsers(data.data);
      } else {
        alert('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = editingId ? 'update' : 'create';
    const url = editingId ? `${API_URL}?action=${action}&id=${editingId}` : `${API_URL}?action=${action}`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === 'success') {
        alert(data.data);
        setFormData({
          username: '',
          password: '',
          nama: '',
          alamat: '',
          nomorTelepon: '',
          level: '',
        });
        setEditingId(null);
        fetchUsers();
        setIsModalOpen(false);  // Close modal after submit
      } else {
        alert(data.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`${API_URL}?action=delete&id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.status === 'success') {
        alert(data.data);
        fetchUsers();
      } else {
        alert(data.data);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle edit action
  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      password: user.password,
      nama: user.nama,
      alamat: user.alamat,
      nomorTelepon: user.nomorTelepon,
      level: user.level,
    });
    setEditingId(user.id);
    setIsModalOpen(true);  // Open modal when editing
  };

  // Toggle modal visibility for adding a new user
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData({
      username: '',
      password: '',
      nama: '',
      alamat: '',
      nomorTelepon: '',
      level: '',
    });
    setEditingId(null);  // Reset editing state when adding new user
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-crud-container">
      <h1>User Management</h1>
      <button onClick={toggleModal} className="open-modal-btn">Add User</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="user-form">
              <h2>{editingId ? 'Edit User' : 'Add New User'}</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Address"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Level"
                />
              </div>
              <button type="submit" className="submit-btn">{editingId ? 'Update' : 'Add'} User</button>
              <button type="button" className="close-modal-btn" onClick={toggleModal}>Close</button>
            </form>
          </div>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.nama}</td>
              <td>{user.alamat}</td>
              <td>{user.nomorTelepon}</td>
              <td>{user.level}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCRUD;

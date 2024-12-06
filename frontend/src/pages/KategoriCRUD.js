import React, { useState, useEffect } from 'react';
import '../styles/KategoriCRUD.css'; // Import custom styles for Kategori CRUD

const API_URL = 'http://localhost/api/kategori_api.php';

const KategoriCRUD = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ kategori_nama: '' });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch category data
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}?action=read`);
      const data = await response.json();
      if (data.status === 'success') {
        setCategories(data.data);
      } else {
        alert('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
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
        setFormData({ kategori_nama: '' });
        setEditingId(null);
        fetchCategories();
        setIsModalOpen(false); // Close modal after submit
      } else {
        alert(data.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`${API_URL}?action=delete&id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.status === 'success') {
        alert(data.data);
        fetchCategories();
      } else {
        alert(data.data);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Handle edit action
  const handleEdit = (category) => {
    setFormData({ kategori_nama: category.kategori_nama });
    setEditingId(category.kategori_id);
    setIsModalOpen(true); // Open modal when editing
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData({ kategori_nama: '' });
    setEditingId(null); // Reset editing state when adding new category
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="kategori-crud-container">
      <h1>Kategori Management</h1>
      <button onClick={toggleModal} className="open-modal-btn">Add Kategori</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="kategori-form">
              <h2>{editingId ? 'Edit Kategori' : 'Add New Kategori'}</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="kategori_nama"
                  value={formData.kategori_nama}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Kategori Name"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">{editingId ? 'Update' : 'Add'} Kategori</button>
              <button type="button" className="close-modal-btn" onClick={toggleModal}>Close</button>
            </form>
          </div>
        </div>
      )}

      <table className="kategori-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kategori Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.kategori_id}>
              <td>{category.kategori_id}</td>
              <td>{category.kategori_nama}</td>
              <td>
                <button onClick={() => handleEdit(category)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(category.kategori_id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KategoriCRUD;

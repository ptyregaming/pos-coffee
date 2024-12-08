import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ProdukCRUD.css';
import { Link } from 'react-router-dom';

const API_INSERT = 'http://localhost/api/insertproduk.php';
const API_UPDATE = 'http://localhost/api/updateproduk.php';
const API_VIEW = 'http://localhost/api/viewproduk.php';
const API_CATEGORY = 'http://localhost/api/viewkategori.php';
const API_DELETE = 'http://localhost/api/deleteproduk.php';

const ProdukCRUD = () => {
  const [produk, setProduk] = useState([]);
  const [formData, setFormData] = useState({
    produk_id: '',
    kategori_id: '',
    produk_judul: '',
    produk_harga: '',
    produk_deskripsi: '',
    produk_image: null,
    stok: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchProduk = async () => {
    try {
      const response = await fetch(API_VIEW);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setProduk(data);
    } catch (error) {
      console.error('Error fetching produk:', error);
      alert('Gagal mengambil data produk.');
    }
  };

  const fetchKategori = async () => {
    try {
      const response = await fetch(API_CATEGORY);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setKategori(data);
    } catch (error) {
      console.error('Error fetching kategori:', error);
      alert('Gagal mengambil data kategori.');
    }
  };

  useEffect(() => {
    fetchProduk();
    fetchKategori();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const API_URL = isEditMode ? API_UPDATE : API_INSERT;
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || (isEditMode ? 'Produk berhasil diperbarui!' : 'Produk berhasil ditambahkan!'));
        resetForm();
        fetchProduk();
      } else {
        alert(result.error || (isEditMode ? 'Gagal memperbarui produk.' : 'Gagal menambahkan produk.'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(isEditMode ? 'Terjadi kesalahan saat memperbarui produk.' : 'Terjadi kesalahan saat menambahkan produk.');
    }
  };

  const handleDelete = async (produk_id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    const formDataObj = new FormData();
    formDataObj.append('produk_id', produk_id);

    try {
      const response = await fetch(API_DELETE, {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Produk berhasil dihapus!');
        fetchProduk();
      } else {
        alert(result.error || 'Gagal menghapus produk.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Terjadi kesalahan saat menghapus produk.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) resetForm();
  };

  const resetForm = () => {
    setFormData({
      produk_id: '',
      kategori_id: '',
      produk_judul: '',
      produk_harga: '',
      produk_deskripsi: '',
      produk_image: null,
      stok: '',
    });
    setIsEditMode(false);
  };

  const handleEdit = (item) => {
    setFormData({
      produk_id: item.produk_id,
      kategori_id: item.kategori_id,
      produk_judul: item.produk_judul,
      produk_harga: item.produk_harga,
      produk_deskripsi: item.produk_deskripsi,
      produk_image: null,
      stok: item.stok,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: '#6f4e37' }}>Manajemen Produk</h1>
      <div className="text-center mb-3">
        <Link to="/dashboard">
          <button className="back-to-dashboard-btn" style={{ backgroundColor: '#6f4e37', color: '#fff' }}>Back to Dashboard</button>
        </Link>
        <button className="btn btn-primary" onClick={toggleModal} style={{ backgroundColor: '#8b5e34', border: 'none' }}>
          Tambah Produk
        </button>
      </div>

      {isModalOpen && (
        <div className="modal d-block" tabIndex="-1" onClick={toggleModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ backgroundColor: '#fff8f0' }}>
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: '#6f4e37' }}>
                  {isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="produk_judul" className="form-label">Judul Produk</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="produk_judul" 
                      name="produk_judul" 
                      value={formData.produk_judul} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="produk_harga" className="form-label">Harga</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="produk_harga" 
                      name="produk_harga" 
                      value={formData.produk_harga} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="produk_deskripsi" className="form-label">Deskripsi</label>
                    <textarea 
                      className="form-control" 
                      id="produk_deskripsi" 
                      name="produk_deskripsi" 
                      value={formData.produk_deskripsi} 
                      onChange={handleInputChange} 
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="kategori_id" className="form-label">Kategori</label>
                    <select 
                      className="form-select" 
                      id="kategori_id" 
                      name="kategori_id" 
                      value={formData.kategori_id} 
                      onChange={handleInputChange} 
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {kategori.map((cat) => (
                        <option key={cat.kategori_id} value={cat.kategori_id}>
                          {cat.kategori_nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="stok" className="form-label">Stok</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="stok" 
                      name="stok" 
                      value={formData.stok} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="produk_image" className="form-label">Gambar Produk</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="produk_image" 
                      name="produk_image" 
                      onChange={handleInputChange} 
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success" style={{ backgroundColor: '#4caf50' }}>
                    {isEditMode ? 'Perbarui' : 'Tambah'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={toggleModal} style={{ backgroundColor: '#e74c3c' }}>
                    Tutup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <table className="table table-striped table-bordered">
        <thead className="table-dark" style={{ backgroundColor: '#6f4e37' }}>
          <tr>
            <th>ID</th>
            <th>Kategori</th>
            <th>Judul</th>
            <th>Harga</th>
            <th>Deskripsi</th>
            <th>Stok</th>
            <th>Gambar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item) => (
            <tr key={item.produk_id}>
              <td>{item.produk_id}</td>
              <td>{item.kategori_nama}</td>
              <td>{item.produk_judul}</td>
              <td>{item.produk_harga}</td>
              <td>{item.produk_deskripsi}</td>
              <td>{item.stok}</td>
              <td>
                <img src={`http://localhost/images/${item.produk_image}`} alt={item.produk_judul} width="100" />
              </td>
              <td>
                <button onClick={() => handleEdit(item)} className="btn btn-warning">Edit</button>
                <button onClick={() => handleDelete(item.produk_id)} className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdukCRUD;

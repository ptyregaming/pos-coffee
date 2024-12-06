import React, { useState, useEffect } from 'react';
import '../styles/ProdukCRUD.css'; // Import gaya khusus untuk modal

const API_URL = 'http://localhost/api/produk_api.php';

const ProdukCRUD = () => {
  const [produk, setProduk] = useState([]);
  const [formData, setFormData] = useState({
    kategori_id: '',
    produk_judul: '',
    produk_harga: '',
    produk_deskripsi: '',
    produk_image: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ambil data produk
  const fetchProduk = async () => {
    try {
      const response = await fetch(`${API_URL}?action=read`);
      
      // Log respon mentah untuk debugging
      if (!response.ok) {
        console.error('Gagal mengambil data produk:', response.statusText);
        alert(`Gagal mengambil data produk: ${response.statusText}`);
        return;
      }

      const responseText = await response.text();
      try {
        const data = JSON.parse(responseText);
        if (data.status === 'success') {
          setProduk(data.data);
        } else {
          console.error('Gagal mengambil data produk:', data.message);
          alert('Gagal mengambil data produk.');
        }
      } catch (jsonError) {
        console.error('Kesalahan parsing JSON:', responseText);
        alert('Kesalahan parsing data respon. Periksa format respon dari server.');
      }
    } catch (error) {
      console.error('Kesalahan saat mengambil data produk:', error);
      alert('Terjadi kesalahan saat mengambil data produk.');
    }
  };

  // Tangani pengiriman formulir untuk tambah atau ubah produk
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
          kategori_id: '',
          produk_judul: '',
          produk_harga: '',
          produk_deskripsi: '',
          produk_image: '',
        });
        setEditingId(null);
        fetchProduk();
        setIsModalOpen(false); // Tutup modal setelah pengiriman
      } else {
        alert(data.data);
      }
    } catch (error) {
      console.error('Kesalahan saat mengirim formulir:', error);
      alert('Terjadi kesalahan saat mengirim formulir.');
    }
  };

  // Tangani aksi hapus
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    try {
      const response = await fetch(`${API_URL}?action=delete&id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.status === 'success') {
        alert(data.data);
        fetchProduk();
      } else {
        alert(data.data);
      }
    } catch (error) {
      console.error('Kesalahan saat menghapus produk:', error);
      alert('Terjadi kesalahan saat menghapus produk.');
    }
  };

  // Tangani aksi edit
  const handleEdit = (produk) => {
    setFormData({
      kategori_id: produk.kategori_id,
      produk_judul: produk.produk_judul,
      produk_harga: produk.produk_harga,
      produk_deskripsi: produk.produk_deskripsi,
      produk_image: produk.produk_image,
    });
    setEditingId(produk.produk_id);
    setIsModalOpen(true); // Buka modal saat mengedit
  };

  // Ubah status modal untuk menambah produk baru
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData({
      kategori_id: '',
      produk_judul: '',
      produk_harga: '',
      produk_deskripsi: '',
      produk_image: '',
    });
    setEditingId(null); // Reset status edit saat menambah produk baru
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  return (
    <div className="produk-crud-container">
      <h1>Manajemen Produk</h1>
      <button onClick={toggleModal} className="open-modal-btn">Tambah Produk</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="produk-form">
              <h2>{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="kategori_id"
                  value={formData.kategori_id}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="ID Kategori"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="produk_judul"
                  value={formData.produk_judul}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Judul Produk"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="produk_harga"
                  value={formData.produk_harga}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Harga Produk"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="produk_deskripsi"
                  value={formData.produk_deskripsi}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Deskripsi Produk"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="produk_image"
                  value={formData.produk_image}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="URL Gambar Produk"
                />
              </div>
              <button type="submit" className="submit-btn">{editingId ? 'Update' : 'Tambah'} Produk</button>
              <button type="button" className="close-modal-btn" onClick={toggleModal}>Tutup</button>
            </form>
          </div>
        </div>
      )}

      <table className="produk-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Kategori</th>
            <th>Judul</th>
            <th>Harga</th>
            <th>Deskripsi</th>
            <th>Gambar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((produk) => (
            <tr key={produk.produk_id}>
              <td>{produk.produk_id}</td>
              <td>{produk.kategori_id}</td>
              <td>{produk.produk_judul}</td>
              <td>{produk.produk_harga}</td>
              <td>{produk.produk_deskripsi}</td>
              <td><img src={produk.produk_image} alt={produk.produk_judul} className="produk-image" /></td>
              <td>
                <button onClick={() => handleEdit(produk)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(produk.produk_id)} className="delete-btn">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdukCRUD;

<?php
// Memasukkan file koneksi database
include 'db_connection.php';

// Menyiapkan query SQL
$query = "
    SELECT 
        Produk.produk_id,
        Produk.produk_judul,
        Produk.produk_harga,
        Produk.produk_deskripsi,
        Produk.stok,
        Produk.produk_image,
        Produk.kategori_id,
        Kategori.kategori_nama
    FROM 
        Produk
    INNER JOIN 
        Kategori ON Produk.kategori_id = Kategori.kategori_id
    ORDER BY 
        Produk.produk_id DESC
";

// Menjalankan query
$result2 = $conn->query($query);

// Mengecek apakah ada hasil
if ($result->num_rows > 0) {
    // Menyiapkan array untuk menyimpan data produk
    $produk_data = [];

    // Mengambil data produk dari hasil query
    while ($row = $result->fetch_assoc()) {
        $produk_data[] = $row;
    }

    // Mengatur header untuk format JSON
    header('Content-Type: application/json');
    
    // Mengembalikan data dalam format JSON
    echo json_encode($produk_data);
} else {
    // Jika tidak ada data ditemukan
    header('Content-Type: application/json');
    //echo json_encode(["message" => "No products found"]);
}

$query = "
    SELECT 
        Produk.produk_id,
        Produk.produk_judul,
        Produk.produk_harga,
        Produk.produk_deskripsi,
        Produk.stok,
        Produk.produk_image,
        Produk.kategori_id,
        Kategori.kategori_nama
    FROM 
        Produk
    INNER JOIN 
        Kategori ON Produk.kategori_id = Kategori.kategori_id
    ORDER BY 
        Produk.produk_id DESC
";

// Menjalankan query
$result = $conn->query($query);

// Mengecek apakah ada hasil
if ($result->num_rows > 0) {
    // Menyiapkan array untuk menyimpan data produk
    $produk_data = [];

    // Mengambil data produk dari hasil query
    while ($row = $result->fetch_assoc()) {
        $produk_data[] = $row;
    }

    // Mengatur header untuk format JSON
    header('Content-Type: application/json');
    
    // Mengembalikan data dalam format JSON
    echo json_encode($produk_data);
} else {
    // Jika tidak ada data ditemukan
    header('Content-Type: application/json');
    echo json_encode(["message" => "No kategori found"]);
}

// Menutup koneksi database
$conn->close();

?>


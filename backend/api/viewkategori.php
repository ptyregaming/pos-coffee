<?php
// Memasukkan file koneksi database
include 'db_connection.php';

// Memastikan koneksi berhasil
if (!$conn) {
    header('Content-Type: application/json');
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Database connection failed."]);
    exit();
}

// Menyiapkan query SQL
$query = "SELECT * FROM Kategori";

try {
    // Menjalankan query
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        // Menyiapkan array untuk menyimpan data kategori
        $kategori_data = [];

        // Mengambil data kategori dari hasil query
        while ($row = $result->fetch_assoc()) {
            $kategori_data[] = $row;
        }

        // Mengatur header untuk format JSON
        header('Content-Type: application/json');
        
        // Mengembalikan data dalam format JSON
        echo json_encode($kategori_data);
    } else {
        // Jika tidak ada data ditemukan
        header('Content-Type: application/json');
        http_response_code(404); // Not Found
        echo json_encode(["message" => "No categories found."]);
    }
} catch (Exception $e) {
    // Penanganan error pada query
    header('Content-Type: application/json');
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to fetch categories.", "details" => $e->getMessage()]);
} finally {
    // Menutup koneksi database
    $conn->close();
}
?>

